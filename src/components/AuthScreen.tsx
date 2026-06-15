/**
 * RitemastaPro - Auth dialog screen (login/signup)
 * Updated to support upper right toggle, premium tactile sound responses and Lifetime access button
 */
import React, { useState } from "react";
import { User } from "../types";
import { Mail, Lock, User as UserIcon, X, Check } from "lucide-react";

interface AuthScreenProps {
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  onChangeTab?: (tab: string) => void;
}

// Custom highly crafted Web Audio API Synthesizer for "Vista hover chime"
export const playVistaSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    // A lush, ascending pentatonic major 9th chord (representing premium Microsoft vista-era positive sound aesthetics)
    // Frequencies: C4 (261.63), E4 (329.63), G4 (392.00), B4 (493.88), D5 (587.33)
    const pitches = [261.63, 329.63, 392.00, 493.88, 587.33];
    
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.12, now + 0.12);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
    
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(350, now + 1.0);
    
    masterGain.connect(filter);
    filter.connect(ctx.destination);
    
    pitches.forEach((pitch, idx) => {
      // Stagger notes starting time slightly to build an organic arpeggiator cascade
      const startTime = now + (idx * 0.05);
      
      const osc = ctx.createOscillator();
      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(pitch, startTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.004, startTime + 0.5);
      
      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.025, startTime);
      
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      
      osc.start(startTime);
      osc.stop(startTime + 1.5);
    });
  } catch (err) {
    // Avoid blocking UI if audio system is locked locally or blocked prior to absolute human interaction
  }
};

export default function AuthScreen({ onClose, onAuthSuccess, onChangeTab }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed. Please verify credentials.");
      }

      if (isLogin) {
        setSuccess("Success! Welcome back to the Global Ritemasta Ecosystem.");
        setTimeout(() => {
          onAuthSuccess(data.user);
          onClose();
        }, 1000);
      } else {
        setSuccess("User created successfully! Loading interactive access pass.");
        // Auto convert to login view
        setTimeout(() => {
          setIsLogin(true);
          setSuccess("Please log in with your registered credentials.");
        }, 1200);
      }
    } catch (err: any) {
      setError(err.message || "Network credentials mismatch");
    } finally {
      setLoading(false);
    }
  };

  const handleLifetimeRedirect = () => {
    onClose();
    if (onChangeTab) {
      onChangeTab("export");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#2D1B0E]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border border-[#E8E0D8] shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Toggle Switcher Relocated to UPPER RIGHT TOP CORNER */}
        <div className="absolute top-4 right-14 flex items-center bg-[#FDF8F0] border border-[#E8E0D8] rounded-full p-0.5 shadow-sm" id="auth-mode-switch-pill">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError("");
              setSuccess("");
            }}
            className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-300 ${
              isLogin
                ? "bg-[#D4A853] text-[#2D1B0E] font-black shadow-sm"
                : "text-[#8A7A6A] hover:text-[#2D1B0E]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError("");
              setSuccess("");
            }}
            className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-300 ${
              !isLogin
                ? "bg-[#D4A853] text-[#2D1B0E] font-black shadow-sm"
                : "text-[#8A7A6A] hover:text-[#2D1B0E]"
            }`}
          >
            Register
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-[#FDF8F0] text-[#8A7A6A] hover:text-[#2D1B0E] rounded-full transition-colors"
          id="btn-close-auth"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Lockup */}
        <div className="text-center mb-6 mt-2 pt-2">
          <div className="w-12 h-12 flex items-center justify-center bg-[#D4A853] rounded-full mx-auto text-[#2D1B0E] font-bold text-xl font-serif mb-2 shadow-sm">
            RM
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2D1B0E]">
            {isLogin ? "Welcome back!" : "Unlock Your Gift"}
          </h2>
          <p className="text-xs text-[#8A7A6A] mt-1 font-medium px-2">
            {isLogin
              ? "Sign in to manage and sync your publishing masterpieces"
              : "Register credentials to auto-format, write, and export with full offline integrity"}
          </p>
        </div>

        {/* Global Error/Success Notification */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-semibold rounded" id="auth-error">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-xs font-semibold rounded flex items-center gap-1" id="auth-success">
            <Check className="w-4 h-4 shrink-0" />
            {success}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-[#2D1B0E] mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Robert Ashley Nikoi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-[#E8E0D8] rounded-lg text-sm focus:outline-none focus:border-[#D4A853]"
                  id="auth-name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#2D1B0E] mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                placeholder="author@ritemasta.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-[#E8E0D8] rounded-lg text-sm focus:outline-none focus:border-[#D4A853]"
                id="auth-email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D1B0E] mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-[#E8E0D8] rounded-lg text-sm focus:outline-none focus:border-[#D4A853]"
                id="auth-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#D4A853] hover:bg-[#C49A42] text-[#2D1B0E] font-bold text-sm rounded-lg transition-all active:scale-95 disabled:opacity-50 mt-2 hover:shadow-lg shadow-sm"
            id="btn-auth-submit"
          >
            {loading ? "Authenticating..." : isLogin ? "Sign In" : "Register Credentials"}
          </button>
        </form>

        {/* BOTTOM OPTION: Replaced with premium animated Lifetime Access button with Vista Hover & Chime */}
        <div className="text-center mt-6 pt-5 border-t border-[#E8E0D8]" id="auth-lifetime-container">
          <p className="text-xs text-[#8A7A6A] font-medium mb-3">
            Want to bypass manual codes entirely? Get immediate keys.
          </p>
          <button
            type="button"
            onClick={handleLifetimeRedirect}
            onMouseEnter={playVistaSound}
            className="w-full relative overflow-hidden py-3 px-4 rounded-xl font-extrabold text-xs uppercase tracking-widest text-[#2D1B0E] border border-[#D4A853]/40 bg-gradient-to-r from-[#D4A853] via-[#FCE3B4] to-[#C49A42] shadow-[0_4px_15px_rgba(212,168,83,0.25)] transition-all duration-500 hover:from-cyan-400 hover:via-blue-500 hover:to-teal-400 hover:text-white hover:scale-[1.03] active:scale-[0.98] cursor-pointer group"
            id="btn-vista-lifetime"
          >
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              ✨ Get Instantly: Lifetime Access Pass $25 ✨
            </span>
          </button>
          
          <div className="mt-3.5 flex justify-center gap-3 text-[9px] text-[#8A7A6A] font-bold uppercase tracking-wider">
            <span>✓ No Subscriptions</span>
            <span>•</span>
            <span>✓ 28 Templates</span>
          </div>
        </div>

      </div>
    </div>
  );
}
