/**
 * RitemastaPro - Static legal and about founder cards
 */
import { ShieldAlert, BookOpen, Scale } from "lucide-react";

interface StaticPagesProps {
  pageType: "about" | "privacy" | "terms";
}

export default function StaticPages({ pageType }: StaticPagesProps) {
  return (
    <div className="bg-[#FFFDFB] min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white border border-[#E8E0D8] p-6 sm:p-10 rounded-2xl shadow-sm">
        {/* VIEW 1: ABOUT FOUNDER AND ECOSYSTEM */}
        {pageType === "about" && (
          <article className="space-y-6">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D1B0E] border-b pb-3 flex items-center gap-1.5 leading-tight">
              About the Ritemasta Ecosystem
            </h1>
            <p className="text-[#D4A853] text-xs font-bold uppercase tracking-widest mt-1">
              Publishing • Education • Technology • Innovation
            </p>

            <p className="text-sm text-[#4A3728] leading-relaxed">
              Ritemasta is an advanced publishing, educational technology, creative brand media, and interactive innovation ecosystem founded and built by <strong>Robert Ashley Nikoi</strong>.
            </p>

            <p className="text-sm text-[#4A3728] leading-relaxed">
              Formulated over decades of practical industry experience in commercial printing, publications layout systems, and curriculum design, our initiative empowers authors, educators, students, and businesses to distribute worldclass digital books.
            </p>

            {/* Strategic Pillars Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="border border-[#E8E0D8] bg-[#FDF8F0] p-4 rounded-xl">
                <span className="font-serif text-[#D4A853] text-lg font-bold block mb-1">Ritemasta Publications</span>
                <p className="text-[11px] text-[#4A3728] leading-relaxed">
                  Our professional publishing print department responsible for textbook resources, inspirational journals, wellness protocol guides, and creative journals.
                </p>
              </div>
              <div className="border border-[#E8E0D8] bg-[#FDF8F0] p-4 rounded-xl">
                <span className="font-serif text-[#D4A853] text-lg font-bold block mb-1">RitemastaPro Suite</span>
                <p className="text-[11px] text-[#4A3728] leading-relaxed">
                  High-speed offline-first formatting application engineered to surpass Atticus, vellum, and Reedsy with customizable premium fonts and interactive automated TOC nodes.
                </p>
              </div>
              <div className="border border-[#E8E0D8] bg-[#FDF8F0] p-4 rounded-xl">
                <span className="font-serif text-[#D4A853] text-lg font-bold block mb-1">Teecha AI App</span>
                <p className="text-[11px] text-[#4A3728] leading-relaxed">
                  Underdeveloped intelligent study partner offering classroom resource guides, student examination preparation cards, and customized AI assistance.
                </p>
              </div>
              <div className="border border-[#E8E0D8] bg-[#FDF8F0] p-4 rounded-xl">
                <span className="font-serif text-[#D4A853] text-lg font-bold block mb-1">Ritemasta Studios Ltd</span>
                <p className="text-[11px] text-[#4A3728] leading-relaxed">
                  Our core creative team focused on commercial print layout production, brand identity, visual communication assets, and multimedia.
                </p>
              </div>
            </div>

            {/* Founder Profile Details */}
            <div className="border-t border-[#E8E0D8] pt-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-36 h-36 rounded-2xl overflow-hidden shadow border border-[#E8E0D8] shrink-0 bg-gray-50 mx-auto md:mx-0">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256" // Fallback premium portrait for Robert Ashley Nikoi
                  alt="Robert Ashley Nikoi founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#2D1B0E] leading-tight">
                  Robert Ashley Nikoi - Creator &amp; Directing Builder
                </h3>
                <p className="text-xs text-[#8A7A6A] leading-relaxed uppercase tracking-wider font-semibold">
                  Author • Publisher • Graphic Director • EdTech Innovator
                </p>
                <p className="text-xs text-[#4A3728] leading-relaxed">
                  Robert Ashley Nikoi is an accomplished editor, publication designer, and curriculum development expert whose strategic portfolio spans commercial textbook writing, health protocol manuals, wellness blogs, and digital product designs.
                </p>
                <p className="text-xs text-[#4A3728] leading-relaxed">
                  Unlike traditional software coders, Robert has extensive real-world experience organizing magazine layouts for <em>Ghana Business &amp; Finance Magazine</em> published under African Business Media, prepress commercial printing orchestration, and authorship of SHS Regional School Textbooks.
                </p>
              </div>
            </div>

            {/* Publications catalog list */}
            <div className="border-t border-[#E8E0D8] pt-6 space-y-3">
              <h4 className="font-serif text-base font-bold text-[#2D1B0E]">📚 Heritage Library Catalog</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[#4A3728] leading-relaxed">
                <li><strong>Human &amp; Regional Geography for SHS</strong> – Standard guidelines for Senior High scholars in geography models.</li>
                <li><strong>Practical Geography &amp; Atlas core</strong> – Applied testing guides and map-work manuals.</li>
                <li><strong>The Bitter Leaf &amp; Coconut Water Nature Protocol</strong> – A comprehensive wellness protocol guiding digestive reset, cleansing, and vitality.</li>
                <li><strong>CHESS OUT Extraordinary Edition</strong> – Clear inspirational guides call to intentional actions.</li>
                <li><strong>You Need Deliverance / Set Apart as a Prophet</strong> – Faith-equipped publications outlining spiritual principles.</li>
              </ul>
            </div>
          </article>
        )}

        {/* VIEW 2: PRIVACY POLICY */}
        {pageType === "privacy" && (
          <article className="space-y-6">
            <div className="flex items-center gap-2 border-b pb-3">
              <ShieldAlert className="w-8 h-8 text-[#D4A853]" />
              <h1 className="font-serif text-3xl font-bold text-[#2D1B0E] leading-tight">Privacy Policy</h1>
            </div>
            <p className="text-xs text-[#8A7A6A]">Last Updated: June 2026</p>

            <p className="text-sm text-[#4A3728] leading-relaxed">
              At Ritemasta, we respect your privacy and are committed to protecting any personal data entrusted to us. This policy details our collections standards across all web platforms, including RitemastaPro, Teecha AI, and Ritemasta Studios.
            </p>

            <h3 className="font-serif text-base font-bold text-[#2D1B0E] pt-2">1. Personal Information Collection</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#4A3728] leading-relaxed">
              <li>Profile data: full name, email, credentials, and optional avatar.</li>
              <li>Transaction data: crypto, MoMo transactions records, or coupon hashes.</li>
              <li>Manuscript metrics: Word, structure, layout files, or cover details stored locally.</li>
            </ul>

            <h3 className="font-serif text-base font-bold text-[#2D1B0E] pt-2">2. Author Content Ownership Rights</h3>
            <p className="text-sm text-[#4A3728] leading-relaxed">
              You retain 100% legal ownership of your original publications, manuscripts, and artwork. Ritemasta acts as your processing utility brand and does not copyright user content.
            </p>

            <h3 className="font-serif text-base font-bold text-[#2D1B0E] pt-2">3. Storage Safeguards</h3>
            <p className="text-sm text-[#4A3728] leading-relaxed">
              We implement professional technical safeguards to protect system endpoints. Database accounts, auto-saved chapters, and access codes save on sandboxed local servers safely under TLS data streams.
            </p>
          </article>
        )}

        {/* VIEW 3: TERMS OF SERVICE */}
        {pageType === "terms" && (
          <article className="space-y-6">
            <div className="flex items-center gap-2 border-b pb-3">
              <Scale className="w-8 h-8 text-[#D4A853]" />
              <h1 className="font-serif text-3xl font-bold text-[#2D1B0E] leading-tight">Terms of Service</h1>
            </div>
            <p className="text-xs text-[#8A7A6A]">Last Updated: June 2026</p>

            <p className="text-sm text-[#4A3728] leading-relaxed">
              These Terms of Service govern your use of the RitemastaPro book editor suite and curriculum assets. By configuring account details or launching new projects, you agree to these legal conditions under the laws of Ghana.
            </p>

            <h3 className="font-serif text-base font-bold text-[#2D1B0E] pt-2">1. Use license parameters</h3>
            <p className="text-sm text-[#4A3728] leading-relaxed">
              RitemastaPro provides an automated template layout utility. Paid users receive full continuous rights to compile, export, and publish files in standard external platforms like Amazon KDP with no subsequent licensing claims.
            </p>

            <h3 className="font-serif text-base font-bold text-[#2D1B0E] pt-2">2. Accuracy of AI Assisted Materials</h3>
            <p className="text-sm text-[#4A3728] leading-relaxed">
              AI presentation deck outlines and written synopsis synopsis assets are designed to support drafts preparation. Authors must verify critical references before issuing commercial publications.
            </p>

            <h3 className="font-serif text-base font-bold text-[#2D1B0E] pt-2">3. Service availability &amp; payments</h3>
            <p className="text-sm text-[#4A3728] leading-relaxed">
              Fees are a one-time Access Pass fee of $25 USD. No active subscription models apply. While we implement 99.9% uptime, we are not responsible for local computer hardware disconnects. Use 'Save' often for absolute JSON backups.
            </p>
          </article>
        )}
      </div>
    </div>
  );
}
