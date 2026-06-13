"use client";

import { useState, useEffect } from "react";
import { Pencil, Lock, UserPlus, Shield, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string | null;
  createdAt: string;
}

export default function DashboardUsers() {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "staff", password: "" });
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    setError("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
      credentials: "include",
    });

    if (res.ok) {
      setShowAdd(false);
      setNewUser({ name: "", email: "", role: "staff", password: "" });
      fetchUsers();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create user");
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield className="w-12 h-12 text-[#0F172A]/20 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[#0F172A]">Access Denied</h2>
        <p className="text-[#0F172A]/60">Only admins can manage users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Users</h1>
          <p className="text-sm text-[#0F172A]/60">Manage team members and permissions</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Add User
        </Button>
      </div>

      <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl shadow-bento overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-[#0F172A]/50 uppercase tracking-wider border-b border-[rgba(15,23,42,0.06)]">
                <th className="text-left px-5 py-3 font-medium">Name</th>
                <th className="text-left px-5 py-3 font-medium">Email</th>
                <th className="text-left px-5 py-3 font-medium">Role</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-[rgba(15,23,42,0.04)] hover:bg-[#F8FAFC]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#06B6D4]/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#06B6D4]">{u.name[0]}</span>
                      </div>
                      <span className="text-sm font-medium text-[#0F172A]">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#0F172A]/70">{u.email}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      u.role === "admin" ? "bg-purple-100 text-purple-800" :
                      u.role === "manager" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {u.role === "admin" && <Shield className="w-3 h-3" />}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      u.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 text-[#0F172A]/40 hover:text-[#06B6D4]" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#0F172A]/40 hover:text-amber-500" title="Reset Password">
                        <Lock className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#0F172A]/40 hover:text-[#EF4444]" title="Deactivate">
                        <UserX className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Dialog */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowAdd(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">Add New User</h3>
            {error && <p className="text-sm text-[#EF4444] mb-3">{error}</p>}
            <div className="space-y-3">
              <Input placeholder="Full name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
              <Input type="email" placeholder="Email address" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-[rgba(15,23,42,0.1)] text-sm"
              >
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
              <Input type="password" placeholder="Password (8+ chars, uppercase, number)" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowAdd(false)} className="flex-1">Cancel</Button>
                <Button onClick={handleAddUser} className="flex-1 bg-[#06B6D4]">Add User</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
