import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Pencil, Lock, UserX, UserPlus, Shield, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { users } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function DashboardUsers() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'staff' });

  const handleAddUser = () => {
    toast.success(`User ${newUser.name} added successfully`);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', role: 'staff' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Users</h1>
          <p className="text-sm text-[#0F172A]/60">Manage team members and permissions</p>
        </div>
        <Button
          onClick={() => setShowAddUser(true)}
          className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Add User
        </Button>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl shadow-bento overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-[#0F172A]/50 uppercase tracking-wider border-b border-[rgba(15,23,42,0.06)]">
                <th className="text-left px-5 py-3 font-medium">Name</th>
                <th className="text-left px-5 py-3 font-medium">Email</th>
                <th className="text-left px-5 py-3 font-medium">Role</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Last Active</th>
                <th className="text-left px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-[rgba(15,23,42,0.04)] hover:bg-[#F8FAFC] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#06B6D4]/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#06B6D4]">{user.name[0]}</span>
                      </div>
                      <span className="text-sm font-medium text-[#0F172A]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#0F172A]/70">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'admin' && <Shield className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#0F172A]/50">
                    {new Date(user.lastActive).toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 text-[#0F172A]/40 hover:text-[#06B6D4] transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#0F172A]/40 hover:text-amber-500 transition-colors" title="Reset Password">
                        <Lock className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#0F172A]/40 hover:text-[#EF4444] transition-colors" title="Deactivate">
                        <UserX className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#0F172A]">Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-[#0F172A]/60 mb-1 block">Name</label>
              <Input
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="text-sm text-[#0F172A]/60 mb-1 block">Email</label>
              <Input
                type="email"
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="text-sm text-[#0F172A]/60 mb-1 block">Role</label>
              <select
                value={newUser.role}
                onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-[rgba(15,23,42,0.1)] text-sm"
              >
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button onClick={handleAddUser} className="w-full bg-[#06B6D4]">
              Add User
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
