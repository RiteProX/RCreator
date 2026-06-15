/**
 * RitemastaPro - Footer component
 */

interface FooterProps {
  onChangeTab: (tab: string) => void;
}

export default function Footer({ onChangeTab }: FooterProps) {
  return (
    <footer className="bg-[#1A0F08] text-[#B8A89A] pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-[#2D4A5A]/20 pb-8">
          {/* Logo Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChangeTab("home")}>
              <div className="w-8 h-8 flex items-center justify-center bg-[#D4A853] rounded-full text-[#2D1B0E] font-bold text-sm font-serif">
                RM
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl font-bold">
                  <span className="animate-wavy-shine">Ritemasta</span><span className="text-[#D4A853]">Pro</span>
                </span>
                <span className="text-[#D4A853] text-[0.6rem] tracking-wider uppercase">PUBLISHING | TECHNOLOGY</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mt-1">
              The most affordable, feature-rich book publishing platform for independent authors, educators, coaches, and creators worldwide. No recurring subscription!
            </p>
            <div className="text-xs leading-relaxed mt-2 flex flex-col gap-1 text-[#FDF8F0]/80">
              <p><strong>📧 Email:</strong> ritemasta@gmail.com</p>
              <p><strong>📱 Phone (WhatsApp):</strong></p>
              <p>+233 500 119 195 (Telecel)</p>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#FDF8F0] mb-4 font-bold">Product</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <button onClick={() => onChangeTab("upload")} className="hover:text-[#D4A853] text-left transition-colors">
                  Upload & Auto-Format
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab("editor")} className="hover:text-[#D4A853] text-left transition-colors">
                  Two-Panel Book Editor
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab("layout")} className="hover:text-[#D4A853] text-left transition-colors">
                  Template Library (28)
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab("export")} className="hover:text-[#D4A853] text-left transition-colors">
                  EPUB, PDF & DOC Export
                </button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#FDF8F0] mb-4 font-bold">Support</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <button onClick={() => onChangeTab("contact")} className="hover:text-[#D4A853] text-left transition-colors">
                  Get Customer Support
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab("contact")} className="hover:text-[#D4A853] text-left transition-colors">
                  Frequently Asked Questions (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab("save")} className="hover:text-[#D4A853] text-left transition-colors">
                  Auto-Save & Project Backups
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab("admin")} className="hover:text-[#D4A853] text-left transition-colors">
                  🔑 Admin Console Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#FDF8F0] mb-4 font-bold">Company</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <button onClick={() => onChangeTab("about")} className="hover:text-[#D4A853] text-left transition-colors">
                  About Robert Ashley Nikoi (Founder)
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab("about")} className="hover:text-[#D4A853] text-left transition-colors">
                  About the Ritemasta Ecosystem
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab("privacy")} className="hover:text-[#D4A853] text-left transition-colors">
                  Privacy Policy File
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab("terms")} className="hover:text-[#D4A853] text-left transition-colors">
                  Terms of Service Agreement
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Grid matching the user's details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-6 mb-6 text-xs text-[#8A7A6A]">
          <div>
            <span className="text-[#FDF8F0] font-bold block mb-1">Business Registration No:</span>
            <span className="text-sm font-semibold text-[#B8A89A]">BN360822013</span>
            <span className="block mt-0.5 opacity-80">Registered under the Ghana Business Names Act 1962, No. 151</span>
          </div>
          <div>
            <span className="text-[#FDF8F0] font-bold block mb-1">Taxpayer Identification Number (TIN):</span>
            <span className="text-sm font-semibold text-[#B8A89A]">P0002032406</span>
          </div>
        </div>

        {/* Global Bottom Credits */}
        <div className="text-center text-xs mt-6 text-[#6A5A4A] border-t border-white/5 pt-4">
          <p>© 2026 RitemastaPro. All rights reserved.</p>
          <p className="mt-1">Made with ❤️ in Ghana for authors, wellness coaches, and creators worldwide</p>
        </div>
      </div>
    </footer>
  );
}
