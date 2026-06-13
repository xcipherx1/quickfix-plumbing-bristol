import React, { useState } from 'react';
import { User, Lock, Bell, Building2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'password', label: 'Password', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'company', label: 'Company', icon: Building2 },
];

export default function DashboardSettings() {
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Settings</h1>
        <p className="text-sm text-[#0F172A]/60">Manage your account and preferences</p>
      </div>

      <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl shadow-bento overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[rgba(15,23,42,0.06)] overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#06B6D4] text-[#06B6D4]'
                  : 'border-transparent text-[#0F172A]/50 hover:text-[#0F172A]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="max-w-md space-y-4">
              <div>
                <label className="text-sm text-[#0F172A]/60 mb-1 block">Name</label>
                <Input defaultValue="John Smith" />
              </div>
              <div>
                <label className="text-sm text-[#0F172A]/60 mb-1 block">Email</label>
                <Input defaultValue="john@quickfixbristol.co.uk" disabled className="bg-gray-50" />
              </div>
              <div>
                <label className="text-sm text-[#0F172A]/60 mb-1 block">Avatar</label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#06B6D4]/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#06B6D4]">J</span>
                  </div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="max-w-md space-y-4">
              <div>
                <label className="text-sm text-[#0F172A]/60 mb-1 block">Current Password</label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div>
                <label className="text-sm text-[#0F172A]/60 mb-1 block">New Password</label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div>
                <label className="text-sm text-[#0F172A]/60 mb-1 block">Confirm New Password</label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="max-w-md space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#0F172A]">New Lead Alerts</p>
                  <p className="text-sm text-[#0F172A]/50">Get notified when a new lead comes in</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#0F172A]">Status Change Alerts</p>
                  <p className="text-sm text-[#0F172A]/50">Get notified when a lead status changes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#0F172A]">Assignment Alerts</p>
                  <p className="text-sm text-[#0F172A]/50">Get notified when a lead is assigned to you</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#0F172A]">Daily Summary</p>
                  <p className="text-sm text-[#0F172A]/50">Receive a daily summary of activity</p>
                </div>
                <Switch />
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="max-w-md space-y-4">
              <div>
                <label className="text-sm text-[#0F172A]/60 mb-1 block">Company Phone</label>
                <Input defaultValue="0117 234 5678" />
              </div>
              <div>
                <label className="text-sm text-[#0F172A]/60 mb-1 block">Company Email</label>
                <Input defaultValue="info@quickfixbristol.co.uk" />
              </div>
              <div>
                <label className="text-sm text-[#0F172A]/60 mb-1 block">Address</label>
                <Input defaultValue="123 High Street, St George, Bristol BS5 7XX" />
              </div>
              <div>
                <label className="text-sm text-[#0F172A]/60 mb-1 block">Emergency Line</label>
                <Input defaultValue="0117 234 5678" />
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-[rgba(15,23,42,0.06)]">
            <Button onClick={handleSave} className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
