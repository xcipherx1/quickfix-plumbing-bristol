import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { leadUpdateSchema } from "@/lib/validators";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const leadId = parseInt(id);

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        assignedUser: { select: { id: true, name: true, email: true } },
        notes: {
          include: { user: { select: { id: true, name: true } } },
          orderBy: { createdAt: "desc" },
        },
        assignments: {
          include: {
            assigner: { select: { id: true, name: true } },
            assignee: { select: { id: true, name: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const leadId = parseInt(id);
    const body = await request.json();
    const parsed = leadUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: (parsed.error as any).issues || parsed.error.message },
        { status: 400 }
      );
    }

    const { status, priority, assignedTo, note } = parsed.data;

    // Get current lead for comparison
    const currentLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!currentLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;

    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: updateData,
      include: {
        assignedUser: { select: { id: true, name: true } },
      },
    });

    // Create note if provided
    if (note) {
      await prisma.leadNote.create({
        data: {
          leadId,
          userId: user.id,
          note,
          statusChange: status || undefined,
        },
      });
    }

    // Create assignment record if assignedTo changed
    if (assignedTo && assignedTo !== currentLead.assignedTo) {
      await prisma.leadAssignment.create({
        data: {
          leadId,
          assignedBy: user.id,
          assignedTo,
        },
      });
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "updated lead",
        entityType: "lead",
        entityId: leadId,
        details: {
          changes: updateData as Record<string, unknown>,
          note: note || undefined,
        } as any,
      },
    });

    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const leadId = parseInt(id);

    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: { status: "lost" },
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "soft deleted lead",
        entityType: "lead",
        entityId: leadId,
        details: { message: "Lead marked as lost" } as any,
      },
    });

    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
