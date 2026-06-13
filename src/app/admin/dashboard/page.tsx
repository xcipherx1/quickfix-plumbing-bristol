"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  AlertCircle,
  BarChart3,
  ArrowRight,
  Eye,
  Clock,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useDashboard } from "@/hooks/use-dashboard";
import { FadeIn } from "@/components/motion";

const statusColors: Record<string, string> = {
  new: "bg-cyan-100 text-cyan-800 border-cyan-200",
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  scheduled: "bg-amber-100 text-amber-800 border-amber-200",
  in_progress: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  lost: "bg-gray-100 text-gray-800 border-gray-200",
};

// Simple bar chart
function MiniBarChart() {
  const data = [40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95];
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((val, i) => (
        <div
          key={i}
          className="flex-1 bg-[#06B6D4]/20 rounded-t-sm"
          style={{ height: `${(val / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

// Simple pie chart
function MiniPieChart() {
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90">
        <circle cx="16" cy="16" r="14" fill="none" stroke="#06B6D4" strokeWidth="6" strokeDasharray="30 100" />
        <circle cx="16" cy="16" r="14" fill="none" stroke="#10B981" strokeWidth="6" strokeDasharray="25 100" strokeDashoffset="-30" />
        <circle cx="16" cy="16" r="14" fill="none" stroke="#F59E0B" strokeWidth="6" strokeDasharray="20 100" strokeDashoffset="-55" />
        <circle cx="16" cy="16" r="14" fill="none" stroke="#EF4444" strokeWidth="6" strokeDasharray="15 100" strokeDashoffset="-75" />
        <circle cx="16" cy="16" r="14" fill="none" stroke="#E5E7EB" strokeWidth="6" strokeDasharray="10 100" strokeDashoffset="-90" />
      </svg>
    </div>
  );
}

export default function DashboardOverview() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data, loading, fetchDashboard } = useDashboard();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (authLoading) return null;
  if (!user) {
    router.push("/admin/login");
    return null;
  }

  const stats = data?.stats ?? { totalLeads: 0, todayLeads: 0, pendingLeads: 0, completedLeads: 0, conversionRate: 0, weekGrowth: 0 };
  const recentLeads = data?.recentLeads ?? [];
  const recentActivity = data?.recentActivity ?? [];
  const leadsByService = data?.leadsByService ?? [];

  const statCards = [
    { title: "Total Leads", value: stats.totalLeads || 0, trend: `+${stats.weekGrowth || 0}% this week`, icon: BarChart3, warning: false },
    { title: "New Today", value: stats.todayLeads || 0, trend: "New submissions", icon: TrendingUp, warning: false },
    { title: "Pending Leads", value: stats.pendingLeads || 0, trend: "Requires attention", icon: AlertCircle, warning: true },
    { title: "Conversion Rate", value: `${stats.conversionRate || 0}%`, trend: "Completed / Total", icon: TrendingUp, warning: false },
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard Overview</h1>
        <p className="text-sm text-[#0F172A]/60">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </FadeIn>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-5 shadow-bento hover:shadow-bento-hover transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#0F172A]/60">{stat.title}</span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  stat.warning ? "bg-amber-50" : "bg-[#06B6D4]/10"
                }`}
              >
                <stat.icon
                  className={`w-4 h-4 ${
                    stat.warning ? "text-amber-500" : "text-[#06B6D4]"
                  }`}
                />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-[#0F172A] mb-1">
              {stat.value}
            </div>
            <span
              className={`text-xs font-medium ${
                stat.warning ? "text-[#F59E0B]" : "text-[#10B981]"
              }`}
            >
              {stat.trend}
            </span>
            {stat.title === "Conversion Rate" && <MiniBarChart />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <FadeIn className="lg:col-span-2">
          <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl shadow-bento overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-[rgba(15,23,42,0.06)]">
              <h2 className="font-semibold text-[#0F172A]">Recent Leads</h2>
              <button
                onClick={() => router.push("/admin/leads")}
                className="text-sm text-[#06B6D4] hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {loading ? (
              <div className="p-8 text-center text-[#0F172A]/40">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-[#0F172A]/50 uppercase tracking-wider">
                      <th className="text-left px-5 py-3 font-medium">Name</th>
                      <th className="text-left px-5 py-3 font-medium">Service</th>
                      <th className="text-left px-5 py-3 font-medium">Status</th>
                      <th className="text-left px-5 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead: any) => (
                      <tr
                        key={lead.id}
                        className="border-t border-[rgba(15,23,42,0.04)] hover:bg-[#F8FAFC]"
                      >
                        <td className="px-5 py-3">
                          <span className="text-sm font-medium text-[#0F172A]">
                            {lead.name}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-sm text-[#0F172A]/60">
                          {lead.serviceType}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${
                              statusColors[lead.status] || ""
                            }`}
                          >
                            {lead.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => router.push(`/admin/leads?lead=${lead.id}`)}
                            className="p-1.5 text-[#0F172A]/40 hover:text-[#06B6D4]"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Service Distribution */}
          <FadeIn delay={0.1}>
            <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-5 shadow-bento">
              <h2 className="font-semibold text-[#0F172A] mb-4">
                Service Distribution
              </h2>
              <div className="flex items-center justify-center py-4">
                <MiniPieChart />
              </div>
              <div className="space-y-2 mt-2">
                {leadsByService.map((item: any) => (
                  <div
                    key={item.service}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#06B6D4]" />
                      <span className="text-[#0F172A]/70">{item.service}</span>
                    </div>
                    <span className="font-medium text-[#0F172A]">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Activity Feed */}
          <FadeIn delay={0.2}>
            <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-5 shadow-bento">
              <h2 className="font-semibold text-[#0F172A] mb-4">Activity Feed</h2>
              {loading ? (
                <div className="text-center text-[#0F172A]/40 py-4">Loading...</div>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((activity: any) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-3.5 h-3.5 text-[#06B6D4]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#0F172A]">
                          <span className="font-medium">
                            {activity.user?.name || "System"}
                          </span>{" "}
                          <span className="text-[#0F172A]/60">
                            {typeof activity.details === "object" && activity.details !== null
                              ? (activity.details as Record<string, string>).message || activity.action
                              : activity.action}
                          </span>
                        </p>
                        <p className="text-xs text-[#0F172A]/40 mt-0.5">
                          {new Date(activity.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
