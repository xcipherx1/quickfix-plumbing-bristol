import type { Lead, User, Review, Project, ActivityLog } from '@/types';

export const leads: Lead[] = [
  { id: '1', name: 'Sarah Mitchell', phone: '07712 345678', email: 'sarah@email.com', serviceType: 'Emergency Plumbing', postcode: 'BS8 1QU', message: 'Burst pipe under kitchen sink, flooding kitchen.', preferredDate: '2026-06-14T09:00', status: 'new', priority: 'urgent', source: 'website', createdAt: '2026-06-14T08:30:00', updatedAt: '2026-06-14T08:30:00' },
  { id: '2', name: 'James Thompson', phone: '07723 456789', email: 'james@email.com', serviceType: 'Boiler Repair', postcode: 'BS1 2NA', message: 'Boiler not firing up. No hot water.', preferredDate: '2026-06-14T14:00', status: 'contacted', priority: 'high', assignedTo: '2', source: 'website', createdAt: '2026-06-14T07:15:00', updatedAt: '2026-06-14T08:00:00' },
  { id: '3', name: 'Emily Parker', phone: '07734 567890', email: 'emily@email.com', serviceType: 'Bathroom Installation', postcode: 'BS6 5QJ', message: 'Complete bathroom renovation quote needed.', preferredDate: '2026-06-15T10:00', status: 'scheduled', priority: 'normal', assignedTo: '3', source: 'website', createdAt: '2026-06-13T16:45:00', updatedAt: '2026-06-13T17:00:00' },
  { id: '4', name: 'David Harris', phone: '07745 678901', email: 'david@email.com', serviceType: 'Drain Unblocking', postcode: 'BS4 2DQ', message: 'Blocked drain in back garden. Smell coming through.', preferredDate: '2026-06-14T11:00', status: 'in_progress', priority: 'high', assignedTo: '2', source: 'website', createdAt: '2026-06-13T14:20:00', updatedAt: '2026-06-14T09:30:00' },
  { id: '5', name: 'Lisa Clarke', phone: '07756 789012', email: 'lisa@email.com', serviceType: 'Gas Safety Certificate', postcode: 'BS3 1AA', message: 'Need CP12 certificate for rental property.', preferredDate: '2026-06-16T09:00', status: 'new', priority: 'normal', source: 'website', createdAt: '2026-06-13T11:00:00', updatedAt: '2026-06-13T11:00:00' },
  { id: '6', name: 'Robert Wilson', phone: '07767 890123', email: 'robert@email.com', serviceType: 'Leak Detection', postcode: 'BS7 8NP', message: 'Water stain on ceiling, suspect leak from upstairs bathroom.', preferredDate: '2026-06-15T13:00', status: 'scheduled', priority: 'high', assignedTo: '3', source: 'website', createdAt: '2026-06-13T09:30:00', updatedAt: '2026-06-13T10:00:00' },
  { id: '7', name: 'Anna Foster', phone: '07778 901234', email: 'anna@email.com', serviceType: 'Tap Replacement', postcode: 'BS2 0HG', message: 'Kitchen tap dripping constantly.', preferredDate: '2026-06-15T15:00', status: 'contacted', priority: 'low', assignedTo: '2', source: 'website', createdAt: '2026-06-12T18:00:00', updatedAt: '2026-06-13T09:00:00' },
  { id: '8', name: 'Michael Baker', phone: '07789 012345', email: 'michael@email.com', serviceType: 'Commercial Plumbing', postcode: 'BS1 4DJ', message: 'Restaurant kitchen needs commercial sink installation.', preferredDate: '2026-06-17T08:00', status: 'new', priority: 'normal', source: 'website', createdAt: '2026-06-12T14:30:00', updatedAt: '2026-06-12T14:30:00' },
  { id: '9', name: 'Jennifer Adams', phone: '07790 123456', email: 'jen@email.com', serviceType: 'Toilet Repair', postcode: 'BS5 0TE', message: 'Toilet not flushing properly.', preferredDate: '2026-06-15T11:00', status: 'completed', priority: 'normal', assignedTo: '3', source: 'website', createdAt: '2026-06-11T10:00:00', updatedAt: '2026-06-11T14:00:00' },
  { id: '10', name: 'Chris Williams', phone: '07801 234567', email: 'chris@email.com', serviceType: 'Emergency Plumbing', postcode: 'BS8 4QN', message: 'Overflowing toilet, water everywhere.', preferredDate: '2026-06-14T06:30', status: 'in_progress', priority: 'urgent', assignedTo: '2', source: 'website', createdAt: '2026-06-14T06:30:00', updatedAt: '2026-06-14T07:00:00' },
  { id: '11', name: 'Rachel Green', phone: '07812 345678', email: 'rachel@email.com', serviceType: 'Radiator Service', postcode: 'BS9 1RG', message: 'Radiator cold at bottom, needs power flush.', preferredDate: '2026-06-18T09:00', status: 'new', priority: 'normal', source: 'website', createdAt: '2026-06-12T08:00:00', updatedAt: '2026-06-12T08:00:00' },
  { id: '12', name: 'Tom Edwards', phone: '07823 456789', email: 'tom@email.com', serviceType: 'Pipe Replacement', postcode: 'BS14 0PP', message: 'Old lead pipes need replacing throughout house.', preferredDate: '2026-06-20T10:00', status: 'contacted', priority: 'high', assignedTo: '3', source: 'website', createdAt: '2026-06-11T15:00:00', updatedAt: '2026-06-12T08:30:00' },
  { id: '13', name: 'Sophie Lewis', phone: '07834 567890', email: 'sophie@email.com', serviceType: 'Shower Installation', postcode: 'BS16 1QQ', message: 'New electric shower installation in ensuite.', preferredDate: '2026-06-19T14:00', status: 'lost', priority: 'normal', assignedTo: '2', source: 'website', createdAt: '2026-06-10T11:30:00', updatedAt: '2026-06-11T16:00:00' },
  { id: '14', name: 'Daniel Moore', phone: '07845 678901', email: 'dan@email.com', serviceType: 'Underfloor Heating', postcode: 'BS20 0AA', message: 'Underfloor heating not working in living room.', preferredDate: '2026-06-18T11:00', status: 'scheduled', priority: 'normal', assignedTo: '3', source: 'website', createdAt: '2026-06-10T09:00:00', updatedAt: '2026-06-10T12:00:00' },
  { id: '15', name: 'Kate Johnson', phone: '07856 789012', email: 'kate@email.com', serviceType: 'Gas Leak', postcode: 'BS1 1AA', message: 'Smell of gas near meter. Urgent.', preferredDate: '2026-06-14T07:00', status: 'completed', priority: 'urgent', assignedTo: '2', source: 'website', createdAt: '2026-06-14T06:45:00', updatedAt: '2026-06-14T08:15:00' },
];

export const users: User[] = [
  { id: '1', name: 'John Smith', email: 'john@quickfixbristol.co.uk', role: 'admin', status: 'active', lastActive: '2026-06-14T09:00:00', createdAt: '2024-01-15T00:00:00' },
  { id: '2', name: 'Sarah Williams', email: 'sarah@quickfixbristol.co.uk', role: 'manager', status: 'active', lastActive: '2026-06-14T08:30:00', createdAt: '2024-03-01T00:00:00' },
  { id: '3', name: 'Mike Davies', email: 'mike@quickfixbristol.co.uk', role: 'staff', status: 'active', lastActive: '2026-06-13T17:00:00', createdAt: '2024-06-10T00:00:00' },
];

export const reviews: Review[] = [
  { id: '1', name: 'Sarah M.', text: "Absolutely brilliant service! Our boiler broke down on the coldest night of the year and QuickFix had someone at our door in 25 minutes. The engineer was professional, friendly and fixed it on the spot. Can't recommend highly enough!", rating: 5, service: 'Boiler Repair', date: '2026-05-15', source: 'Google' },
  { id: '2', name: 'James T.', text: "Called at 2am with a burst pipe flooding our kitchen. The emergency team arrived in under 30 minutes, stopped the leak and had everything sorted by morning. Lifesavers!", rating: 5, service: 'Emergency Plumbing', date: '2026-04-22', source: 'Trustpilot' },
  { id: '3', name: 'Emily R.', text: "We've used QuickFix for all our rental properties across Bristol for the past 3 years. Always reliable, always fairly priced and the Gas Safe certificates are handled seamlessly.", rating: 5, service: 'Gas Safety', date: '2026-05-28', source: 'Checkatrade' },
  { id: '4', name: 'David K.', text: "Had our entire bathroom redone by QuickFix. From quote to completion they were fantastic. The finish is incredible and they kept everything clean and tidy throughout. 5 stars!", rating: 5, service: 'Bathroom Installation', date: '2026-03-10', source: 'Google' },
  { id: '5', name: 'Lisa P.', text: "Quick, efficient and very professional. Fixed a blocked drain that two other companies couldn't sort. Will definitely be my first call for any plumbing issues from now on.", rating: 5, service: 'Drain Unblocking', date: '2026-05-03', source: 'Trustpilot' },
  { id: '6', name: 'Robert H.', text: "As a property manager I need a plumbing company I can rely on. QuickFix has never let me down. Their commercial maintenance contract is excellent value and their response times are unmatched.", rating: 4, service: 'Commercial', date: '2026-04-18', source: 'Checkatrade' },
];

export const projects: Project[] = [
  { id: '1', title: 'Luxury Bathroom Renovation', location: 'Clifton, Bristol', serviceType: 'Bathroom Installation', category: 'residential', image: '/images/project-bathroom.jpg', completed: true, completionDate: '2026-04-15' },
  { id: '2', title: 'Commercial Kitchen Install', location: 'Harbourside, Bristol', serviceType: 'Commercial Plumbing', category: 'commercial', image: '/images/project-commercial.jpg', completed: true, completionDate: '2026-03-20' },
  { id: '3', title: 'Emergency Pipe Burst Repair', location: 'Redland, Bristol', serviceType: 'Emergency Plumbing', category: 'emergency', image: '/images/project-leak.jpg', completed: true, completionDate: '2026-05-10' },
  { id: '4', title: 'Combi Boiler Replacement', location: 'St George, Bristol', serviceType: 'Heating & Gas', category: 'residential', image: '/images/project-boiler.jpg', completed: true, completionDate: '2026-02-28' },
  { id: '5', title: 'Drain Unblocking Service', location: 'Bedminster, Bristol', serviceType: 'Drainage', category: 'emergency', image: '/images/project-drain.jpg', completed: true, completionDate: '2026-05-22' },
  { id: '6', title: 'Modern Bathroom Installation', location: 'Southville, Bristol', serviceType: 'Bathroom Installation', category: 'residential', image: '/images/project-install.jpg', completed: true, completionDate: '2026-01-15' },
];

export const activityLogs: ActivityLog[] = [
  { id: '1', userId: '1', userName: 'John Smith', action: 'assigned lead', entityType: 'lead', entityId: '2', details: 'Assigned Lead #2 to Sarah Williams', createdAt: '2026-06-14T08:00:00' },
  { id: '2', userId: '2', userName: 'Sarah Williams', action: 'changed status', entityType: 'lead', entityId: '7', details: 'Status changed: New → Contacted', createdAt: '2026-06-13T09:00:00' },
  { id: '3', userId: '1', userName: 'John Smith', action: 'created user', entityType: 'user', entityId: '3', details: 'Added Mike Davies as Staff', createdAt: '2026-06-10T10:00:00' },
  { id: '4', userId: '3', userName: 'Mike Davies', action: 'completed lead', entityType: 'lead', entityId: '9', details: 'Completed toilet repair', createdAt: '2026-06-11T14:00:00' },
  { id: '5', userId: '2', userName: 'Sarah Williams', action: 'added note', entityType: 'lead', entityId: '4', details: 'Customer confirmed appointment for tomorrow', createdAt: '2026-06-13T17:00:00' },
  { id: '6', userId: '1', userName: 'John Smith', action: 'new lead', entityType: 'lead', entityId: '10', details: 'New emergency lead from Clifton', createdAt: '2026-06-14T06:30:00' },
  { id: '7', userId: '3', userName: 'Mike Davies', action: 'started lead', entityType: 'lead', entityId: '4', details: 'Started drain unblocking job', createdAt: '2026-06-14T09:30:00' },
  { id: '8', userId: '2', userName: 'Sarah Williams', action: 'scheduled lead', entityType: 'lead', entityId: '6', details: 'Scheduled leak detection for June 15', createdAt: '2026-06-13T10:00:00' },
  { id: '9', userId: '1', userName: 'John Smith', action: 'updated settings', entityType: 'setting', entityId: '1', details: 'Changed emergency phone number', createdAt: '2026-06-12T16:00:00' },
  { id: '10', userId: '2', userName: 'Sarah Williams', action: 'exported leads', entityType: 'lead', entityId: '0', details: 'Exported 50 leads to CSV', createdAt: '2026-06-11T11:00:00' },
];

export const leadNotes = [
  { id: '1', leadId: '2', userId: '2', userName: 'Sarah Williams', note: 'Called customer, confirmed boiler model. Vaillant EcoTEC Pro 28. Ordering parts.', createdAt: '2026-06-14T08:15:00' },
  { id: '2', leadId: '2', userId: '2', userName: 'Sarah Williams', note: 'Parts arrived. Scheduling visit for 2pm today.', createdAt: '2026-06-14T09:00:00' },
  { id: '3', leadId: '4', userId: '2', userName: 'Sarah Williams', note: 'Customer confirmed appointment. Access via side gate.', createdAt: '2026-06-13T17:00:00' },
  { id: '4', leadId: '4', userId: '3', userName: 'Mike Davies', note: 'Arrived on site. Blockage is tree roots in main drain. Using high-pressure jet.', createdAt: '2026-06-14T09:35:00' },
  { id: '5', leadId: '10', userId: '2', userName: 'Sarah Williams', note: 'Emergency dispatch. Mike en route.', createdAt: '2026-06-14T06:35:00' },
];

export const bristolAreas = [
  'Clifton', 'Redland', 'St George', 'Bedminster', 'Southville', 'Fishponds', 'Kingswood', 'Bradley Stoke',
  'Filton', 'Patchway', 'Stoke Gifford', 'Horfield', 'Bishopston', 'Montpelier', 'St Pauls', 'Easton',
  'Lawrence Hill', 'Knowle', 'Totterdown', 'Windmill Hill', 'Broomhill', 'Henleaze', 'Westbury-on-Trym',
  'Sea Mills', 'Shirehampton', 'Avonmouth', 'Lawrence Weston', 'Southmead', 'Lockleaze', 'Eastville',
  'St Werburghs', 'Cotham', 'Redcliffe', 'Temple', 'Harbourside', 'Ashton', 'Long Ashton', 'Whitchurch',
  'Hengrove', 'Hartcliffe', 'Withywood', 'Bishopsworth', 'Headley Park', 'Stockwood', 'Brislington',
  'St Annes', 'Oldland Common', 'Warmley', 'Cadbury Heath',
];

export const bathAreas = [
  'Bath City Centre', 'Widcombe', 'Combe Down', 'Bathwick', 'Bear Flat', 'Oldfield Park', 'Southdown',
  'Twerton', 'Weston', 'Lansdown', 'Larkhall', 'Fairfield', 'Kingsmead', 'Walcot', 'London Road',
  'Newbridge', 'Moorlands', 'Odd Down', 'Bloomfield', 'Bathampton', 'Batheaston',
];

export const serviceTypes = [
  'Emergency Plumbing',
  'Residential Plumbing',
  'Commercial Plumbing',
  'Boiler Repair',
  'Heating & Gas',
  'Drainage',
  'Bathroom Installation',
  'Gas Safety Certificate',
];

export const statusColors: Record<string, string> = {
  new: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  contacted: 'bg-blue-100 text-blue-800 border-blue-200',
  scheduled: 'bg-amber-100 text-amber-800 border-amber-200',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  lost: 'bg-gray-100 text-gray-800 border-gray-200',
};

export const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-800',
  normal: 'bg-blue-100 text-blue-800',
  high: 'bg-amber-100 text-amber-800',
  urgent: 'bg-red-100 text-red-800',
};

export const certifications = [
  { name: 'Gas Safe Register', icon: 'Shield' },
  { name: 'WaterSafe', icon: 'Droplets' },
  { name: 'CIPHE', icon: 'Wrench' },
  { name: 'TrustMark', icon: 'CheckCircle' },
  { name: 'CHAS', icon: 'Award' },
];

export const partners = [
  'Trustpilot', 'Checkatrade', 'Rated People', 'Which? Trusted Trader', 'Gas Safe Register', 'WaterSafe',
];

export const faqs = [
  { question: 'How quickly can you respond to emergencies?', answer: 'We guarantee a 30-minute response time for emergency calls in Bristol and Bath. Our team is on standby 24/7, 365 days a year.' },
  { question: 'Do you charge a call-out fee?', answer: 'For emergency calls, we have no call-out fee if you proceed with the repair. For routine appointments, we offer free quotes with no obligation.' },
  { question: 'Are your engineers Gas Safe registered?', answer: 'Yes, all our gas engineers are fully Gas Safe registered and regularly re-certified. We display our registration number on every vehicle and uniform.' },
  { question: 'What areas of Bristol do you cover?', answer: 'We cover all of Bristol and surrounding areas including Bath. From Clifton to Kingswood, no area is too far for our emergency team.' },
  { question: 'Do you offer guarantees on your work?', answer: 'All our workmanship comes with a 12-month guarantee. If the same issue recurs within 12 months due to our work, we will fix it free of charge.' },
  { question: 'Can you handle commercial plumbing?', answer: 'Absolutely. We have a dedicated commercial division serving offices, retail, restaurants, and property management companies across Bristol.' },
  { question: 'How do I book a non-emergency appointment?', answer: 'Simply fill out our online form or call us. We offer flexible scheduling including evenings and weekends for your convenience.' },
  { question: 'What payment methods do you accept?', answer: 'We accept cash, card, bank transfer, and all major credit/debit cards. Commercial clients can also set up monthly invoicing.' },
];

export const serviceDetails = [
  {
    id: 'residential',
    title: 'Residential Plumbing',
    icon: 'Home',
    description: 'Complete home plumbing services from leaky taps to full renovations.',
    subservices: [
      { name: 'Leak Detection & Repair', icon: 'Droplets' },
      { name: 'Tap Installation & Repair', icon: 'Droplets' },
      { name: 'Toilet Repair & Replacement', icon: 'Toilet' },
      { name: 'Pipe Replacement & Relining', icon: 'Pipe' },
      { name: 'Bathroom Installation', icon: 'Bath' },
      { name: 'Drain Unblocking', icon: 'Waves' },
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial Plumbing',
    icon: 'Building',
    description: 'Professional plumbing for offices, retail, restaurants and more.',
    subservices: [
      { name: 'Maintenance Contracts', icon: 'ClipboardList' },
      { name: 'Office Fit-outs', icon: 'Building2' },
      { name: 'Retail Plumbing', icon: 'Store' },
      { name: 'Restaurant Compliance', icon: 'Utensils' },
      { name: 'Water Heater Installation', icon: 'Thermometer' },
    ],
  },
  {
    id: 'emergency',
    title: 'Emergency Plumbing',
    icon: 'AlertTriangle',
    description: '24/7 emergency response. 30 minutes or less guaranteed.',
    isEmergency: true,
    subservices: [
      { name: 'Burst Pipes', icon: 'AlertTriangle' },
      { name: 'Blocked Drains', icon: 'Ban' },
      { name: 'Gas Leaks', icon: 'Flame' },
      { name: 'No Hot Water', icon: 'Thermometer' },
      { name: 'Overflowing Toilets', icon: 'Toilet' },
    ],
  },
  {
    id: 'heating',
    title: 'Heating & Gas',
    icon: 'Flame',
    description: 'Boilers, radiators, gas safety certificates and more.',
    subservices: [
      { name: 'Boiler Repair & Installation', icon: 'Flame' },
      { name: 'Radiator Service & Replacement', icon: 'Radiator' },
      { name: 'Power Flushing', icon: 'Zap' },
      { name: 'Gas Safety Certificates (CP12)', icon: 'Shield' },
      { name: 'Underfloor Heating', icon: 'Grid' },
    ],
  },
];

export const whyChooseUs = [
  { title: 'Fixed Price Guarantee', description: 'No hidden fees. Quote before we start.', icon: 'Lock' },
  { title: '12-Month Workmanship Warranty', description: 'All work guaranteed for 12 months.', icon: 'Shield' },
  { title: 'Gas Safe Registered Engineers', description: 'Fully certified and insured.', icon: 'Award' },
  { title: 'Local Bristol Team', description: 'We know your area. We know your pipes.', icon: 'MapPin' },
];

export const whoWeServe = [
  { title: 'Homeowners', description: 'From leaky taps to full bathroom renovations.', icon: 'Home' },
  { title: 'Landlords', description: 'Reliable service for your properties. Certificates included.', icon: 'Key' },
  { title: 'Estate Agents', description: 'Quick turnaround for sales and lettings.', icon: 'Building2' },
  { title: 'Property Managers', description: 'Maintenance contracts for multiple properties.', icon: 'ClipboardList' },
  { title: 'Restaurants & Retail', description: 'Commercial compliance and emergency cover.', icon: 'Store' },
  { title: 'Facilities Management', description: 'Scheduled maintenance and 24/7 support.', icon: 'Settings' },
];

export const processSteps = [
  { number: '01', title: 'Book', description: 'Call or fill the form. We answer 24/7.', icon: 'Phone' },
  { number: '02', title: 'Diagnose', description: 'Expert assessment within 30 minutes.', icon: 'Search' },
  { number: '03', title: 'Fix', description: 'Repair completed with premium parts.', icon: 'Wrench' },
  { number: '04', title: 'Guarantee', description: '12-month warranty + follow-up.', icon: 'ShieldCheck' },
];

export const timeline = [
  { year: '2004', event: 'Founded in St George' },
  { year: '2008', event: 'Expanded to Clifton & Redland' },
  { year: '2012', event: '24/7 Emergency service launched' },
  { year: '2018', event: 'Commercial division opened' },
  { year: '2024', event: 'Serving all of Bristol & Bath' },
];
