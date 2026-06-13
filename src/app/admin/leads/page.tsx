"use client";

import { useState, useEffect } from "react";
import {
  Search, Filter, Download, Eye, ArrowUpDown, StickyNote, Send, X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useLeads } from "@/hooks/use-leads";

const statusOptions = ["all", "new", "contacted", "scheduled", "in_progress", "completed", "lost"];
const serviceOptions = ["all", "Emergency Plumbing", "Residential Plumbing", "Commercial Plumbing", "Heating & Gas", "Drainage", "Other"];

const statusColors: Record<string, string> = {
  new: "bg-cyan-100 text-cyan-800 border-cyan-200",
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  scheduled: "bg-amber-100 text-amber-800 border-amber-200",
  in_progress: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  lost: "bg-gray-100 text-gray-800 border-gray-200",
};

const priorityColors: Record<string, string> = {
  low: "bg-gray-100 text-gray-800",
  normal: "bg-blue-100 text-blue-800",
  high: "bg-amber-100 text-amber-800",
  urgent: "bg-red-100 text-red-800",
};

export default function DashboardLeads() {
  const { user } = useAuth();
  const { leads, total, loading, fetchLeads, updateLead } = useLeads();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [detailLead, setDetailLead] = useState<any>(null);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    fetchLeads({ status: statusFilter, serviceType: serviceFilter, search, page, limit: perPage, sortBy, sortOrder });
  }, [statusFilter, serviceFilter, page, perPage, sortBy, sortOrder]);

  const handleSearch = () => {
    setPage(1);
    fetchLeads({ status: statusFilter, serviceType: serviceFilter, search, page: 1, limit: perPage, sortBy, sortOrder });
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleStatusChange = async (leadId: number, newStatus: string) => {
    await updateLead(leadId, { status: newStatus });
    fetchLeads({ status: statusFilter, serviceType: serviceFilter, search, page, limit: perPage, sortBy, sortOrder });
    if (detailLead?.id === leadId) {
      setDetailLead({ ...detailLead, status: newStatus });
    }
  };

  const handleAddNote = async () => {
    if (!detailLead || !noteText.trim()) return;
    await updateLead(detailLead.id, { note: noteText });
    setNoteText("");
    // Refresh detail
    const res = await fetch(`/api/admin/leads/${detailLead.id}`, { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setDetailLead(data.lead);
    }
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Leads</h1>
          <p className="text-sm text-[#0F172A]/60">{total} leads total</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-4 shadow-bento">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F172A]/30" />
            <Input
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 border-[rgba(15,23,42,0.1)]"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-[rgba(15,23,42,0.06)] flex flex-wrap gap-4">
            <div>
              <label className="text-xs text-[#0F172A]/50 mb-1 block">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="h-9 px-3 rounded-md border border-[rgba(15,23,42,0.1)] text-sm"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s === "all" ? "All Statuses" : s.replace("_", " ")}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#0F172A]/50 mb-1 block">Service</label>
              <select
                value={serviceFilter}
                onChange={(e) => { setServiceFilter(e.target.value); setPage(1); }}
                className="h-9 px-3 rounded-md border border-[rgba(15,23,42,0.1)] text-sm"
              >
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>{s === "all" ? "All Services" : s}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl shadow-bento overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-[#0F172A]/50 uppercase tracking-wider border-b border-[rgba(15,23,42,0.06)]">
                {["name", "phone", "service", "status", "priority", "date"].map((field) => (
                  <th
                    key={field}
                    className="text-left px-4 py-3 font-medium cursor-pointer hover:text-[#0F172A]"
                    onClick={() => handleSort(field)}
                  >
                    <span className="flex items-center gap-1">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                ))}
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: any) => (
                <tr key={lead.id} className="border-t border-[rgba(15,23,42,0.04)] hover:bg-[#F8FAFC]">
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-[#0F172A]">{lead.name}</div>
                      <div className="text-xs text-[#0F172A]/50">{lead.email || lead.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#0F172A]/70">{lead.phone}</td>
                  <td className="px-4 py-3 text-sm text-[#0F172A]/70">{lead.serviceType}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${statusColors[lead.status] || ""}`}>
                      {lead.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${priorityColors[lead.priority] || ""}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#0F172A]/50">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDetailLead(lead)}
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[rgba(15,23,42,0.06)]">
          <span className="text-sm text-[#0F172A]/50">
            Page {page} of {totalPages || 1}
          </span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</Button>
          </div>
        </div>
      </div>

      {/* Lead Detail Drawer */}
      {detailLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setDetailLead(null)} />
          <div className="relative w-full max-w-lg bg-white h-full overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-[rgba(15,23,42,0.06)] flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">Lead #{detailLead.id}</h2>
              <button onClick={() => setDetailLead(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Lead Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <span className="text-xs text-[#0F172A]/50">Name</span>
                  <p className="text-sm font-medium text-[#0F172A]">{detailLead.name}</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <span className="text-xs text-[#0F172A]/50">Phone</span>
                  <p className="text-sm font-medium text-[#0F172A]">{detailLead.phone}</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <span className="text-xs text-[#0F172A]/50">Service</span>
                  <p className="text-sm font-medium text-[#0F172A]">{detailLead.serviceType}</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <span className="text-xs text-[#0F172A]/50">Postcode</span>
                  <p className="text-sm font-medium text-[#0F172A]">{detailLead.postcode}</p>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-sm text-[#0F172A]/60 mb-2 block">Status</label>
                <select
                  value={detailLead.status}
                  onChange={(e) => handleStatusChange(detailLead.id, e.target.value)}
                  className="h-10 px-3 rounded-md border border-[rgba(15,23,42,0.1)] text-sm w-full"
                >
                  {statusOptions.filter((s) => s !== "all").map((s) => (
                    <option key={s} value={s}>{s.replace("_", " ")}</option>
                  ))}
                </select>
              </div>

              {detailLead.message && (
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <span className="text-xs text-[#0F172A]/50">Message</span>
                  <p className="text-sm text-[#0F172A]/80 mt-1">{detailLead.message}</p>
                </div>
              )}

              {/* Notes */}
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                  <StickyNote className="w-4 h-4" /> Notes
                </h4>
                <div className="mt-3 flex gap-2">
                  <Input
                    placeholder="Add a note..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" className="bg-[#06B6D4]" onClick={handleAddNote}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
