export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  postcode: string;
  message: string;
  preferredDate?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'in_progress' | 'completed' | 'lost';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assignedTo?: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadNote {
  id: string;
  leadId: string;
  userId: string;
  userName: string;
  note: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  status: 'active' | 'inactive';
  lastActive: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  service: string;
  date: string;
  source: 'Google' | 'Trustpilot' | 'Checkatrade';
}

export interface Project {
  id: string;
  title: string;
  location: string;
  serviceType: string;
  category: 'residential' | 'commercial' | 'emergency';
  image: string;
  completed: boolean;
  completionDate: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: string;
  createdAt: string;
}

export interface ServiceArea {
  name: string;
  city: 'Bristol' | 'Bath';
}

export interface BookingFormData {
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  postcode: string;
  message?: string;
  preferredDate?: string;
}

export interface DashboardStats {
  totalLeads: number;
  newToday: number;
  pendingLeads: number;
  conversionRate: number;
  leadsTrend: number;
  newSinceYesterday: number;
}
