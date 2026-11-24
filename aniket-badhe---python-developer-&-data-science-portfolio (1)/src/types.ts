export type NavView = 
  | 'home' 
  | 'about' 
  | 'skills' 
  | 'projects' 
  | 'data-vis'
  | 'workflow'
  | 'services'
  | 'experience' 
  | 'education'
  | 'certifications'
  | 'achievements'
  | 'github'
  | 'contact'
  | 'dashboard' 
  | 'messages' 
  | 'settings';

export type ProjectCategory = 'All' | 'Python' | 'Data Science' | 'Data Analytics' | 'Web Development' | 'Machine Learning';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  problemStatement?: string;
  category: ProjectCategory;
  status: 'Live' | 'Sample' | 'Featured' | 'In Progress';
  image: string;
  tags: string[];
  keyFeatures?: string[];
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
  createdAt: string;
  metrics?: { label: string; value: string }[];
}

export type SkillCategory = 'Programming' | 'Data Science' | 'Data Analytics' | 'Web Development' | 'Database' | 'Tools';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  percentage: number;
  iconName: string;
  description: string;
  tags?: string[];
  featured?: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: 'project' | 'skill' | 'deployment' | 'message' | 'system';
  tag?: string;
  details?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  current?: boolean;
  points: string[];
  tags: string[];
}

export interface MessageItem {
  id: string;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  read: boolean;
  starred?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  status: 'Active' | 'Verified' | 'Completed';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: 'Coding' | 'Data Science' | 'Hackathon' | 'Academic' | 'Competition';
}

export interface ServiceHealthItem {
  id: string;
  name: string;
  endpoint: string;
  status: 'Healthy' | 'Degraded' | 'Offline';
  latency: string;
  uptime: string;
  type: 'AI Proxy' | 'Database' | 'Analytics Pipeline' | 'Web Service';
}

export interface SystemStats {
  totalProjects: number;
  pythonProjects: number;
  dataScienceProjects: number;
  dataAnalyticsProjects: number;
  totalSkills: number;
  totalCertifications: number;
  totalExperience: number;
  unreadMessages: number;
}
