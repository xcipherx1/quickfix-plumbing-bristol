import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: Request) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastWeekStart = new Date(weekAgo.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalLeads,
      todayLeads,
      pendingLeads,
      completedLeads,
      thisWeekLeads,
      lastWeekLeads,
      leadsByService,
      leadsByStatus,
      recentLeads,
      recentActivity,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.lead.count({
        where: {
          status: { in: ["new", "contacted", "scheduled"] },
        },
      }),
      prisma.lead.count({ where: { status: "completed" } }),
      prisma.lead.count({ where: { createdAt: { gte: weekAgo } } }),
      prisma.lead.count({
        where: {
          createdAt: { gte: lastWeekStart, lt: weekAgo },
        },
      }),
      prisma.lead.groupBy({
        by: ["serviceType"],
        _count: { id: true },
      }),
      prisma.lead.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          assignedUser: { select: { id: true, name: true } },
        },
      }),
      prisma.activityLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true } },
        },
      }),
    ]);

    const conversionRate = totalLeads > 0
      ? Math.round((completedLeads / totalLeads) * 100)
      : 0;

    const weekGrowth = lastWeekLeads > 0
      ? Math.round(((thisWeekLeads - lastWeekLeads) / lastWeekLeads) * 100)
      : 0;

    return NextResponse.json({
      stats: {
        totalLeads,
        todayLeads,
        pendingLeads,
        completedLeads,
        conversionRate,
        weekGrowth,
      },
      leadsByService: leadsByService.map((s) => ({
        service: s.serviceType,
        count: s._count.id,
      })),
      leadsByStatus: leadsByStatus.map((s) => ({
        status: s.status,
        count: s._count.id,
      })),
      recentLeads,
      recentActivity,
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
