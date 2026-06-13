"use client";

import { useState, useCallback } from "react";

interface DashboardData {
  stats: {
    totalLeads: number;
    todayLeads: number;
    pendingLeads: number;
    completedLeads: number;
    conversionRate: number;
    weekGrowth: number;
  };
  leadsByService: { service: string; count: number }[];
  leadsByStatus: { status: string; count: number }[];
  recentLeads: any[];
  recentActivity: any[];
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch dashboard");
      const result = await res.json();
      setData(result);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, fetchDashboard };
}
