import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Download, Eye, Pencil, Trash2, ChevronDown,
  X, Send, ArrowUpDown, StickyNote, UserPlus, AlertTriangle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { leads, leadNotes, users, statusColors, priorityColors, serviceTypes } from '@/lib/mock-data';
import { toast } from 'sonner';

const statusOptions = ['all', 'new', 'contacted', 'scheduled', 'in_progress', 'completed', 'lost'];

export default function DashboardLeads() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort
  const filtered = leads.filter(l => {
    const matchSearch = !search ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.email?.toLowerCase().includes(search.toLowerCase()) ||
      l.postcode.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchService = serviceFilter === 'all' || l.serviceType === serviceFilter;
    return matchSearch && matchStatus && matchService;
  });

  filtered.sort((a, b) => {
    const aVal = a[sortField as keyof typeof a] || '';
    const bVal = b[sortField as keyof typeof b] || '';
    if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Leads</h1>
          <p className="text-sm text-[#0F172A]/60">{filtered.length} leads total</p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => toast.success('CSV export started')}
        >
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
              className="pl-10 border-[rgba(15,23,42,0.1)]"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 pt-4 border-t border-[rgba(15,23,42,0.06)] flex flex-wrap gap-4"
          >
            <div>
              <label className="text-xs text-[#0F172A]/50 mb-1 block">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 px-3 rounded-md border border-[rgba(15,23,42,0.1)] text-sm"
              >
                {statusOptions.map(s => (
                  <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#0F172A]/50 mb-1 block">Service</label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="h-9 px-3 rounded-md border border-[rgba(15,23,42,0.1)] text-sm"
              >
                <option value="all">All Services</option>
                {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#0F172A]/50 mb-1 block">Per Page</label>
              <select
                value={perPage}
                onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                className="h-9 px-3 rounded-md border border-[rgba(15,23,42,0.1)] text-sm"
              >
                {[10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl shadow-bento overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-[#0F172A]/50 uppercase tracking-wider border-b border-[rgba(15,23,42,0.06)]">
                {['name', 'phone', 'service', 'status', 'priority', 'assigned', 'date'].map(field => (
                  <th
                    key={field}
                    className="text-left px-4 py-3 font-medium cursor-pointer hover:text-[#0F172A] transition-colors"
                    onClick={() => handleSort(field)}
                  >
                    <span className="flex items-center gap-1">
                      {field === 'assigned' ? 'Assigned To' : field}
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                ))}
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-[rgba(15,23,42,0.04)] hover:bg-[#F8FAFC] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-[#0F172A]">{lead.name}</div>
                      <div className="text-xs text-[#0F172A]/50">{lead.email || lead.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#0F172A]/70">{lead.phone}</td>
                  <td className="px-4 py-3 text-sm text-[#0F172A]/70">{lead.serviceType}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${priorityColors[lead.priority]}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#0F172A]/70">
                    {lead.assignedTo ? users.find(u => u.id === lead.assignedTo)?.name || '—' : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#0F172A]/50">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-1.5 text-[#0F172A]/40 hover:text-[#06B6D4] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#0F172A]/40 hover:text-[#06B6D4] transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[rgba(15,23,42,0.06)]">
          <span className="text-sm text-[#0F172A]/50">
            Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Lead Detail Drawer */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[#0F172A]">
                  Lead #{selectedLead.id} — {selectedLead.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Lead Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F8FAFC] rounded-xl p-4">
                    <span className="text-xs text-[#0F172A]/50">Phone</span>
                    <p className="text-sm font-medium text-[#0F172A]">{selectedLead.phone}</p>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-xl p-4">
                    <span className="text-xs text-[#0F172A]/50">Email</span>
                    <p className="text-sm font-medium text-[#0F172A]">{selectedLead.email || '—'}</p>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-xl p-4">
                    <span className="text-xs text-[#0F172A]/50">Service</span>
                    <p className="text-sm font-medium text-[#0F172A]">{selectedLead.serviceType}</p>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-xl p-4">
                    <span className="text-xs text-[#0F172A]/50">Postcode</span>
                    <p className="text-sm font-medium text-[#0F172A]">{selectedLead.postcode}</p>
                  </div>
                </div>

                {/* Status & Priority */}
                <div className="flex flex-wrap gap-3">
                  <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium border ${statusColors[selectedLead.status]}`}>
                    {selectedLead.status.replace('_', ' ')}
                  </span>
                  <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${priorityColors[selectedLead.priority]}`}>
                    {selectedLead.priority} priority
                  </span>
                </div>

                {selectedLead.message && (
                  <div className="bg-[#F8FAFC] rounded-xl p-4">
                    <span className="text-xs text-[#0F172A]/50">Message</span>
                    <p className="text-sm text-[#0F172A]/80 mt-1">{selectedLead.message}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <select className="h-9 px-3 rounded-md border border-[rgba(15,23,42,0.1)] text-sm">
                    <option>Change Status</option>
                    {statusOptions.filter(s => s !== 'all').map(s => (
                      <option key={s} value={s}>{s.replace('_', ' ')}</option>
                    ))}
                  </select>
                  <select className="h-9 px-3 rounded-md border border-[rgba(15,23,42,0.1)] text-sm">
                    <option>Assign To</option>
                    {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                  <select className="h-9 px-3 rounded-md border border-[rgba(15,23,42,0.1)] text-sm">
                    <option>Set Priority</option>
                    <option>low</option>
                    <option>normal</option>
                    <option>high</option>
                    <option>urgent</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                    <StickyNote className="w-4 h-4" /> Notes
                  </h4>
                  <div className="space-y-3">
                    {leadNotes.filter(n => n.leadId === selectedLead.id).map(note => (
                      <div key={note.id} className="bg-[#F8FAFC] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[#0F172A]">{note.userName}</span>
                          <span className="text-xs text-[#0F172A]/40">
                            {new Date(note.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-[#0F172A]/70">{note.note}</p>
                      </div>
                    ))}
                    {leadNotes.filter(n => n.leadId === selectedLead.id).length === 0 && (
                      <p className="text-sm text-[#0F172A]/40 italic">No notes yet</p>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Input placeholder="Add a note..." className="flex-1" />
                    <Button size="sm" className="bg-[#06B6D4]">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
