/**
 * RitemastaPro - Header navigation bar component
 */
import { User } from "../types";

interface HeaderProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  user: User | null;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export default function Header({
  currentTab,
  onChangeTab,
  user,
  onLogout,
  onOpenAuth,
}: HeaderProps) {
  return (
    <header className="bg-[#2D1B0E] text-[#FDF8F0] py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-4 text-center">
        {/* Brand Logo Lockup */}
        <div
          className="flex items-center justify-center gap-3 cursor-pointer"
          onClick={() => onChangeTab("home")}
          id="brand-logo"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-[#D4A853] rounded-full overflow-hidden text-[#2D1B0E] font-bold text-lg font-serif shrink-0">
            RM
          </div>
          <div className="flex flex-col items-center leading-none">
            <span className="font-serif text-2xl font-bold tracking-tight">
              <span className="animate-wavy-shine">Ritemasta</span><span className="text-[#D4A853]">Pro</span>
            </span>
            <span className="text-[#D4A853] text-[0.62rem] font-bold tracking-wider uppercase mt-1">
              Publishing | Technology
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-1.5 items-center justify-center">
          <button
            onClick={() => onChangeTab("home")}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors ${
              currentTab === "home" ? "bg-[#4A3728] text-white" : "text-[#B8A89A] hover:text-white"
            }`}
            id="nav-home"
          >
            Home
          </button>
          <button
            onClick={() => onChangeTab("upload")}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors ${
              currentTab === "upload" ? "bg-[#4A3728] text-white" : "text-[#B8A89A] hover:text-white"
            }`}
            id="nav-upload"
          >
            Upload
          </button>
          <button
            onClick={() => onChangeTab("editor")}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors ${
              currentTab === "editor" ? "bg-[#4A3728] text-white" : "text-[#B8A89A] hover:text-white"
            }`}
            id="nav-editor"
          >
            Editor
          </button>
          <button
            onClick={() => onChangeTab("layout")}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors ${
              currentTab === "layout" ? "bg-[#4A3728] text-white" : "text-[#B8A89A] hover:text-white"
            }`}
            id="nav-layout"
          >
            Layout
          </button>
          <button
            onClick={() => onChangeTab("design_studio")}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors text-amber-300 ${
              currentTab === "design_studio" ? "bg-[#4A3728]" : "hover:text-white"
            }`}
            id="nav-design-studio"
          >
            Design Studio 🎨
          </button>
          <button
            onClick={() => onChangeTab("iwrite_studio")}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors text-[#FFE3A8] ${
              currentTab === "iwrite_studio" ? "bg-[#4A3728]" : "hover:text-white"
            }`}
            id="nav-iwrite-studio"
          >
            iWrite Pro 🧠
          </button>
          <button
            onClick={() => onChangeTab("save")}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors ${
              currentTab === "save" ? "bg-[#4A3728] text-white" : "text-[#B8A89A] hover:text-white"
            }`}
            id="nav-save"
          >
            Save
          </button>
          <button
            onClick={() => onChangeTab("export")}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors text-[#D4A853] ${
              currentTab === "export" ? "bg-[#4A3728]" : "hover:text-white"
            }`}
            id="nav-export"
          >
            Export
          </button>
          <button
            onClick={() => onChangeTab("contact")}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors ${
              currentTab === "contact" ? "bg-[#4A3728] text-white" : "text-[#B8A89A] hover:text-white"
            }`}
            id="nav-contact"
          >
            Contact
          </button>
          <button
            onClick={() => onChangeTab("admin")}
            className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-colors text-[#D4A853] ${
              currentTab === "admin" ? "bg-[#4A3728]" : "hover:text-[#FDF8F0]"
            }`}
            id="nav-admin"
          >
            🔑 Admin
          </button>
        </nav>

        {/* User Account Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                <p className="text-[0.65rem] text-[#D4A853] mt-0.5 leading-none">
                  {user.isUnlocked ? "Access Pass Active" : "Trial Version"}
                </p>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-1 bg-[#4A3728] hover:bg-[#5C4533] text-xs font-semibold text-[#FDF8F0] rounded transition-colors"
                id="btn-logout"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-1.5 bg-[#D4A853] hover:bg-[#C49A42] text-[#2D1B0E] font-bold text-xs rounded-full transition-shadow hover:shadow-lg duration-300"
              id="btn-login-trigger"
            >
              Sign In / Sign Up
            </button>
          )}

          {(!user || !user.isUnlocked) && (
            <button
              onClick={() => onChangeTab("export")}
              className="px-4 py-1.5 bg-[#D4A853] hover:bg-[#C49A42] text-[#2D1B0E] text-xs font-bold rounded-full shadow-[0px_0px_15px_rgba(212,168,83,0.4)] animate-pulse hidden md:block"
              id="btn-get-pass"
            >
              Get $25 Lifetime Access
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
