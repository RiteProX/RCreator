/**
 * RitemastaPro - Export Center, Lifetime Access redeeming & USD/GHS Converter
 */
import React, { useState, useEffect } from "react";
import { User, Project } from "../types";
import { Copy, Check, Download, CreditCard, Shield, Landmark } from "lucide-react";
import { exportToXML, exportToHTML, exportToDOC, exportToEPUB, exportToMOBI } from "../utils/exporters";

interface ExportPanelProps {
  user: User | null;
  project: Project;
  onRedeemCode: (code: string) => Promise<boolean>;
  onForceUnlockFree?: () => void;
}

export default function ExportPanel({ user, project, onRedeemCode, onForceUnlockFree }: ExportPanelProps) {
  // Rates USD vs GHS
  const [exchangeRate, setExchangeRate] = useState<number>(14.5); // Fallback estimate
  const [ghsPrice, setGhsPrice] = useState("362.50"); // $25 USD in GHS
  const [coupon, setCoupon] = useState("");
  const [unlockedMsg, setUnlockedMsg] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [copiedText, setCopiedText] = useState("");

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await res.json();
        if (data && data.rates && data.rates.GHS) {
          const rate = data.rates.GHS;
          setExchangeRate(rate);
          // Calculate $25 price in GHS
          setGhsPrice((25 * rate).toFixed(2));
        }
      } catch (e) {
        console.warn("exchange API failing, using fallback rate 14.50", e);
      }
    }
    fetchRate();
  }, []);

  const handleCopy = (txt: string, label: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockedMsg("");
    setUnlockError("");
    try {
      if (!coupon.trim()) throw new Error("Please type an active passcode");
      const ok = await onRedeemCode(coupon);
      if (ok) {
        setUnlockedMsg("✓ RitemastaPro unlocked! Your lifetime profile pass is now safe.");
        setCoupon("");
      } else {
        setUnlockError("Access Code is invalid or has already been used.");
      }
    } catch (err: any) {
      setUnlockError(err.message || "Failed to redeem code");
    }
  };

  const handleTriggerExport = (format: string) => {
    if (!user) {
      alert("Please Sign In or Sign Up first using our Header controls to export documents!");
      return;
    }
    if (!user.isUnlocked) {
      alert("⚠️ Trial Account Limit:\n\nPlease complete purchase of your $25 Lifetime Access Pass or redeem a valid license key below to unlock immediate downloads of EPUB, PDF, XML, or Word files.");
      return;
    }

    alert(`✓ Compiling and preparing download package for layout: ${format.toUpperCase()}...`);
    
    switch (format) {
      case "xml":
        exportToXML(project);
        break;
      case "html":
        exportToHTML(project);
        break;
      case "docx":
      case "doc":
        exportToDOC(project);
        break;
      case "epub":
        exportToEPUB(project);
        break;
      case "mobi":
        exportToMOBI(project);
        break;
      case "pdf":
        // Generate formatted document print page trigger
        window.print();
        break;
      default:
        alert("Preparing zip archives...");
    }
  };

  return (
    <div className="bg-[#FFFDFB] min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center md:text-left">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1B0E] mb-1">
            📥 Export Platform Publishing Outputs
          </h1>
          <p className="text-xs text-[#8A7A6A]">
            Download master-formatted books as print-ready PDF, ePUB e-reader, Kindle MOBI record indexes, flat DOC, standalone layout HTML, or structural XML datasets.
          </p>
        </div>

        {/* Pricing pass banner */}
        <div className="bg-[#2D1B0E] p-6 rounded-2xl text-[#FDF8F0] border-t-4 border-[#D4A853] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg">
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-[#D4A853]/20 border border-[#D4A853]/30 text-[#D4A853] rounded-full text-[10px] font-bold uppercase tracking-wider">
              Reduced Price: Lifetime pass
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1.5 leading-tight">
              Get Lifetime Access Pass for only <span className="text-[#D4A853] font-bold">$25</span>
            </h2>
            <p className="text-xs text-[#B8A89A] max-w-lg mt-1">
              We have completely removed our recurring monthly subscription! Secure immediate lifetime exports of all 28 templates forever with zero secondary fees.
            </p>
          </div>
          <div className="bg-[#4A3728] px-4 py-3 rounded-xl border border-[#D4A853]/20 text-center shrink-0 w-full md:w-auto">
            <span className="text-[10px] text-[#D4A853] block font-bold uppercase tracking-wide">Live GHS Equivalent Price</span>
            <span className="text-xl font-bold text-white mt-1.5 block">
              ₵{ghsPrice} GHS <span className="text-xs font-normal">(@ {exchangeRate.toFixed(2)})</span>
            </span>
          </div>
        </div>

        {/* Exporters Downloads Grid */}
        <div>
          <h3 className="font-serif text-base font-bold text-[#2D1B0E] mb-3">🗂️ Select Package format</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { id: "pdf", title: "PDF (Print-ready)", icon: "📄" },
              { id: "epub", title: "EPUB (eBook)", icon: "📖" },
              { id: "mobi", title: "MOBI (Kindle)", icon: "📱" },
              { id: "docx", title: "DOCX (Word)", icon: "📝" },
              { id: "html", title: "HTML (Standalone)", icon: "🌐" },
              { id: "xml", title: "XML Dataset", icon: "📊" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => handleTriggerExport(f.id)}
                className={`p-4 bg-white border border-[#E8E0D8] rounded-xl hover:border-[#D4A853] text-center hover:shadow transition-all group flex flex-col items-center justify-between min-h-[120px] cursor-pointer ${
                  user?.isUnlocked ? "opacity-100" : "opacity-75"
                }`}
              >
                <span className="text-3xl mb-1 group-hover:scale-105 transition-transform">{f.icon}</span>
                <span className="text-xs font-bold text-[#2D1B0E] block leading-tight">{f.title}</span>
                {(!user || !user.isUnlocked) && (
                  <span className="text-[8px] text-[#816C61] bg-gray-50 border border-gray-100 px-1 py-0.5 rounded mt-1 font-semibold uppercase">
                    Locked
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Channels and redeemer cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Column 1: Pay Channels */}
          <div className="bg-white border border-[#E8E0D8] p-5 rounded-2xl space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#2D1B0E] border-b pb-2 flex items-center gap-1">
              <Landmark className="w-4 h-4 text-[#D4A853]" /> 1. Make Payment &amp; Send Hash
            </h3>

            {/* MoMo Section */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2D1B0E] block">📱 Mobile Money Channels</span>
              <div className="bg-[#FDF8F0] p-2.5 rounded-lg border flex justify-between items-center text-xs">
                <span>Send GHS equivalent GHS ₵{ghsPrice} GHS to MTN: <strong>xxxx</strong></span>
                <button
                  onClick={() => handleCopy("xxxx", "MTN")}
                  className="p-1 hover:bg-[#E8E0D8] rounded transition-all shrink-0 text-[#2D1B0E]"
                >
                  {copiedText === "MTN" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="bg-[#FDF8F0] p-2.5 rounded-lg border flex justify-between items-center text-xs">
                <span>Send to Telecel Mobile Money: <strong>+233 500 119 195</strong></span>
                <button
                  onClick={() => handleCopy("+233 500 119 195", "Telecel")}
                  className="p-1 hover:bg-[#E8E0D8] rounded transition-all shrink-0 text-[#2D1B0E]"
                >
                  {copiedText === "Telecel" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Crypto Section */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2D1B0E] block">🪙 Cryptocurrency Addresses ($25 equivalent USDT / ETH / SOL)</span>
              <div className="bg-[#FDF8F0] p-2.5 rounded-lg border text-xs flex justify-between items-center">
                <span className="truncate mr-4">ETH / ERC20: <strong>0x161caE357e1C08022A07b79F124fA395F24bE053</strong></span>
                <button
                  onClick={() => handleCopy("0x161caE357e1C08022A07b79F124fA395F24bE053", "ETH")}
                  className="p-1 hover:bg-[#E8E0D8] rounded transition-all shrink-0 text-[#2D1B0E]"
                >
                  {copiedText === "ETH" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="bg-[#FDF8F0] p-2.5 rounded-lg border text-xs flex justify-between items-center">
                <span className="truncate mr-4">SOL Address: <strong>YoxQ94taomLRs7wsDcDYL1NDjBenpcrVNMCmNp1m7yQ</strong></span>
                <button
                  onClick={() => handleCopy("YoxQ94taomLRs7wsDcDYL1NDjBenpcrVNMCmNp1m7yQ", "SOL")}
                  className="p-1 hover:bg-[#E8E0D8] rounded transition-all shrink-0 text-[#2D1B0E]"
                >
                  {copiedText === "SOL" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="bg-[#FDF8F0] p-2.5 rounded-lg border text-xs flex justify-between items-center">
                <span className="truncate mr-4">Bitcoin BTC Code: <strong>bc1qr0xfzkelhz3xpf53h57ew5uks5hsqkjwwavuzx</strong></span>
                <button
                  onClick={() => handleCopy("bc1qr0xfzkelhz3xpf53h57ew5uks5hsqkjwwavuzx", "BTC")}
                  className="p-1 hover:bg-[#E8E0D8] rounded transition-all shrink-0 text-[#2D1B0E]"
                >
                  {copiedText === "BTC" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Coupon Redeemer */}
          <div className="bg-white border border-[#E8E0D8] p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-sm font-bold text-[#2D1B0E] border-b pb-2 flex items-center gap-1">
                <CreditCard className="w-4 h-4 text-[#D4A853]" /> 2. Enter Generated Code
              </h3>
              <p className="text-xs text-[#8A7A6A] leading-relaxed my-3 mb-4">
                After payload validation, our support will generate a unique key. Enter it below to unlock master exports forever.
              </p>

              {unlockedMsg && (
                <div className="p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-xs font-semibold rounded mb-3 flex items-center gap-1">
                  <Check className="w-4.5 h-4.5 text-green-600" /> {unlockedMsg}
                </div>
              )}
              {unlockError && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-semibold rounded mb-3">
                  {unlockError}
                </div>
              )}

              {user?.isUnlocked ? (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs leading-relaxed text-green-700 font-semibold mb-3">
                  Congratulations! All exports are fully active. Use the buttons above to download any manuscript directly to your device.
                </div>
              ) : (
                <form onSubmit={handleRedeem} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#2D1B0E] uppercase mb-1">Receipt License Key</label>
                    <input
                      type="text"
                      placeholder="e.g. RM-2026-F98D2"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 border rounded-lg text-sm font-mono focus:outline-none focus:border-[#D4A853]"
                      id="export-license-input"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#D4A853] hover:bg-[#C49A42] text-[#2D1B0E] font-bold text-xs rounded-lg transition-transform active:scale-95 cursor-pointer"
                    id="btn-redeem-license"
                  >
                    Redeem License Code
                  </button>
                </form>
              )}
            </div>

            {/* Trial Unlock Option for Quick testing / verification in preview */}
            {!user?.isUnlocked && onForceUnlockFree && (
              <div className="mt-4 pt-3 border-t border-[#E8E0D8] text-center">
                <p className="text-[10px] text-[#8C7A6D] mb-1 font-medium italic">Testing locally / AI Studio preview? Bypass key verify instantly:</p>
                <button
                  type="button"
                  onClick={onForceUnlockFree}
                  className="text-xs text-[#D4A853] font-bold hover:underline"
                  id="btn-force-unlock"
                >
                  ⚡ Toggle Lifetime Access Pass instantly (Free Tester Mode)
                </button>
              </div>
            )}

            <div className="border-t border-[#E8E0D8] pt-4 mt-6 flex items-center gap-1.5 text-xs text-[#8A7A6A]">
              <Shield className="w-4 h-4 text-green-500" />
              Verified secure processing via Binance, Solo node, and Ecobank systems.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
