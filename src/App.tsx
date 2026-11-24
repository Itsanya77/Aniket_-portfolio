import React, { useState, useEffect } from 'react';
import { NavView } from './types';
import { BackgroundShader } from './components/BackgroundShader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { DataVisualizationSection } from './components/DataVisualizationSection';
import { ServicesSection } from './components/ServicesSection';
import { DataScienceWorkflowSection } from './components/DataScienceWorkflowSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { GitHubSection } from './components/GitHubSection';
import { ContactSection } from './components/ContactSection';
import { DashboardView } from './components/DashboardView';
import { AdminLoginGate } from './components/AdminLoginGate';
import { ResumeModal } from './components/ResumeModal';
import { InteractiveTerminalModal } from './components/InteractiveTerminalModal';
import { MessageInboxModal } from './components/MessageInboxModal';
import { INITIAL_MESSAGES, PROFILE_IMAGE } from './data/mockData';

const PROFILE_IMAGE_STORAGE_KEY = 'aniket_portfolio_profile_image';

function isValidImageSrc(value: string): boolean {
  if (/^data:image\/(png|jpeg|jpg|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(value)) {
    return true;
  }
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function App() {
  const [currentView, setCurrentView] = useState<NavView>('home');
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_IMAGE_STORAGE_KEY);
      if (saved && isValidImageSrc(saved)) {
        return saved;
      }
    } catch {
      // Ignore storage access errors
    }
    return PROFILE_IMAGE;
  });
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const handleMarkRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const handleDeleteMsg = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAdminLogout = async () => {
    const tokenToRevoke = adminToken;
    setAdminToken(null);
    setCurrentView('home');
    if (tokenToRevoke) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${tokenToRevoke}` },
        });
      } catch {
        // Ignore network error after clearing client session state
      }
    }
  };

  const handleUpdateProfileImage = async (imageUrl: string | null): Promise<boolean> => {
    const nextImage = imageUrl && isValidImageSrc(imageUrl) ? imageUrl : PROFILE_IMAGE;
    setProfileImage(nextImage);
    try {
      if (imageUrl && isValidImageSrc(imageUrl)) {
        localStorage.setItem(PROFILE_IMAGE_STORAGE_KEY, imageUrl);
      } else {
        localStorage.removeItem(PROFILE_IMAGE_STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota errors
    }

    if (adminToken) {
      try {
        const res = await fetch('/api/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ imageUrl }),
        });
        return res.ok;
      } catch {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    let active = true;
    fetch('/api/profile')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.imageUrl && isValidImageSrc(data.imageUrl)) {
          setProfileImage(data.imageUrl);
        }
      })
      .catch(() => {
        // Fallback to local state / default image
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  useEffect(() => {
    if (currentView !== 'dashboard' || !adminToken) return;
    let active = true;
    fetch('/api/admin/verify', {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
      .then((res) => {
        if (active && !res.ok) {
          setAdminToken(null);
        }
      })
      .catch(() => {
        if (active) {
          setAdminToken(null);
        }
      });
    return () => {
      active = false;
    };
  }, [currentView, adminToken]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        if (!adminToken) {
          return (
            <AdminLoginGate
              onAuthenticated={(token) => setAdminToken(token)}
              onCancel={() => setCurrentView('home')}
            />
          );
        }
        return (
          <DashboardView
            onNavigateView={(view) => setCurrentView(view)}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenInbox={() => setIsInboxOpen(true)}
            onLogout={handleAdminLogout}
            profileImage={profileImage}
            onUpdateProfileImage={handleUpdateProfileImage}
          />
        );

      case 'about':
        return (
          <div className="pt-24 space-y-12">
            <AboutSection profileImage={profileImage} />
            <EducationSection />
          </div>
        );

      case 'skills':
        return (
          <div className="pt-24 space-y-12">
            <SkillsSection />
            <DataVisualizationSection />
          </div>
        );

      case 'projects':
        return (
          <div className="pt-24 space-y-12">
            <ProjectsSection />
            <GitHubSection />
          </div>
        );

      case 'services':
        return (
          <div className="pt-24 space-y-12">
            <ServicesSection />
            <DataScienceWorkflowSection />
          </div>
        );

      case 'experience':
        return (
          <div className="pt-24 space-y-12">
            <ExperienceSection />
            <CertificationsSection />
            <AchievementsSection />
          </div>
        );

      case 'education':
        return (
          <div className="pt-24 space-y-12">
            <EducationSection />
          </div>
        );

      case 'certifications':
        return (
          <div className="pt-24 space-y-12">
            <CertificationsSection />
          </div>
        );

      case 'data-vis':
        return (
          <div className="pt-24 space-y-12">
            <DataVisualizationSection />
          </div>
        );

      case 'workflow':
        return (
          <div className="pt-24 space-y-12">
            <DataScienceWorkflowSection />
          </div>
        );

      case 'achievements':
        return (
          <div className="pt-24 space-y-12">
            <AchievementsSection />
          </div>
        );

      case 'github':
        return (
          <div className="pt-24 space-y-12">
            <GitHubSection />
          </div>
        );

      case 'contact':
        return (
          <div className="pt-24 space-y-12">
            <ContactSection />
          </div>
        );

      case 'home':
      default:
        return (
          <>
            <HeroSection
              onNavigate={(view) => setCurrentView(view)}
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenTerminal={() => setIsTerminalOpen(true)}
              profileImage={profileImage}
            />
            <AboutSection profileImage={profileImage} />
            <SkillsSection />
            <DataVisualizationSection />
            <ServicesSection />
            <DataScienceWorkflowSection />
            <ProjectsSection />
            <ExperienceSection />
            <EducationSection />
            <CertificationsSection />
            <AchievementsSection />
            <GitHubSection />
            <ContactSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative selection:bg-sky-500/30 selection:text-sky-200 overflow-x-hidden">
      {/* Immersive Ambient Spot Lights */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sky-900/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-900/15 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Interactive WebGL Shader Background */}
      <BackgroundShader opacity={0.3} />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        isAdminAuthenticated={Boolean(adminToken)}
      />

      {/* Primary Page Content View */}
      <main className="relative z-10 pb-20">{renderCurrentView()}</main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md py-8 text-xs font-mono text-slate-500 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span className="font-bold text-slate-200">ANIKET BADHE PORTFOLIO</span>
            <span className="text-slate-600">|</span>
            <span className="text-sky-400">Python Developer • Data Science & Data Analytics</span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Location: Pune, MH, India</span>
            <span className="text-slate-600">|</span>
            <span>© {new Date().getFullYear()} Aniket Badhe</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <InteractiveTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      <MessageInboxModal
        messages={messages}
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        onMarkRead={handleMarkRead}
        onDelete={handleDeleteMsg}
      />
    </div>
  );
}

export default App;
