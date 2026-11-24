import React, { useState, useRef } from 'react';
import { NavView, ProjectItem, SkillItem, ActivityItem, MessageItem, EducationItem, CertificationItem, ExperienceItem, ServiceItem, AchievementItem } from '../types';
import { 
  LayoutDashboard, FolderGit2, Cpu, Briefcase, GraduationCap, 
  Award, Mail, Settings, Download, Plus, Terminal, 
  Trash2, CheckCircle2, X, Trophy, Layers, BarChart2, Building2, MapPin, Calendar, LogOut,
  Camera, Upload, Link2, RotateCcw
} from 'lucide-react';
import { 
  INITIAL_PROJECTS, INITIAL_SKILLS, INITIAL_ACTIVITIES, INITIAL_MESSAGES, 
  INITIAL_SERVICES, INITIAL_EDUCATION, INITIAL_CERTIFICATIONS, INITIAL_EXPERIENCES, INITIAL_ACHIEVEMENTS, PROFILE_IMAGE 
} from '../data/mockData';
import { DataVisualizationSection } from './DataVisualizationSection';

interface DashboardViewProps {
  onNavigateView: (view: NavView) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onOpenInbox: () => void;
  onLogout?: () => void;
  profileImage?: string;
  onUpdateProfileImage?: (imageUrl: string | null) => Promise<boolean> | void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateView,
  onOpenResume,
  onOpenTerminal,
  onOpenInbox,
  onLogout,
  profileImage = PROFILE_IMAGE,
  onUpdateProfileImage
}) => {
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Central State Management for all entities
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [education, setEducation] = useState<EducationItem[]>(INITIAL_EDUCATION);
  const [certifications, setCertifications] = useState<CertificationItem[]>(INITIAL_CERTIFICATIONS);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(INITIAL_EXPERIENCES);
  const [achievements, setAchievements] = useState<AchievementItem[]>(INITIAL_ACHIEVEMENTS);

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({
    name: 'ANIKET BADHE',
    title: 'Python Developer | Data Science & Data Analytics',
    email: 'aniketbadhe09876@gmail.com',
    location: 'Pune, India',
    bio: 'Building intelligent applications and transforming data into meaningful insights.',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isAddExpOpen, setIsAddExpOpen] = useState(false);
  const [isAddEduOpen, setIsAddEduOpen] = useState(false);
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAddAchOpen, setIsAddAchOpen] = useState(false);

  // Form states - Projects
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState<'Python' | 'Data Science' | 'Data Analytics' | 'Web Development' | 'Machine Learning'>('Python');
  const [projDesc, setProjDesc] = useState('');
  const [projProblem, setProjProblem] = useState('');
  const [projTags, setProjTags] = useState('');

  // Form states - Skills
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState<'Programming' | 'Data Science' | 'Data Analytics' | 'Web Development' | 'Database' | 'Tools'>('Programming');
  const [skillLevel, setSkillLevel] = useState<'Expert' | 'Advanced' | 'Intermediate'>('Expert');
  const [skillPct, setSkillPct] = useState(90);
  const [skillDesc, setSkillDesc] = useState('');

  // Form states - Services
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceTags, setServiceTags] = useState('');

  // Form states - Experience
  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expPeriod, setExpPeriod] = useState('');
  const [expPoints, setExpPoints] = useState('');
  const [expTags, setExpTags] = useState('');

  // Form states - Education
  const [eduDegree, setEduDegree] = useState('');
  const [eduInstitution, setEduInstitution] = useState('');
  const [eduPeriod, setEduPeriod] = useState('');
  const [eduLocation, setEduLocation] = useState('');
  const [eduDetails, setEduDetails] = useState('');

  // Form states - Certifications
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certId, setCertId] = useState('');

  // Form states - Achievements
  const [achTitle, setAchTitle] = useState('');
  const [achIssuer, setAchIssuer] = useState('');
  const [achDate, setAchDate] = useState('');
  const [achDesc, setAchDesc] = useState('');
  const [achCategory, setAchCategory] = useState<'Coding' | 'Data Science' | 'Hackathon' | 'Academic' | 'Competition'>('Hackathon');

  // Selected Message for Messages Tab
  const [selectedMsgId, setSelectedMsgId] = useState<string | null>(messages[0]?.id || null);

  const unreadCount = messages.filter((m) => !m.read).length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const isSafeImageUrl = (value: string) => {
    if (/^data:image\/(png|jpeg|jpg|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(value)) {
      return true;
    }
    try {
      const parsed = new URL(value);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
      return false;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setImageError('Please select a PNG, JPG, WEBP, or GIF image.');
      e.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError('Image file must be 2 MB or smaller.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (!result || !isSafeImageUrl(result)) {
        setImageError('Could not read the selected image safely.');
        return;
      }
      if (onUpdateProfileImage) {
        await onUpdateProfileImage(result);
      }
      showToast('Profile image updated!');
    };
    reader.onerror = () => {
      setImageError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleApplyImageUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setImageError(null);
    const trimmed = imageUrlInput.trim();
    if (!trimmed) {
      setImageError('Please enter an image URL.');
      return;
    }
    if (!isSafeImageUrl(trimmed)) {
      setImageError('Please enter a valid http:// or https:// image URL.');
      return;
    }
    if (onUpdateProfileImage) {
      await onUpdateProfileImage(trimmed);
    }
    setImageUrlInput('');
    showToast('Profile image updated from URL!');
  };

  const handleResetProfileImage = async () => {
    setImageError(null);
    if (onUpdateProfileImage) {
      await onUpdateProfileImage(null);
    }
    setImageUrlInput('');
    showToast('Profile image reset to default.');
  };

  // Handlers for Projects
  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Project removed successfully');
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projDesc.trim()) return;

    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: projTitle,
      category: projCategory,
      status: 'Live',
      featured: true,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      description: projDesc,
      problemStatement: projProblem,
      tags: projTags.split(',').map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProjects((prev) => [newProj, ...prev]);
    setProjTitle('');
    setProjDesc('');
    setProjProblem('');
    setProjTags('');
    setIsAddProjectOpen(false);
    showToast('New project registered in Admin system');
  };

  // Handlers for Skills
  const handleDeleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
    showToast('Skill removed from matrix');
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    const newSkill: SkillItem = {
      id: `sk-${Date.now()}`,
      name: skillName,
      category: skillCategory,
      level: skillLevel,
      percentage: skillPct,
      iconName: 'code-2',
      description: skillDesc || `${skillName} skill node`
    };

    setSkills((prev) => [...prev, newSkill]);
    setSkillName('');
    setSkillDesc('');
    setIsAddSkillOpen(false);
    showToast('Skill added to verified matrix');
  };

  // Handlers for Services
  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service deleted');
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle.trim()) return;

    const newSrv: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: serviceTitle,
      description: serviceDesc,
      iconName: 'code',
      tags: serviceTags.split(',').map((t) => t.trim()).filter(Boolean)
    };

    setServices((prev) => [...prev, newSrv]);
    setServiceTitle('');
    setServiceDesc('');
    setServiceTags('');
    setIsAddServiceOpen(false);
    showToast('New service capability registered');
  };

  // Handlers for Experience
  const handleDeleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
    showToast('Experience record deleted');
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expCompany.trim() || !expRole.trim()) return;

    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: expCompany,
      role: expRole,
      period: expPeriod || '2025 - Present',
      points: expPoints.split('\n').map((p) => p.trim()).filter(Boolean),
      tags: expTags.split(',').map((t) => t.trim()).filter(Boolean)
    };

    setExperiences((prev) => [newExp, ...prev]);
    setExpCompany('');
    setExpRole('');
    setExpPeriod('');
    setExpPoints('');
    setExpTags('');
    setIsAddExpOpen(false);
    showToast('Experience record added');
  };

  // Handlers for Education
  const handleDeleteEducation = (id: string) => {
    setEducation((prev) => prev.filter((e) => e.id !== id));
    showToast('Education entry deleted');
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduDegree.trim() || !eduInstitution.trim()) return;

    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: eduDegree,
      institution: eduInstitution,
      period: eduPeriod || '2023 - 2025',
      location: eduLocation || 'Pune, India',
      details: eduDetails || 'Specialization in Data Science & Computer Applications'
    };

    setEducation((prev) => [newEdu, ...prev]);
    setEduDegree('');
    setEduInstitution('');
    setEduPeriod('');
    setEduLocation('');
    setEduDetails('');
    setIsAddEduOpen(false);
    showToast('Education entry added');
  };

  // Handlers for Certifications
  const handleDeleteCert = (id: string) => {
    setCertifications((prev) => prev.filter((c) => c.id !== id));
    showToast('Certification removed');
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim() || !certIssuer.trim()) return;

    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: certTitle,
      issuer: certIssuer,
      issueDate: certDate || '2025',
      credentialId: certId || `CERT-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Verified'
    };

    setCertifications((prev) => [newCert, ...prev]);
    setCertTitle('');
    setCertIssuer('');
    setCertDate('');
    setCertId('');
    setIsAddCertOpen(false);
    showToast('Certification added');
  };

  // Handlers for Achievements
  const handleDeleteAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id));
    showToast('Achievement entry deleted');
  };

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achTitle.trim()) return;

    const newAch: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: achTitle,
      issuer: achIssuer || 'Hackathon / Competition',
      date: achDate || '2025',
      description: achDesc || 'Recognized for data analytics & Python coding excellence',
      category: achCategory
    };

    setAchievements((prev) => [newAch, ...prev]);
    setAchTitle('');
    setAchIssuer('');
    setAchDate('');
    setAchDesc('');
    setIsAddAchOpen(false);
    showToast('Achievement entry added');
  };

  // Handlers for Messages
  const handleDeleteMsg = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMsgId === id) setSelectedMsgId(null);
    showToast('Message deleted');
  };

  const sidebarLinks = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Projects', icon: FolderGit2, badge: projects.length },
    { name: 'Skills', icon: Cpu, badge: skills.length },
    { name: 'Data Visualization', icon: BarChart2 },
    { name: 'Services', icon: Layers, badge: services.length },
    { name: 'Experience', icon: Briefcase, badge: experiences.length },
    { name: 'Education', icon: GraduationCap, badge: education.length },
    { name: 'Certifications', icon: Award, badge: certifications.length },
    { name: 'Achievements', icon: Trophy, badge: achievements.length },
    { name: 'Messages', icon: Mail, badge: unreadCount },
    { name: 'Settings', icon: Settings }
  ];

  const selectedMsg = messages.find((m) => m.id === selectedMsgId);

  return (
    <div className="min-h-screen pt-20 bg-[#020617] text-slate-200 flex flex-col md:flex-row relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[200] bg-sky-500 text-slate-950 px-5 py-3 rounded-xl font-mono text-xs font-bold shadow-[0_0_25px_rgba(56,189,248,0.5)] flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950/80 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span className="font-display font-extrabold text-xl text-white">
              Cmd Center
            </span>
            <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30 ml-auto font-bold uppercase">
              Admin OS
            </span>
          </div>

          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.name;
              return (
                <button
                  key={link.name}
                  onClick={() => setActiveTab(link.name)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-400/50 font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>

                  {link.badge !== undefined && link.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      link.name === 'Messages' && unreadCount > 0
                        ? 'bg-sky-500 text-slate-950'
                        : 'bg-white/10 text-slate-300'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Export & Lock */}
        <div className="pt-6 border-t border-white/10 mt-6 space-y-2">
          <button
            onClick={onOpenResume}
            className="w-full py-2.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-extrabold hover:bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export CV Resume
          </button>
          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Lock Admin Panel
            </button>
          )}
        </div>
      </aside>

      {/* Main Admin Canvas */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-8 custom-scrollbar">
        
        {/* Header Command Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('Settings')}
              className="relative group shrink-0 cursor-pointer"
              title="Change Profile Image"
            >
              <img
                src={profileImage}
                alt={adminProfile.name}
                className="w-14 h-14 rounded-2xl object-cover border border-sky-400/40 group-hover:border-sky-400 transition-colors"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-sky-500 text-slate-950 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Camera className="w-3.5 h-3.5" />
              </span>
            </button>
            <div>
              <h1 className="font-display font-extrabold text-3xl text-white flex items-center gap-3">
                {activeTab} Management
                <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/30">
                  ADMIN_PANEL
                </span>
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Admin: {adminProfile.name} ({adminProfile.title})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigateView('home')}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white font-mono text-xs cursor-pointer"
            >
              ← Public Site View
            </button>
            <button
              onClick={onOpenTerminal}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-sky-400 transition-colors cursor-pointer"
              title="Interactive Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Sign Out & Lock Admin"
              >
                <LogOut className="w-3.5 h-3.5" /> Lock
              </button>
            )}
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'Overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/10">
                <span className="text-xs font-mono text-slate-400 block mb-1">Total Projects</span>
                <span className="font-display text-4xl font-extrabold text-white">{projects.length}</span>
                <span className="text-[11px] font-mono text-sky-400 block mt-1">Python, DS & Analytics</span>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/10">
                <span className="text-xs font-mono text-slate-400 block mb-1">Total Skill Nodes</span>
                <span className="font-display text-4xl font-extrabold text-indigo-400">{skills.length}</span>
                <span className="text-[11px] font-mono text-slate-400 block mt-1">Categorized in matrix</span>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/10">
                <span className="text-xs font-mono text-slate-400 block mb-1">Certifications</span>
                <span className="font-display text-4xl font-extrabold text-emerald-400">{certifications.length}</span>
                <span className="text-[11px] font-mono text-emerald-400 block mt-1">100% Verified Credentials</span>
              </div>

              <div className="bg-sky-500/10 p-6 rounded-2xl border border-sky-500/30">
                <span className="text-xs font-mono text-sky-400 font-bold block mb-1">Unread Messages</span>
                <span className="font-display text-4xl font-extrabold text-sky-400">{unreadCount}</span>
                <button
                  onClick={() => setActiveTab('Messages')}
                  className="text-[11px] font-mono text-sky-400 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                >
                  View Messages Inbox →
                </button>
              </div>
            </div>

            {/* Quick Actions & Recent Projects Table */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="font-display font-bold text-xl text-white">Project Records Overview</h3>
                <button
                  onClick={() => setIsAddProjectOpen(true)}
                  className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-white/10">
                      <th className="py-3 px-2">Title</th>
                      <th className="py-3 px-2">Category</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5">
                        <td className="py-3 px-2 font-bold text-white flex items-center gap-2">
                          <img src={p.image} alt={p.title} className="w-8 h-8 rounded object-cover" />
                          <span>{p.title}</span>
                        </td>
                        <td className="py-3 px-2 text-slate-400">{p.category}</td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right space-x-2">
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'Projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/40 p-6 rounded-2xl border border-white/10">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Project Manager</h3>
                <p className="text-xs font-mono text-slate-400">Total Python & Data Projects: {projects.length}</p>
              </div>
              <button
                onClick={() => setIsAddProjectOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add New Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <div key={p.id} className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 space-y-3">
                  <img src={p.image} alt={p.title} className="w-full aspect-video object-cover rounded-xl" />
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                    {p.category}
                  </span>
                  <h4 className="font-display font-bold text-lg text-white">{p.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
                  <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-slate-500">{p.createdAt}</span>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="px-3 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono hover:bg-rose-500 hover:text-white cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'Skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/40 p-6 rounded-2xl border border-white/10">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Skill Matrix Manager</h3>
                <p className="text-xs font-mono text-slate-400">Manage technical competencies ({skills.length} total)</p>
              </div>
              <button
                onClick={() => setIsAddSkillOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((s) => (
                <div key={s.id} className="bg-slate-900/40 p-5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-sky-400 uppercase">{s.category}</span>
                      <h4 className="font-display font-bold text-lg text-white">{s.name}</h4>
                    </div>
                    <button
                      onClick={() => handleDeleteSkill(s.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-sky-400" style={{ width: `${s.percentage}%` }} />
                  </div>
                  <p className="text-xs text-slate-400">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DATA VISUALIZATION TAB */}
        {activeTab === 'Data Visualization' && (
          <div className="space-y-6">
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/10">
              <h3 className="font-display font-bold text-xl text-white">Analytics & Chart Visualizers</h3>
              <p className="text-xs font-mono text-slate-400">Preview live interactive datasets and Recharts visualizers</p>
            </div>
            <DataVisualizationSection />
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'Services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/40 p-6 rounded-2xl border border-white/10">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Services Capability Manager</h3>
                <p className="text-xs font-mono text-slate-400">Offerings & Technical Services ({services.length} active)</p>
              </div>
              <button
                onClick={() => setIsAddServiceOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => (
                <div key={srv.id} className="bg-slate-900/40 p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-display font-bold text-lg text-white">{srv.title}</h4>
                    <button
                      onClick={() => handleDeleteService(srv.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{srv.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {srv.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'Experience' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/40 p-6 rounded-2xl border border-white/10">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Career Experience Manager</h3>
                <p className="text-xs font-mono text-slate-400">Professional internships & roles ({experiences.length} total)</p>
              </div>
              <button
                onClick={() => setIsAddExpOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-slate-900/40 p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-start border-b border-white/10 pb-3">
                    <div>
                      <h4 className="font-display font-bold text-lg text-white">{exp.role}</h4>
                      <p className="font-mono text-xs text-sky-400 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" /> {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full">{exp.period}</span>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    {exp.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'Education' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/40 p-6 rounded-2xl border border-white/10">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Academic Degrees Manager</h3>
                <p className="text-xs font-mono text-slate-400">Degrees and qualifications ({education.length} total)</p>
              </div>
              <button
                onClick={() => setIsAddEduOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Degree
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="bg-slate-900/40 p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-bold text-lg text-white">{edu.degree}</h4>
                      <p className="font-mono text-xs text-sky-400">{edu.institution}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between font-mono text-xs text-slate-400 pt-2 border-t border-white/5">
                    <span>{edu.location}</span>
                    <span>{edu.period}</span>
                  </div>
                  <p className="text-xs text-slate-300">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === 'Certifications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/40 p-6 rounded-2xl border border-white/10">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Certifications Manager</h3>
                <p className="text-xs font-mono text-slate-400">Verified Credentials ({certifications.length} total)</p>
              </div>
              <button
                onClick={() => setIsAddCertOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Certification
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-slate-900/40 p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-bold text-lg text-white">{cert.title}</h4>
                      <p className="font-mono text-xs text-sky-400">{cert.issuer}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCert(cert.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between font-mono text-xs text-slate-400 pt-2 border-t border-white/5">
                    <span>ID: {cert.credentialId}</span>
                    <span>Issued: {cert.issueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'Achievements' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/40 p-6 rounded-2xl border border-white/10">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Achievements & Honors Manager</h3>
                <p className="text-xs font-mono text-slate-400">Hackathons & Honors ({achievements.length} total)</p>
              </div>
              <button
                onClick={() => setIsAddAchOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Achievement
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((ach) => (
                <div key={ach.id} className="bg-slate-900/40 p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-bold text-lg text-white">{ach.title}</h4>
                      <p className="font-mono text-xs text-amber-400">{ach.issuer}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAchievement(ach.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300">{ach.description}</p>
                  <span className="inline-block font-mono text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {ach.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'Messages' && (
          <div className="bg-slate-900/40 rounded-2xl border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
            <div className="md:col-span-5 border-r border-white/10 overflow-y-auto bg-slate-950/60 custom-scrollbar">
              <div className="p-4 border-b border-white/10 font-mono text-xs text-sky-400 font-bold">
                Inbox Communications ({messages.length})
              </div>
              {messages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedMsgId(m.id);
                    setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, read: true } : x)));
                  }}
                  className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${
                    selectedMsgId === m.id ? 'bg-sky-500/10 border-l-4 border-l-sky-400' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-sky-400">{m.sender}</span>
                    <span className="text-[10px] font-mono text-slate-500">{m.timestamp}</span>
                  </div>
                  <h5 className="text-xs font-semibold text-white truncate">{m.subject}</h5>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{m.preview}</p>
                </div>
              ))}
            </div>

            <div className="md:col-span-7 p-6 flex flex-col justify-between">
              {selectedMsg ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-start border-b border-white/10 pb-4">
                    <div>
                      <h4 className="font-display font-bold text-lg text-white">{selectedMsg.subject}</h4>
                      <p className="text-xs font-mono text-sky-400">From: {selectedMsg.sender} &lt;{selectedMsg.email}&gt;</p>
                    </div>
                    <button
                      onClick={() => handleDeleteMsg(selectedMsg.id)}
                      className="p-2 text-slate-400 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-white/5 whitespace-pre-line">
                    {selectedMsg.body}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-xs font-mono text-slate-500">
                  Select a message to view
                </div>
              )}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'Settings' && (
          <div className="space-y-6">
            {/* Profile Image Manager Card */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/10 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Profile Image</h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Update the avatar displayed on your Hero card and About section.
                  </p>
                </div>
                {profileImage !== PROFILE_IMAGE && (
                  <button
                    type="button"
                    onClick={handleResetProfileImage}
                    className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset to Default
                  </button>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="relative shrink-0">
                  <img
                    src={profileImage}
                    alt="Profile preview"
                    className="w-28 h-28 rounded-2xl object-cover border-2 border-sky-400/50 shadow-[0_0_25px_rgba(56,189,248,0.2)]"
                  />
                </div>

                <div className="flex-1 w-full space-y-4 font-mono text-xs">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                    >
                      <Upload className="w-4 h-4" /> Change / Upload Image
                    </button>
                    <span className="text-[11px] text-slate-400">
                      PNG, JPG, WEBP, or GIF (max 2 MB)
                    </span>
                  </div>

                  <form onSubmit={handleApplyImageUrl} className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Link2 className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="Or paste an image URL (https://...)"
                        className="w-full bg-slate-950 border border-white/10 pl-9 pr-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-sky-400 placeholder:text-slate-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white hover:border-sky-400/50 hover:bg-sky-500/10 font-bold transition-colors cursor-pointer shrink-0"
                    >
                      Apply URL
                    </button>
                  </form>

                  {imageError && (
                    <p className="text-rose-400 text-xs">{imageError}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Details Card */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/10 space-y-6">
              <h3 className="font-display font-bold text-xl text-white">Admin Profile & Portfolio Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Developer Name</label>
                  <input
                    type="text"
                    value={adminProfile.name}
                    onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={adminProfile.title}
                    onChange={(e) => setAdminProfile({ ...adminProfile, title: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={adminProfile.email}
                    onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={adminProfile.location}
                    onChange={(e) => setAdminProfile({ ...adminProfile, location: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <button
                onClick={() => showToast('Admin settings saved successfully!')}
                className="px-6 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 cursor-pointer"
              >
                Save Profile Changes
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ADD PROJECT MODAL */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-sky-500/30 rounded-2xl p-6 w-full max-w-lg space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Add New Project</h3>
              <button onClick={() => setIsAddProjectOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Category</label>
                <select
                  value={projCategory}
                  onChange={(e: any) => setProjCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                >
                  <option value="Python">Python</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Machine Learning">Machine Learning</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Description *</label>
                <textarea
                  required
                  rows={2}
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Problem Statement</label>
                <textarea
                  rows={2}
                  value={projProblem}
                  onChange={(e) => setProjProblem(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Python, Pandas, Scikit-learn"
                  value={projTags}
                  onChange={(e) => setProjTags(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(false)}
                  className="px-4 py-2 rounded bg-white/10 text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-sky-500 text-slate-950 font-bold cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SKILL MODAL */}
      {isAddSkillOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-sky-500/30 rounded-2xl p-6 w-full max-w-lg space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Add New Skill Node</h3>
              <button onClick={() => setIsAddSkillOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSkill} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Category</label>
                <select
                  value={skillCategory}
                  onChange={(e: any) => setSkillCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                >
                  <option value="Programming">Programming</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Proficiency % ({skillPct}%)</label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={skillPct}
                  onChange={(e) => setSkillPct(Number(e.target.value))}
                  className="w-full accent-sky-400"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={skillDesc}
                  onChange={(e) => setSkillDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddSkillOpen(false)}
                  className="px-4 py-2 rounded bg-white/10 text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-sky-500 text-slate-950 font-bold cursor-pointer"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SERVICE MODAL */}
      {isAddServiceOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-sky-500/30 rounded-2xl p-6 w-full max-w-lg space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Add New Service</h3>
              <button onClick={() => setIsAddServiceOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddService} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Python, Flask, REST API"
                  value={serviceTags}
                  onChange={(e) => setServiceTags(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddServiceOpen(false)}
                  className="px-4 py-2 rounded bg-white/10 text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-sky-500 text-slate-950 font-bold cursor-pointer"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD EXPERIENCE MODAL */}
      {isAddExpOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-sky-500/30 rounded-2xl p-6 w-full max-w-lg space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Add Experience Entry</h3>
              <button onClick={() => setIsAddExpOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExperience} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  value={expCompany}
                  onChange={(e) => setExpCompany(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Period (e.g., 2025 – Present)</label>
                <input
                  type="text"
                  value={expPeriod}
                  onChange={(e) => setExpPeriod(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Key Responsibilities (One per line)</label>
                <textarea
                  rows={3}
                  value={expPoints}
                  onChange={(e) => setExpPoints(e.target.value)}
                  placeholder="Developed Python ETL scripts...&#10;Created Tableau dashboards..."
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddExpOpen(false)}
                  className="px-4 py-2 rounded bg-white/10 text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-sky-500 text-slate-950 font-bold cursor-pointer"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD EDUCATION MODAL */}
      {isAddEduOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-sky-500/30 rounded-2xl p-6 w-full max-w-lg space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Add Academic Degree</h3>
              <button onClick={() => setIsAddEduOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEducation} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Degree Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MCA (Master of Computer Applications)"
                  value={eduDegree}
                  onChange={(e) => setEduDegree(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  placeholder="Savitribai Phule Pune University"
                  value={eduInstitution}
                  onChange={(e) => setEduInstitution(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Period</label>
                <input
                  type="text"
                  placeholder="2023 - 2025"
                  value={eduPeriod}
                  onChange={(e) => setEduPeriod(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Pune, MH, India"
                  value={eduLocation}
                  onChange={(e) => setEduLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Details & Highlights</label>
                <textarea
                  rows={2}
                  value={eduDetails}
                  onChange={(e) => setEduDetails(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddEduOpen(false)}
                  className="px-4 py-2 rounded bg-white/10 text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-sky-500 text-slate-950 font-bold cursor-pointer"
                >
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CERTIFICATION MODAL */}
      {isAddCertOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-sky-500/30 rounded-2xl p-6 w-full max-w-lg space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Add Certification Credential</h3>
              <button onClick={() => setIsAddCertOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCert} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Certification Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Python Data Analysis Professional"
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Issuer *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coursera / HackerRank"
                  value={certIssuer}
                  onChange={(e) => setCertIssuer(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Issue Date</label>
                <input
                  type="text"
                  placeholder="e.g. 2025"
                  value={certDate}
                  onChange={(e) => setCertDate(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Credential ID</label>
                <input
                  type="text"
                  placeholder="e.g. PY-DAT-88392"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCertOpen(false)}
                  className="px-4 py-2 rounded bg-white/10 text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-sky-500 text-slate-950 font-bold cursor-pointer"
                >
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ACHIEVEMENT MODAL */}
      {isAddAchOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-sky-500/30 rounded-2xl p-6 w-full max-w-lg space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Add Achievement / Award</h3>
              <button onClick={() => setIsAddAchOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAchievement} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Achievement Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winner - SPPU Data Analytics Hackathon"
                  value={achTitle}
                  onChange={(e) => setAchTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Issuer / Host</label>
                <input
                  type="text"
                  placeholder="e.g. Pune Tech Council"
                  value={achIssuer}
                  onChange={(e) => setAchIssuer(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Date</label>
                <input
                  type="text"
                  placeholder="e.g. 2025"
                  value={achDate}
                  onChange={(e) => setAchDate(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={achDesc}
                  onChange={(e) => setAchDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddAchOpen(false)}
                  className="px-4 py-2 rounded bg-white/10 text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-sky-500 text-slate-950 font-bold cursor-pointer"
                >
                  Save Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
