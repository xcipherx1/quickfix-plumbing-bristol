"use client";

import { useState, useCallback } from "react";

interface LeadFilters {
  status?: string;
  serviceType?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLeads = useCallback(async (filters: LeadFilters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.set("status", filters.status);
      if (filters.serviceType) params.set("serviceType", filters.serviceType);
      if (filters.search) params.set("search", filters.search);
      if (filters.page) params.set("page", String(filters.page));
      if (filters.limit) params.set("limit", String(filters.limit));
      if (filters.sortBy) params.set("sortBy", filters.sortBy);
      if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

      const res = await fetch(`/api/admin/leads?${params}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      setLeads(data.leads);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLead = useCallback(
    async (id: number, updates: Record<string, unknown>) => {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update lead");
      return res.json();
    },
    []
  );

  const deleteLead = useCallback(async (id: number) => {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete lead");
    return res.json();
  }, []);

  return { leads, total, loading, fetchLeads, updateLead, deleteLead };
}
