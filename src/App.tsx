/**
 * RitemastaPro - Master Client Application File
 */
import { useState, useEffect } from "react";
import { User, Project, Chapter, LayoutSettings } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import YayraChatbot from "./components/YayraChatbot";
import AuthScreen, { playVistaSound } from "./components/AuthScreen";
import Dashboard from "./components/Dashboard";
import BookEditor from "./components/BookEditor";
import LayoutDesigner from "./components/LayoutDesigner";
import ExportPanel from "./components/ExportPanel";
import ContactForm from "./components/ContactForm";
import StaticPages from "./components/StaticPages";
import AdminPanel from "./components/AdminPanel";
import ManuscriptParser from "./components/ManuscriptParser";
import DesignEngine from "./components/DesignEngine";
import IWriteStudio from "./components/IWriteStudio";
import { Settings, CreditCard, Sparkles, Check, Database, HelpCircle } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  // Project Workspace States
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Synchronise active user profile from browser cookies/localStorage
  useEffect(() => {
    const cachedUser = localStorage.getItem("ritemasta_user");
    if (cachedUser) {
      try {
        const parsed = JSON.parse(cachedUser);
        setUser(parsed);
      } catch (e) {
        console.error(e);
      }
    }

    // Load local projects cache as reliable offline fallback
    const cachedProjects = localStorage.getItem("ritemasta_projects");
    if (cachedProjects) {
      try {
        setProjects(JSON.parse(cachedProjects));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save projects to offline cash as writing progresses
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("ritemasta_projects", JSON.stringify(projects));
    }
  }, [projects]);

  // Synchronise profile changes to local cache
  const saveUserSession = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem("ritemasta_user", JSON.stringify(u));
    } else {
      localStorage.removeItem("ritemasta_user");
    }
  };

  // Redeem code pass function
  const handleRedeemCode = async (code: string): Promise<boolean> => {
    if (!user) return false;
    try {
      const response = await fetch("/api/auth/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, code }),
      });
      const data = await response.json();
      if (response.ok && data.user) {
        saveUserSession(data.user);
        // Refresh local projects profile unlocked states if needed
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // Update profile name
  const handleUpdateUserName = async (newName: string) => {
    if (!user) return;
    try {
      const response = await fetch("/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, newName }),
      });
      const data = await response.json();
      if (response.ok && data.user) {
        saveUserSession(data.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleForceUnlockFree = () => {
    if (!user) {
      alert("Sign In or Register a Profile first to trigger testing unlocks.");
      return;
    }
    const unlockedUser: User = {
      ...user,
      isUnlocked: true,
      unlockCode: "TEST-LIFETIME-PASS",
    };
    saveUserSession(unlockedUser);
    alert("✓ Tester Mode: $25 Lifetime Access Pass is now active for your user profile! Enjoy clean PDF, EPUB, XML exports.");
  };

  const handleCreateProject = (type: Project["type"]) => {
    if (!user) {
      setIsAuthOpen(true);
      alert("Please Sign In first to create a secure personal book project workspace.");
      return;
    }

    const defaultLayout: LayoutSettings = {
      pageSize: "6x9",
      marginTop: 1.0,
      marginBottom: 1.0,
      marginLeft: 1.25,
      marginRight: 1.0,
      bodyFontSize: 12,
      lineSpacing: "1.5",
      fontSerif: "Playfair Display",
      fontSans: "Inter",
      fontDisplay: "Playfair Display",
      activeTemplate: "Serene Wellness",
    };

    const newProject: Project = {
      id: Math.random().toString(),
      userId: user.id,
      type,
      metadata: {
        title: `My Awesome ${type === "presentation" ? "Presentation" : "Book"}`,
        author: user.name,
        publisher: "Ritemasta Publications",
        edition: "1st Edition",
        copyright: `© 2026 ${user.name}. All rights reserved.`,
      },
      layout: defaultLayout,
      chapters: [
        {
          id: "ch-intro",
          title: "Introduction",
          content: "Welcome to your new masterbook draft formatting workspace! Tap on written layouts to apply typography or write outlines.",
          order: 0,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    setSelectedProject(newProject);
    setCurrentTab("editor");
  };

  const handleCreateParsedProject = (title: string, chaptersList: Chapter[]) => {
    if (!user) {
      setIsAuthOpen(true);
      alert("Please Sign In first to create a secure personal workspace.");
      return;
    }

    const defaultLayout: LayoutSettings = {
      pageSize: "6x9",
      marginTop: 1.0,
      marginBottom: 1.0,
      marginLeft: 1.25,
      marginRight: 1.0,
      bodyFontSize: 12,
      lineSpacing: "1.5",
      fontSerif: "Playfair Display",
      fontSans: "Inter",
      fontDisplay: "Playfair Display",
      activeTemplate: "Serene Wellness",
    };

    const newProject: Project = {
      id: Math.random().toString(),
      userId: user.id,
      type: "ebook",
      metadata: {
        title: title || "Parsed Manuscript Book",
        author: user.name,
        publisher: "Ritemasta Publications",
        edition: "1st Edition",
        copyright: `© 2026 ${user.name}. All rights reserved.`,
      },
      layout: defaultLayout,
      chapters: chaptersList,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    setSelectedProject(newProject);
    setCurrentTab("editor");
    alert(`✓ Document '${title}' parsed and loaded into workspace successfully!`);
  };

  const handleDeleteProject = (id: string) => {
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
    // Clean cache if empty
    if (filtered.length === 0) {
      localStorage.removeItem("ritemasta_projects");
    }
  };

  const handleUpdateActiveProject = (updatedProj: Project) => {
    setSelectedProject(updatedProj);
    const updatedList = projects.map((p) => (p.id === updatedProj.id ? updatedProj : p));
    setProjects(updatedList);
  };

  return (
    <div className="bg-[#FFFDFB] text-[#2D1B0E] font-sans min-h-screen flex flex-col relative">
      {/* Sticky navigation Header */}
      <Header
        currentTab={currentTab}
        onChangeTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== "editor" && !selectedProject) {
            setSelectedProject(null);
          }
        }}
        user={user}
        onLogout={() => {
          saveUserSession(null);
          setProjects([]);
          setSelectedProject(null);
          setCurrentTab("home");
          alert("Logged out safely from RitemastaPro.");
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Primary Views Router */}
      <main className="flex-1">
        {currentTab === "home" && (
          <div>
            {!user ? (
              /* LANDING VIEW: Dynamic home page */
              <div>
                {/* Hero Section */}
                <section className="bg-[#2D1B0E] text-[#FDF8F0] py-16 px-6 relative overflow-hidden text-center md:text-left">
                  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                      <span className="inline-block bg-[#D4A853]/15 text-[#D4A853] text-xs font-bold px-3.5 py-1 rounded-full border border-[#D4A853]/30 uppercase tracking-widest">
                        Global Publishing Ecosystem
                      </span>
                      <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                        Write. Format. Publish. <br />
                        Like a <span className="text-[#D4A853]">Pro</span>.
                      </h1>
                      <p className="text-sm sm:text-base text-[#B8A89A] max-w-lg leading-relaxed text-balance">
                        An intelligent, unified global workspace empowering authors, educators, and creators worldwide. Beyond simple formatting, RitemastaPro integrates multi-format compilation, AI-driven educational technology, presentation builders, and offline sovereignty. No subscriptions—absolute lifetime access forever.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <button
                          onClick={() => setIsAuthOpen(true)}
                          onMouseEnter={playVistaSound}
                          className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-[#2D1B0E] bg-gradient-to-r from-[#D4A853] via-[#FFE3A8] to-[#C49A42] rounded-full transition-all duration-500 hover:from-cyan-400 hover:via-blue-500 hover:to-teal-400 hover:text-white hover:scale-105 active:scale-95 shadow-md shadow-[#D4A853]/25 hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] cursor-pointer animate-[flash-fast_1.5s_infinite]"
                          id="btn-hero-create-project"
                        >
                          🚀 Create a Project 🚀
                        </button>
                        <a
                          href="#learn-more"
                          className="px-6 py-3 border-2 border-white/50 text-white hover:bg-white hover:text-[#2D1B0E] font-bold text-sm rounded-full transition-all cursor-pointer"
                        >
                          Read Success Stories
                        </a>
                      </div>
                    </div>

                    {/* Logo display widget */}
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-40 h-40 bg-[#D4A853] rounded-full flex items-center justify-center text-[#2D1B0E] font-bold font-serif text-5xl border-4 border-white shadow-xl animate-in zoom-in-75 duration-200">
                        RM
                      </div>
                      <span className="font-serif text-3xl font-extrabold tracking-tight">
                        <span className="animate-wavy-shine">Ritemasta</span><span className="text-[#D4A853]">Pro</span>
                      </span>
                      <span className="text-[10px] text-[#B8A89A] uppercase tracking-widest font-bold">
                        Publishing Technology
                      </span>
                    </div>
                  </div>
                </section>

                {/* Everything you need: Bento Cards */}
                <section className="py-16 px-6 bg-[#FFFDFB]">
                  <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center max-w-xl mx-auto">
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1B0E]">
                        Automated Master Publishing Platform
                      </h2>
                      <p className="text-xs text-[#8A7A6A] mt-1.5">
                        Surpass Atticus, vellum, and Reedsy with robust features made for self-publishers.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      <div className="bg-white border border-[#E8E0D8] p-8 rounded-2xl space-y-4 shadow-sm hover:shadow-md hover:border-[#D4A853]/50 transition-all text-center flex flex-col items-center justify-center">
                        <span className="text-5xl block animate-pulse duration-1000 mb-2">📤</span>
                        <h3 className="font-serif font-bold text-lg text-[#2D1B0E]">Drop Book &amp; Auto Outline</h3>
                        <p className="text-sm text-[#8A7A6A] leading-relaxed">
                          Drag and drop manuscripts. Instant automatic extraction of chapters, headings, and tables under 1 second.
                        </p>
                      </div>
                      <div className="bg-white border border-[#E8E0D8] p-8 rounded-2xl space-y-4 shadow-sm hover:shadow-md hover:border-[#D4A853]/50 transition-all text-center flex flex-col items-center justify-center">
                        <span className="text-5xl block animate-pulse duration-1000 mb-2">🔤</span>
                        <h3 className="font-serif font-bold text-lg text-[#2D1B0E]">28 Premium Templates</h3>
                        <p className="text-sm text-[#8A7A6A] leading-relaxed">
                          Beautiful styles custom-tailored for academic prints, poetry, fiction, corporate manuals, and magazines.
                        </p>
                      </div>
                      <div className="bg-white border border-[#E8E0D8] p-8 rounded-2xl space-y-4 shadow-sm hover:shadow-md hover:border-[#D4A853]/50 transition-all text-center flex flex-col items-center justify-center">
                        <span className="text-5xl block animate-pulse duration-1000 mb-2">⚡</span>
                        <h3 className="font-serif font-bold text-lg text-[#2D1B0E]">Offline-First Speed</h3>
                        <p className="text-sm text-[#8A7A6A] leading-relaxed">
                          In-browser immediate database saves. Work keeps fully compiling and rendering with or without internet.
                        </p>
                      </div>
                      <div className="bg-white border border-[#E8E0D8] p-8 rounded-2xl space-y-4 shadow-sm hover:shadow-md hover:border-[#D4A853]/50 transition-all text-center flex flex-col items-center justify-center">
                        <span className="text-5xl block animate-pulse duration-1000 mb-2">🎓</span>
                        <h3 className="font-serif font-bold text-lg text-[#2D1B0E]">Teecha AI Presentation</h3>
                        <p className="text-sm text-[#8A7A6A] leading-relaxed">
                          Outline slide synopsis scripts, curriculum planners, and virtual speaker prompts for teaching in one click.
                        </p>
                      </div>
                      <div className="bg-white border border-[#E8E0D8] p-8 rounded-2xl space-y-4 shadow-sm hover:shadow-md hover:border-[#D4A853]/50 transition-all text-center flex flex-col items-center justify-center">
                        <span className="text-5xl block animate-pulse duration-1000 mb-2">🥥</span>
                        <h3 className="font-serif font-bold text-lg text-[#2D1B0E]">Wellness Protocol Architect</h3>
                        <p className="text-sm text-[#8A7A6A] leading-relaxed">
                          Deploy high-end formatted layout blocks for wellness guides, recipe checksheets, and physical fitness tables.
                        </p>
                      </div>
                      <div className="bg-white border border-[#E8E0D8] p-8 rounded-2xl space-y-4 shadow-sm hover:shadow-md hover:border-[#D4A853]/50 transition-all text-center flex flex-col items-center justify-center">
                        <span className="text-5xl block animate-pulse duration-1000 mb-2">🇬🇭</span>
                        <h3 className="font-serif font-bold text-lg text-[#2D1B0E]">Heritage Dialect Guard</h3>
                        <p className="text-sm text-[#8A7A6A] leading-relaxed">
                          Zero-crash layout and font rendering validation for specialized Ewe, Ga, and Akan characters.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* What Authors & Educators Say: Testimonials Section */}
                <section className="py-16 px-6 bg-[#FDF8F0] border-y border-[#E8E0D8]" id="learn-more">
                  <div className="max-w-5xl mx-auto text-center md:text-left">
                    <div className="text-center max-w-xl mx-auto mb-10">
                      <span className="text-[10px] bg-[#D4A853]/15 text-[#D4A853] px-3.5 py-1 rounded-full font-bold uppercase tracking-widest border border-[#D4A853]/30">
                        Testimonials &amp; Reviews
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1B0E] mt-3">
                        What Professional Authors &amp; Educators Say
                      </h2>
                      <p className="text-xs text-[#8A7A6A] mt-1.5 leading-relaxed">
                        Join world-class teachers, herbal healing specialists, and indie authors who switched from high-cost platforms to RitemastaPro.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-2xl border border-[#E8E0D8] shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex text-amber-500 text-sm">★★★★★</div>
                          <p className="text-xs text-[#4A3728] leading-relaxed font-serif italic">
                            "The Teecha AI Presentation tool is an ultimate helper! I compiled my high-school curriculum based books & study guides into standard slide synopsis scripts and teaching modules in under 60 seconds. RitemastaPro is a complete classroom ecosystem."
                          </p>
                        </div>
                        <div className="border-t border-[#E8E0D8]/60 pt-3 mt-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#D4A853]/20 flex items-center justify-center font-bold text-xs text-[#2D1B0E]">
                            RO
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#2D1B0E]">Dr. Robert Osei-Kofi</h4>
                            <p className="text-[9px] text-[#8A7A6A] font-semibold uppercase">SHS Senior Academic Coordinator</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-[#E8E0D8] shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex text-amber-500 text-sm">★★★★★</div>
                          <p className="text-xs text-[#4A3728] leading-relaxed font-serif italic">
                            "I wrote all my medicinal herbal handbooks on here. Formatting compound recipe checklists usually crashes standard text editor tools, but Ritemasta formats Ewe, Ga, and Akan vowels natively. Saved me thousands in prepress visual design!"
                          </p>
                        </div>
                        <div className="border-t border-[#E8E0D8]/60 pt-3 mt-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#D4A853]/20 flex items-center justify-center font-bold text-xs text-[#2D1B0E]">
                            BA
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#2D1B0E]">Bob Ashley</h4>
                            <p className="text-[9px] text-[#8A7A6A] font-semibold uppercase">Author of The Bitter Leaf Protocols</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-[#E8E0D8] shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between md:col-span-2 lg:col-span-1">
                        <div className="space-y-3">
                          <div className="flex text-amber-500 text-sm">★★★★★</div>
                          <p className="text-xs text-[#4A3728] leading-relaxed font-serif italic">
                            "Getting standard layouts usually meant paying $250 for Vellum, which doesn't support Windows or local MoMo and crypto. RitemastaPro's single GHS 362.50 ($25) lifetime pass unlocked beautiful exports forever. Truly stellar!"
                          </p>
                        </div>
                        <div className="border-t border-[#E8E0D8]/60 pt-3 mt-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#D4A853]/20 flex items-center justify-center font-bold text-xs text-[#2D1B0E]">
                            SJ
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#2D1B0E]">Sarah Jenkins</h4>
                            <p className="text-[9px] text-[#8A7A6A] font-semibold uppercase">eBook Novelist &amp; Indie Creator</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              /* DASHBOARD VIEW: Render personalized board once logged in */
              <Dashboard
                user={user}
                onSelectProject={(proj) => {
                  setSelectedProject(proj);
                  setCurrentTab("editor");
                }}
                onDeleteProject={handleDeleteProject}
                onCreateProject={handleCreateProject}
                projects={projects.filter((p) => p.userId === user.id)}
                onRedeemCode={handleRedeemCode}
                onUpdateUserName={handleUpdateUserName}
              />
            )}
          </div>
        )}

        {/* Tab route mappings */}
        {currentTab === "upload" && (
          <ManuscriptParser
            user={user}
            onImportComplete={handleCreateParsedProject}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentTab === "editor" && (
          <div>
            {selectedProject ? (
              <BookEditor
                project={selectedProject}
                onUpdateProject={handleUpdateActiveProject}
                onBackToDashboard={() => {
                  setSelectedProject(null);
                  setCurrentTab("home");
                }}
              />
            ) : (
              <div className="py-16 text-center max-w-md mx-auto space-y-4">
                <Settings className="w-12 h-12 text-[#D4A853] mx-auto animate-spin" />
                <h2 className="font-serif font-bold text-lg text-[#2D1B0E]">Select a Project workspace first</h2>
                <p className="text-xs text-[#8A7A6A]">
                  Go to 'Home' (Dashboard) to launch or resume your wellness book, pitch deck outline, or receipts and forms.
                </p>
                <button
                  onClick={() => setCurrentTab("home")}
                  className="px-4 py-2 bg-[#D4A853] text-[#2D1B0E] font-bold text-xs rounded-full"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        )}

        {currentTab === "layout" && (
          <div>
            {selectedProject ? (
              <LayoutDesigner project={selectedProject} onUpdateProject={handleUpdateActiveProject} />
            ) : (
              <div className="py-16 text-center max-w-sm mx-auto space-y-4">
                <span className="text-4xl block">🎨</span>
                <h2 className="font-serif font-bold text-lg text-[#2D1B0E]">No active layout draft loaded</h2>
                <p className="text-xs text-[#8A7A6A]">
                  Margins and premium font selection map directly to your live doc. Sign in and open a project first!
                </p>
                <button
                  onClick={() => setCurrentTab("home")}
                  className="px-4 py-2 bg-[#2D1B0E] text-white text-xs font-bold rounded-full"
                >
                  Configure Book Layouts
                </button>
              </div>
            )}
          </div>
        )}

        {currentTab === "design_studio" && (
          <DesignEngine
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentTab === "iwrite_studio" && (
          <IWriteStudio
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentTab === "save" && (
          <div className="py-12 px-6">
            <div className="max-w-xl mx-auto bg-white border border-[#E8E0D8] p-6 sm:p-8 rounded-2xl shadow-sm text-center space-y-4">
              <span className="text-4xl block">💾</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D1B0E]">Backup &amp; Manuscript Security</h2>
              <p className="text-xs text-[#8A7A6A] leading-relaxed">
                RitemastaPro saves your work every 30 seconds automatically. For extra peace of mind, you can download a master JSON backup file below or restore from previous versions.
              </p>
              
              <div className="bg-[#FDF8F0] p-4 rounded-xl border flex flex-col items-center gap-3">
                <button
                  onClick={() => {
                    if (projects.length === 0) {
                      alert("You have no active projects to backup yet.");
                      return;
                    }
                    const text = JSON.stringify(projects, null, 2);
                    const blob = new Blob([text], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `ritemasta_backup_${new Date().toISOString().slice(0, 10)}.json`;
                    link.click();
                    URL.revokeObjectURL(url);
                    alert("✓ Workspace diagnostic package downloaded. Keep it safe!");
                  }}
                  className="px-4 py-2 bg-[#D4A853] hover:bg-[#C49A42] text-[#2D1B0E] font-bold text-xs rounded-full inline-flex items-center gap-1.5 cursor-pointer shadow hover:shadow-md transition-shadow"
                >
                  Download Raw JSON Backups
                </button>

                <p className="text-[10px] text-[#8C7A6D] leading-relaxed">
                  Backup contains all metadata, customized line heights, copyright notices, and active table of contents databases. This file stays completely private.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentTab === "export" && (
          <ExportPanel
            user={user}
            project={
              selectedProject ||
              projects[0] || {
                id: "placeholder",
                userId: "none",
                type: "ebook",
                metadata: { title: "Draft Manuscript Placeholder", author: "Guest Author" },
                layout: {
                  pageSize: "6x9",
                  marginTop: 1,
                  marginBottom: 1,
                  marginLeft: 1.25,
                  marginRight: 1,
                  bodyFontSize: 12,
                  lineSpacing: "1.5",
                  fontSerif: "Playfair Display",
                  fontSans: "Inter",
                  fontDisplay: "Playfair Display",
                  activeTemplate: "Serene Wellness",
                },
                chapters: [{ id: "c-1", title: "Placeholder Chapter", content: "No content loaded yet.", order: 0 }],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            }
            onRedeemCode={handleRedeemCode}
            onForceUnlockFree={handleForceUnlockFree}
          />
        )}

        {currentTab === "contact" && <ContactForm />}
        {currentTab === "about" && <StaticPages pageType="about" />}
        {currentTab === "privacy" && <StaticPages pageType="privacy" />}
        {currentTab === "terms" && <StaticPages pageType="terms" />}
        {currentTab === "admin" && <AdminPanel onBackToHome={() => setCurrentTab("home")} />}
      </main>

      {/* Floating chatbot assistant Yayra */}
      <YayraChatbot 
        currentTab={currentTab} 
        onChangeTab={setCurrentTab} 
        onCreateProject={handleCreateProject}
        user={user} 
      />

      {/* Auth Screen Sign In / Register Dialog */}
      {isAuthOpen && (
        <AuthScreen
          onChangeTab={setCurrentTab}
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={(authenticatedUser) => {
            saveUserSession(authenticatedUser);
            // Auto reload or map projects if needed
            const loadProjects = async () => {
              try {
                const response = await fetch(`/api/projects?userId=${authenticatedUser.id}`);
                const data = await response.json();
                if (response.ok && data.projects) {
                  setProjects(data.projects);
                  localStorage.setItem("ritemasta_projects", JSON.stringify(data.projects));
                }
              } catch (e) {
                console.warn(e);
              }
            };
            loadProjects();
            alert(`✓ Sign In Success! Welcome back, ${authenticatedUser.name}.`);
          }}
        />
      )}

      {/* Footer matching standard Ritemasta style */}
      <Footer onChangeTab={setCurrentTab} />
    </div>
  );
}
