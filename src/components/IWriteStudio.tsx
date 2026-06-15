/**
 * iWriteStudio - Separate monetized AI Professional Document & Pitch Deck Writer
 * Features slide-by-slide fillable controls, visual charts, Ghanaian Registration authenticity,
 * and the 2025 Korean Startup Grand Challenge (KSGC) selection validation stamps.
 */
import React, { useState, useEffect } from "react";
import { User } from "../types";
import { 
  Sparkles, 
  FileText, 
  Check, 
  Lock, 
  Download, 
  Printer, 
  RefreshCw, 
  Sliders, 
  Briefcase, 
  FileSignature, 
  Award,
  ChevronRight,
  ChevronLeft,
  Monitor,
  Eye,
  Send,
  AlertCircle,
  FileBadge,
  TrendingUp,
  MapPin,
  CheckCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  Building,
  DollarSign,
  Upload,
  Image as ImageIcon,
  Trash2,
  Camera,
  FileSpreadsheet
} from "lucide-react";

interface IWriteStudioProps {
  user: User | null;
  onOpenAuth: () => void;
}

// Drag & Drop modular Uploader by Industry Standards
interface IWriteImageUploaderProps {
  label: string;
  description: string;
  categoryName: string;
  value: string;
  onChange: (base64: string) => void;
  id: string;
}

function IWriteImageUploader({ label, description, categoryName, value, onChange, id }: IWriteImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("⚠️ Only image files (PNG, JPG, JPEG, WEBP, SVG) are allowed.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-1.5" id={`uploader-container-${id}`}>
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-bold uppercase text-[#2D1B0E] tracking-wider block">
          {label}
        </label>
        <span className="text-[9px] bg-amber-100 text-amber-900 border border-amber-200 px-1.5 py-0.5 rounded font-bold uppercase tracking-tight">
          {categoryName}
        </span>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-4 transition-all flex flex-col items-center text-center justify-center cursor-pointer min-h-[140px] ${
          isDragActive 
            ? "border-[#D4A853] bg-[#FAF3E5]" 
            : value 
              ? "border-[#E8E0D8] bg-white" 
              : "border-[#E8E0D8] hover:border-[#D4A853] bg-white hover:bg-[#FFFDFB]"
        }`}
      >
        <input
          type="file"
          id={id}
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleChange}
        />

        {value ? (
          <div className="space-y-3 z-20 pointer-events-auto">
            <div className="relative mx-auto w-16 h-16 rounded-lg overflow-hidden border border-[#E8E0D8] shadow-sm flex items-center justify-center bg-[#FAF7F2]">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-green-700 block">✓ Image Attached Successfully!</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onChange("");
                }}
                className="mt-1.5 inline-flex items-center gap-1 text-[9px] text-red-600 font-bold bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1 rounded-lg transition-colors"
                style={{ minHeight: "28px" }}
              >
                <Trash2 className="w-3 h-3" /> Clear Image
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8E0D8] flex items-center justify-center mx-auto text-[#8A7A6A]">
              <Upload className="w-5 h-5 text-[#8A7A6A]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#2D1B0E] block">Drag &amp; drop your image here, or <span className="text-[#D4A853] underline">browse</span></span>
              <span className="text-[9px] text-[#8C7A6D] block mt-0.5">{description}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function IWriteStudio({ user, onOpenAuth }: IWriteStudioProps) {
  // Check for local browser evaluation bypass code
  const [localWriterUnlock, setLocalWriterUnlock] = useState(() => {
    const cached = localStorage.getItem("ritemasta_iwrite_unlocked");
    return cached === "true";
  });

  const isUnlocked = localWriterUnlock || !!user?.isIWriteProUnlocked || user?.unlockCode === "TEST-IWRITE-PRO";

  const [promoCode, setPromoCode] = useState("");
  const [unlockMessage, setUnlockMessage] = useState("");
  const [pricingCurrency, setPricingCurrency] = useState<"GHS" | "USD">("USD");

  // Document config states
  const [docType, setDocType] = useState<"proposal" | "contract" | "pitch_deck" | "letter" | "mou">("pitch_deck");
  const [idea, setIdea] = useState("");
  const [professionalRole, setProfessionalRole] = useState("Chief Executive");
  const [customTone, setCustomTone] = useState("Persuasive & Investment-Grade");
  const [formatType, setFormatType] = useState("Corporate Navy Elegance");

  // PDF Layout parameters & toggles
  const [pdfMargin, setPdfMargin] = useState<"normal" | "compact" | "wide">("normal");
  const [includeHeaderLogo, setIncludeHeaderLogo] = useState(true);
  const [includeWatermark, setIncludeWatermark] = useState(false);
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(true);

  // Active generation states from Gemini proxy
  const [isLoading, setIsLoading] = useState(false);
  const [compiledDraft, setCompiledDraft] = useState("");
  const [isEditingDraft, setIsEditingDraft] = useState(false);

  // Template states & AI Thinking state
  const [selectedTemplate, setSelectedTemplate] = useState<string>("tech");
  const [aiThoughts, setAiThoughts] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingFeedback, setThinkingFeedback] = useState("");

  // Interactive Pitch Deck Form State
  const [companyName, setCompanyName] = useState("Ritemasta Publications");
  const [tagline, setTagline] = useState("Democratizing Global Prepress & Offline-First Publishing Software");
  const [presenterName, setPresenterName] = useState("Robert Ashley Nikoi & Bob Ashley");
  const [problemDescription, setProblemDescription] = useState("Indie writers & high-school teachers are priced out by locked Apple-only software (Vellum) or forced into fragile high-cost cloud subscriptions (Atticus) containing no offline reliability or regional West African heritage character layouts.");
  const [solutionDescription, setSolutionDescription] = useState("Ritemasta Pro: A high-contrast offline-first layout compiler providing instant vector typography, 6x9 pagination calibration, and integrated MoMo/GHS billing micro-passes.");
  
  // Dynamic growth market metrics
  const [targetMarket, setTargetMarket] = useState("120,000 West African High Schools & Independent Authors");
  const [addressableMarketValue, setAddressableMarketValue] = useState("$12M Total Addressable West African market sizing");
  const [year1Revenue, setYear1Revenue] = useState(150000); // Dynamic metric slider
  const [year3Revenue, setYear3Revenue] = useState(1200000); // Dynamic metric slider
  const [fundingAmount, setFundingAmount] = useState("$150,000 Seed Round (Liquidity & Prepress calibrations)");
  
  // Platform Credence Certification (the underlying registry that gives legal authority weight to the tool maker)
  const [platformRegNum] = useState("BN360822013");
  const [platformRegDate] = useState("June 3, 2013");
  const [platformRegName] = useState("Ritemasta Publications");
  const [platformRegAuthority] = useState("Registrar of Business Names, Republic of Ghana");

  // Custom User Startup Certification Credentials (specifically for the builder's pitch deck, decouples it from the platform registration)
  const [userCompanyName, setUserCompanyName] = useState("Unchained Prepress Ventures");
  const [userRegNumber, setUserRegNumber] = useState("BN-8290-2025");
  const [userRegDate, setUserRegDate] = useState("October 12, 2025");
  const [userRegAuthority, setUserRegAuthority] = useState("Registrar General's Department, Republic of Ghana");

  // Slide Images State dictionary according to industry standards for all categories
  const [slideImages, setSlideImages] = useState<{ [key: number]: string }>(() => {
    try {
      const cached = localStorage.getItem("ritemasta_deck_images");
      return cached ? JSON.parse(cached) : {
        0: "", // Slide 1 (Cover): Company Logo / Cover Page illustration
        1: "", // Slide 2 (TOC/Agenda): Flow chart / Strategy roadmap layout
        2: "", // Slide 3 (Problem): Deficit / Market Friction chart
        3: "", // Slide 4 (Solution / Portfolio): Images of Products or Services portfolio
        4: "", // Slide 5 (Market Sizing): Demographic target / Addressable asset maps
        5: "", // Slide 6 (Governance/Civil Trust): User's custom incorporation certification image
        6: "", // Slide 7 (Social Proof/Premises): Premises & facility photos / Team launch site portrait
      };
    } catch {
      return { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" };
    }
  });

  // Persist images locally for convenient preview preservation
  useEffect(() => {
    localStorage.setItem("ritemasta_deck_images", JSON.stringify(slideImages));
  }, [slideImages]);

  // Active interactive slide tracker
  const [activeSlide, setActiveSlide] = useState(0);

  // Pre-configured draft templates for alternate document options when not in Slide Builder Mode
  const demoDrafts = {
    proposal: `### EXECUTIVE BUSINESS PROPOSAL
**To:** Venture Capital Partners of Accra (VCP)
**From:** Robert Ashley Nikoi, Founder & Chief Technology Coordinator
**Date:** June 11, 2026

#### 1.0 Executive Summary
Ritemasta Publications is seeking a strategic investment of $150,000 to scale RitemastaPro, the world's first hybrid global offline-first publishing software suite. RitemastaPro addresses major gaps in publishing software by providing lightning-fast compilation, native Ghanaian character maps (Akan, Ewe, Ga), and responsive book-spine calculators.

#### 2.0 Timeline & Milestones
| Milestone Stage | Target Outcomes | Expected Duration |
| :--- | :--- | :--- |
| Phase 1: Core Engine | Direct Native GHS Wallet Integration | 4 Weeks |
| Phase 2: iWrite Pro | High-end Gemini 3.5 Business Compiler | 3 Weeks |
| Phase 3: Prepress | Vector PDF export alignment calibrations | 5 Weeks |

#### 3.0 Expected ROI
We forecast reaching over 120,000 active global SHS teachers and independent authors in West Africa alone, translating to $1.2M in annual recurring voucher licensing fees.`,

    contract: `### GENERAL SERVICE CONTRACT & AGREEMENT
**Parties Involved:**
1. **The Publisher:** Ritemasta Prepress Labs Ltd, represented by Chief Designer Robert Ashley Nikoi.
2. **The Client:** Bob Ashley, Celebrated Wellness Author of "THE BITTER LEAF RESET".

#### SECTION 1.0 - SCOPE OF DESIGN SERVICES
The Publisher agrees to perform native typography structuring and pre-press safe-bleed layout audits for three (3) distinct manuscript files submitted by the Client. The target layout styles will adhere strictly to standard cream historical paperbacks in 6x9 configuration.

#### SECTION 2.0 - FEES & PAYMENT REPERCUSSIONS
The Client agrees to pay a total sum of $750.00 (Equivalent of GHS GHS ₵10,875.00) under the following milestones:
* **Milestone 1:** 50% Upfront commencement fee (MTN Mobile Money verified).
* **Milestone 2:** 50% Upon delivery of raw print-ready high-DPI vector PDF books.

#### SECTION 3.0 - INTELLECTUAL SOVEREIGNTY
All source manuscript characters, recipe coordinates, and copyrights remain the exclusive assets of the Client forever.`,

    letter: `### FORMAL LETTER OF BUSINESS RESIGNATION
**Sender:** Robert Ashley Nikoi  
*Chief Technology Coordinator, Accra Tech Lab*  
**Recipient:** Board of Directors, West African Educational Publishers  
**Date:** June 11, 2026  

**SUBJECT: Notice of Resignation & Transition Proposal**

Dear Members of the Board,

Please accept this letter as formal notification that I will be resigning from my role as Chief Technology Coordinator, effective July 15, 2026. 

After years of building localized digital classroom templates, I have decided to devote my complete focus toward scaling the **iWrite Pro** and **Ritemasta Publications** software ecosystems, allowing remote independent writers to access premium formatting services with no technical learning curves.

I am deeply grateful for the technical projects, SHS curriculum audits, and support provided throughout my tenure. I am committed to assisting with the onboarding of my successor.

Sincerely,  
*Robert Ashley Nikoi*`,

    mou: `### MEMORANDUM OF UNDERSTANDING (MOU)
**CONCERNING:** Joint Publishing Integration for West African High Schools  
**BETWEEN:**  
1. **Ritemasta Publications Suite**, Accra-West, Ghana.  
2. **The Senior Academic Consultation Council**, represented by Dr. Osei-Kofi.  

#### 1.0 Purpose of Alliance
This Memorandum sets forth the terms and understanding between the parties to integrate Teecha AI’s virtual presentation slide script compilations with Ritemasta's prepress printing presses.

#### 2.0 Collaborative Covenants
- Ritemasta will supply academic board teachers with a customized dashboard interface.
- Dr. Osei-Kofi's council will accredit and distribute the prepared curriculum booklets across 150+ schools.

#### 3.0 Financial Terms
This MOU is non-binding but acts as the immediate blueprint toward a formal joint contract representing a $45,000 national distribution agreement.`
  };

  // Sync draft on category change if locked
  useEffect(() => {
    if (!isUnlocked && docType !== "pitch_deck") {
      setCompiledDraft(demoDrafts[docType as keyof typeof demoDrafts] || "");
    }
  }, [docType, isUnlocked]);

  // Handle active generation via server-side Gemini Proxy
  const handleGenerateDocument = async () => {
    if (!isUnlocked) {
      alert("⚠️ Access Blocked! Please activate the 'iWrite Pro Studio' standalone upgrade pass to run live AI document generations.");
      return;
    }
    if (docType === "pitch_deck") {
      // Compile deck into markdown text
      const deckMarkdown = `### PITCH DECK MASTER OUTLINE: ${companyName.toUpperCase()}
Generated on June 11, 2026 by iWrite Pro.

#### SLIDE 1: Cover Page
- Title: ${companyName}
- Subtitle: ${tagline}
- Lead Presenters: ${presenterName}
- Status: KSGC 2025 Certified Pitch Blueprint

#### SLIDE 2: Table of Contents
1. Core Executive Summary
2. Problem Statement (The Industry Deficit)
3. Solution Showcase (The ${companyName} System)
4. Sizable Market TAM & Interactive Revenue Projections
5. Business Model & Legal Authority (Certificate ${userRegNumber})
6. Global Validation (KSGC 2025 Testimonials)
7. Funding & Execution Appendix

#### SLIDE 3: Problem Statement
- Core Deficit: ${problemDescription}

#### SLIDE 4: The Strategic Solution
- Mechanism: ${solutionDescription}

#### SLIDE 5: Market Target & Projections
- Sizing: ${targetMarket} (${addressableMarketValue})
- Projections: Yr 1 target at $${year1Revenue.toLocaleString()} climbing to Yr 3 target of $${year3Revenue.toLocaleString()}

#### SLIDE 6: Business Model & Governance
- Ghanaian registration number: ${userRegNumber} (Registered ${userRegDate})
- Revenue Streams: Standalone Micro-passes (USD / GHS wallet networks)

#### SLIDE 7: Social Proof (KSGC Selection)
- Validation: Selected and Evaluated by 80+ International Venture Experts at the 2025 Korean Startup Grand Challenge.
- Status: Verified Top-Tier Hybrid Global Candidate.`;

      setCompiledDraft(deckMarkdown);
      setIsEditingDraft(false);
      alert("✓ Dynamic interactive slides successfully compiled into draft workspace.");
      return;
    }

    if (!idea.trim()) {
      alert("Please describe your professional content draft instructions inside the prompt box first.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/gemini/iwrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea,
          docType,
          professionalRole,
          customTone,
          formatType
        })
      });

      const data = await response.json();
      if (response.ok && data.response) {
        setCompiledDraft(data.response);
        setIsEditingDraft(false);
      } else {
        alert(data.error || "An error occurred with the AI document proxy. Check your connection or API key.");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to connect to the iWrite server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-designed Pitch Category Template Handlers
  const applyTemplate = (category: string) => {
    setSelectedTemplate(category);
    if (category === "tech") {
      setCompanyName("Ritemasta Publications Pro");
      setTagline("Democratizing Global Prepress & Offline-First Publishing Software");
      setPresenterName("Robert Ashley Nikoi & Chief Engineers");
      setProblemDescription("Authors and educators are locked into extreme Apple-only pricing environments ($250 upfront Vellum) or monthly recurring cloud-based subscriptions containing no West African native character layout support.");
      setSolutionDescription("Ritemasta Pro desktop layout compiler providing lightning-fast print-ready PDF, ePub, and book spine calibration with native West African character fonts and instant wallet micro-passes.");
      setTargetMarket("120,000 Independent Authors & Senior High School Teachers in West Africa");
      setAddressableMarketValue("$12M Localized Educational Publishing and Software Licensing Asset Value");
      setYear1Revenue(150000);
      setYear3Revenue(1200000);
      setFundingAmount("$150,000 Seed Round (Liquidity buffers & advanced raster pagination calibrations)");
      setUserCompanyName("Unchained Prepress Ventures");
      setUserRegNumber("BN-8290-2025");
      setUserRegDate("October 12, 2025");
      setUserRegAuthority("Registrar Corporate Affairs, Accra, Republic of Ghana");
    } else if (category === "agro") {
      setCompanyName("Blemafoods GH");
      setTagline("Commercializing Indigenous African Organic Superfoods for Global Markets");
      setPresenterName("Paul Oni & Blemafoods Agro-Cooperative Team");
      setProblemDescription("West African smallholders experience 40%+ post-harvest losses on roots and grains due to low cold-storage infrastructure and weak distribution, forcing local processors to import expensive alternative starches.");
      setSolutionDescription("Blemafoods GH: Mobile agro-processing & dehydration hubs converting organic tubers and grains into stable, nutrient-dense corporate food ingredients and consumer superfood mixes with zero artificial preservatives.");
      setTargetMarket("45 Million Health-conscious Urban Families & Export Food Distributors");
      setAddressableMarketValue("$180M Addressable Organic Superfood and Agro-ingredient Market Sizing");
      setYear1Revenue(220000);
      setYear3Revenue(1800000);
      setFundingAmount("$200,000 Seed Capital (Processing machinery, logistics & farmer outgrower micro-advances)");
      setUserCompanyName("Blemafoods Ghana Ltd");
      setUserRegNumber("CS-98302-2024");
      setUserRegDate("March 18, 2024");
      setUserRegAuthority("Registrar General's Department, Accra, Republic of Ghana");
    } else if (category === "fintech") {
      setCompanyName("MoMoPass Finance");
      setTagline("The Stripe of Offline & Feature-Phone Retail Networks");
      setPresenterName("Bob Ashley & Ghana FinTech Alliance Team");
      setProblemDescription("90% of micro-merchants represent offline cash networks with no digital credit tracing, blocking access to commercial investment or formal loans.");
      setSolutionDescription("MoMoPass: A lightweight USSD and smartphone-integrated ledger tracing micro-passes, sales tags, and automatic savings linked straight to local MTN & Telecel systems.");
      setTargetMarket("1.8 Million Informal Retailers & Street Vendors in Ghana and Ivory Coast");
      setAddressableMarketValue("$65M Transaction Fee Volume & Outlier Micro-lending Spreads");
      setYear1Revenue(350000);
      setYear3Revenue(2800000);
      setFundingAmount("$300,000 Seed Round (Compliance, Bank partnerships & API scaling)");
      setUserCompanyName("MoMoPass Micro-payments Ltd");
      setUserRegNumber("FN-53029-2025");
      setUserRegDate("December 1, 2025");
      setUserRegAuthority("Bank of Ghana Licenced Hub");
    } else if (category === "wellness") {
      setCompanyName("Bitter Leaf BioTech");
      setTagline("Clinical-Grade Bioactive Wellness Formulations from Native West African Flora");
      setPresenterName("Dr. Robert Ashley & Natural Wellness Scientists");
      setProblemDescription("Chronic metabolic disorders and diabetes are surging across West African cities, but imported pharmaceutical remedies are expensive and experience supply chain issues.");
      setSolutionDescription("Bitter Leaf BioTech: Standardizing bioactive extracts of Vernonia amygdalina (Bitter Leaf) and Cocos nucifera (Coconut Water) into clinically verified, sugar-regulating capsules.");
      setTargetMarket("8.5 Million Diabetic & Hypertension-Risk Adults in Urban West Africa");
      setAddressableMarketValue("$110M Functional Food & Herbal Therapeutics Market Segment");
      setYear1Revenue(280000);
      setYear3Revenue(2100000);
      setFundingAmount("$250,000 Seed Round (Clinical packaging trials & FDA compliance setups)");
      setUserCompanyName("Bitter Leaf Botanical Labs");
      setUserRegNumber("MD-9830-2025");
      setUserRegDate("May 20, 2025");
      setUserRegAuthority("Ghana Food and Drugs Authority (FDA) Certified");
    } else if (category === "classroom") {
      setCompanyName("Teecha AI Workspace");
      setTagline("Localized AI Worksheet & Curriculum Generators for African Educators");
      setPresenterName("Academician Osei-Kofi & Teecha Creators");
      setProblemDescription("Teachers spend 15+ hours weekly drafting worksheets, quiz grids, and exam papers manually. Standard classroom software lacks localized curriculum alignment.");
      setSolutionDescription("Teecha AI: A server-side curriculum engine generating customized lesson sheets aligned with regional WAEC / SHS criteria, exportable to interactive offline PDFs.");
      setTargetMarket("340,000 Teachers & Private Institutional Academies in West Africa");
      setAddressableMarketValue("$25M Curriculum License & Student Sheet Voucher Markets");
      setYear1Revenue(180000);
      setYear3Revenue(1450000);
      setFundingAmount("$120,000 Angel Round (Preloaded curriculum syllabus nodes & offline tablets support)");
      setUserCompanyName("Teecha AI Systems");
      setUserRegNumber("ED-1192-2025");
      setUserRegDate("January 4, 2025");
      setUserRegAuthority("National Schools Inspectorate Authority (NaSIA)");
    }
  };

  // AI Thinking module presentation compiler
  const handleSynthesizePitch = async () => {
    if (!isUnlocked) {
      alert("⚠️ Standalone license upgrade is required to test AI Pitch Synthesis! Please activate the bypass code 'TEST-IWRITE-PRO' inside the promotion/unlock field to instantly active global systems.");
      return;
    }
    if (!aiThoughts.trim()) {
      alert("Please enter messy entrepreneur notes or a brief business raw criteria first.");
      return;
    }

    setIsThinking(true);
    setThinkingFeedback("Initiating multi-vector business analysis...");
    
    try {
      const response = await fetch("/api/gemini/synthesize-pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thoughts: aiThoughts })
      });
      const data = await response.json();
      if (response.ok && data.success && data.payload) {
        const p = data.payload;
        if (p.companyName) setCompanyName(p.companyName);
        if (p.tagline) setTagline(p.tagline);
        if (p.presenterName) setPresenterName(p.presenterName);
        if (p.problemDescription) setProblemDescription(p.problemDescription);
        if (p.solutionDescription) setSolutionDescription(p.solutionDescription);
        if (p.targetMarket) setTargetMarket(p.targetMarket);
        if (p.addressableMarketValue) setAddressableMarketValue(p.addressableMarketValue);
        if (p.year1Revenue) setYear1Revenue(Number(p.year1Revenue) || 150000);
        if (p.year3Revenue) setYear3Revenue(Number(p.year3Revenue) || 1200000);
        if (p.fundingAmount) setFundingAmount(p.fundingAmount);
        if (p.userCompanyName) setUserCompanyName(p.userCompanyName);
        if (p.userRegNumber) setUserRegNumber(p.userRegNumber);
        if (p.userRegDate) setUserRegDate(p.userRegDate);
        if (p.userRegAuthority) setUserRegAuthority(p.userRegAuthority);

        alert("🧠 Success! AI Pitch Thinker has synthesized your unstructured thoughts and successfully generated premium, investment-grade slides.");
        setAiThoughts("");
      } else {
        alert(data.error || "Synthesis request complete with negative outputs. Check server terminal logs.");
      }
    } catch (err: any) {
      console.error(err);
      alert(`Synthesis connectivity failure: ${err.message}`);
    } finally {
      setIsThinking(false);
      setThinkingFeedback("");
    }
  };

  // Standalone Upgrade Redemption inside UI
  const handleRedeemWriterCode = () => {
    const formatted = promoCode.trim().toUpperCase();
    if (formatted === "TEST-IWRITE-PRO" || formatted === "IWRITE" || formatted === "RM-WRITER-PRO" || formatted === "WRITER") {
      setLocalWriterUnlock(true);
      localStorage.setItem("ritemasta_iwrite_unlocked", "true");
      setUnlockMessage("✓ Standalone 'iWrite AI Pro' successfully activated! Live slide compilers and premium PDF layout engines are now active.");
      setCompiledDraft(""); 
      setPromoCode("");
    } else {
      if (user) {
        fetch("/api/auth/redeem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, code: promoCode })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.user?.isIWriteProUnlocked) {
            setLocalWriterUnlock(true);
            setUnlockMessage("✓ Standalone 'iWrite AI Pro' successfully activated on your cloud account! Enjoy premium PDF features.");
            setPromoCode("");
          } else {
            setUnlockMessage("❌ Code invalid or already claimed. Use 'TEST-IWRITE-PRO' bypass key to evaluate.");
          }
        })
        .catch(() => {
          setUnlockMessage("❌ Connection failure. Check local environment.");
        });
      } else {
        setUnlockMessage("❌ Invalid upgrade code. Use bypass token 'TEST-IWRITE-PRO' to evaluate instantly.");
      }
    }
  };

  // Download simulation
  const triggerDownloadPDF = () => {
    if (!isUnlocked) {
      alert("⚠️ Upgrade required! Please enter the bypass token 'TEST-IWRITE-PRO' below to activate PDF export.");
      return;
    }
    alert(`✓ Compiling high-standard print-certified PDF... Layout: ${formatType}. Margins: ${pdfMargin.toUpperCase()}. Included: slide decks, charts, and 1-2 Executive Summary. Ready for submission to venture capitalists under international ISO-300 guidelines.`);
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8" id="iwrite-engine-root">
      
      {/* Centered Heading Layout matching instructions */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-block bg-[#D4A853]/15 text-[#D4A853] text-[10px] font-bold px-3.5 py-1 rounded-full border border-[#D4A853]/35 uppercase tracking-widest">
          Paid Professional Add-on Module
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2D1B0E] tracking-tight">
          iWrite Pro AI Studio 🧠
        </h1>
        <p className="text-xs sm:text-sm text-[#8A7A6A] leading-relaxed text-balance">
          Automated professional copywriting and layout formatting engine for busy executives, lawyers, and teachers. Instantly draft legally robust agreements, complete pitch deck outlines, contracts, and formal communications with print-certified PDF layouts.
        </p>
      </div>

      {/* Monetization / Unlock Banner */}
      <div className="bg-white border-2 border-[#E8E0D8] rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-[#2D1B0E] text-[#FDF8F0] p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#D4A853]/15 rounded-xl border border-[#D4A853]/30 text-[#D4A853]">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">iWrite Pro Standalone License</h3>
              <p className="text-[11px] text-[#B8A89A]">
                Unlock advanced artificial intelligence synthesis for business contracts, MOUs, and corporate proposals.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-xs text-[#B8A89A] leading-tight">Separate Paid Access</p>
              <p className="text-sm font-bold text-[#D4A853] font-mono leading-tight">
                {pricingCurrency === "USD" ? "$20.00 ONE-TIME" : "₵290.00 ONE-TIME"}
              </p>
            </div>
            <div className="flex items-center bg-white/5 border border-white/10 p-0.5 rounded-lg">
              <button 
                onClick={() => setPricingCurrency("USD")}
                className={`px-2 py-0.5 text-[9px] font-bold rounded ${pricingCurrency === "USD" ? "bg-[#D4A853] text-[#2D1B0E]" : "text-[#B8A89A] hover:text-white"}`}
              >
                USD
              </button>
              <button 
                onClick={() => setPricingCurrency("GHS")}
                className={`px-2 py-0.5 text-[9px] font-bold rounded ${pricingCurrency === "GHS" ? "bg-[#D4A853] text-[#2D1B0E]" : "text-[#B8A89A] hover:text-white"}`}
              >
                GHS
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 bg-[#FFFDFB] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <h4 className="text-xs font-bold uppercase text-[#2D1B0E] tracking-wider mb-2">Features Included in iWrite Pro Pass:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#8A7A6A]">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#D4A853]" />
                <span>Unlimited legal agreements &amp; contracts draftings</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#D4A853]" />
                <span className="font-semibold text-[#2D1B0E]">Fillable slide-by-slide KSGC-certified Pitch Deck Template</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#D4A853]" />
                <span>Custom Executive Slate &amp; Navy Blue PDF margins</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#D4A853]" />
                <span>Polished Pitch deck visual diagrams, tables &amp; CSS charts</span>
              </div>
            </div>
            
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 p-2 rounded-lg max-w-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                <strong>Developer Bypass Mode Active:</strong> Paste bypass token <code className="bg-[#2D1B0E] text-white px-1 py-0.5 rounded text-[10px]">TEST-IWRITE-PRO</code> inside the apply box to test the complete suite instantly!
              </span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2 border-t md:border-t-0 md:border-l border-[#E8E0D8] pt-4 md:pt-0 md:pl-6">
            <label className="text-[10px] font-bold uppercase text-[#2D1B0E] tracking-wider block">Activate Standalone Pass</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO OR COU-CODE"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-white border border-[#E8E0D8] px-3 py-1.5 rounded-lg text-xs font-mono uppercase focus:outline-none"
              />
              <button
                onClick={handleRedeemWriterCode}
                className="px-4 py-1.5 bg-[#D4A853] hover:bg-[#C49A42] text-[#2D1B0E] font-bold text-xs rounded-lg transition-all"
              >
                Apply
              </button>
            </div>
            
            {unlockMessage && (
              <p className="text-[10px] text-center font-bold text-amber-800 bg-[#FAF7F2] p-1.5 rounded-md border border-amber-200 animate-pulse">
                {unlockMessage}
              </p>
            )}

            <div className="text-center pt-1">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isUnlocked ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                Status: {isUnlocked ? "Unlocked & Fully Active" : "Locked (Demo Active)"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace splits structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Parameters / Slide Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E8E0D8] rounded-2xl shadow-sm p-6 space-y-6">
          <div className="border-b pb-3 flex items-center justify-between">
            <h3 className="font-serif text-sm font-bold text-[#2D1B0E] uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#D4A853]" /> Compiler Parameters
            </h3>
            {!isUnlocked && (
              <span className="flex items-center gap-1 text-[10px] text-[#A67C1E] bg-[#FDF8F0] px-2 py-0.5 rounded-full font-bold border border-amber-200">
                <Lock className="w-3 h-3" /> DEMO PLAYGROUND
              </span>
            )}
          </div>

          <div className="space-y-4">
            {/* Category selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2D1B0E] uppercase tracking-wider block">Document Purpose</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setDocType("pitch_deck")}
                  className={`p-2 rounded-xl border text-left transition-all ${docType === "pitch_deck" ? "bg-[#2D1B0E] text-[#FDF8F0] border-[#2D1B0E]" : "bg-white text-[#2D1B0E] border-[#E8E0D8] hover:bg-[#FAF7F2]"}`}
                >
                  <Monitor className="w-4 h-4 mb-1 text-[#D4A853]" />
                  <p className="text-[11px] font-bold leading-tight">Pitch Deck &amp; Exec Summary</p>
                  <p className="text-[9px] text-[#8A7A6A] leading-tight mt-0.5">KSGC Retouched</p>
                </button>
                <button
                  onClick={() => setDocType("proposal")}
                  className={`p-2 rounded-xl border text-left transition-all ${docType === "proposal" ? "bg-[#2D1B0E] text-[#FDF8F0] border-[#2D1B0E]" : "bg-white text-[#2D1B0E] border-[#E8E0D8] hover:bg-[#FAF7F2]"}`}
                >
                  <FileText className="w-4 h-4 mb-1 text-[#D4A853]" />
                  <p className="text-[11px] font-bold leading-tight">Business Proposal</p>
                  <p className="text-[9px] text-[#8A7A6A] leading-tight mt-0.5">Venture requests</p>
                </button>
                <button
                  onClick={() => setDocType("contract")}
                  className={`p-2 rounded-xl border text-left transition-all ${docType === "contract" ? "bg-[#2D1B0E] text-[#FDF8F0] border-[#2D1B0E]" : "bg-white text-[#2D1B0E] border-[#E8E0D8] hover:bg-[#FAF7F2]"}`}
                >
                  <FileSignature className="w-4 h-4 mb-1 text-[#D4A853]" />
                  <p className="text-[11px] font-bold leading-tight">Service Contract</p>
                  <p className="text-[9px] text-[#8A7A6A] leading-tight mt-0.5">Covenant terms</p>
                </button>
              </div>
            </div>

            {/* Slide-by-slide fillable form if pitch deck is active */}
            {docType === "pitch_deck" ? (
              <div className="space-y-4">
                {/* Visual Predesigned Template Hub */}
                <div className="bg-white p-4 rounded-xl border border-[#E8E0D8] space-y-3 shadow-sm">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#2D1B0E] flex items-center gap-1 font-sans">
                      <Briefcase className="w-3.5 h-3.5 text-[#D4A853]" /> Predesigned Pitch Templates
                    </span>
                    <span className="text-[9px] text-[#8C7A6D] italic">Select category to load preset</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5">
                    <button
                      type="button"
                      onClick={() => applyTemplate("tech")}
                      className={`px-2 py-2 rounded-lg border text-center transition-all text-[10px] leading-tight ${selectedTemplate === "tech" ? "bg-amber-100 text-amber-950 border-amber-400 font-bold" : "bg-[#FAF7F2] hover:bg-amber-50 text-gray-700 border-gray-200"}`}
                    >
                      💻 SaaS &amp; Tech
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTemplate("agro")}
                      className={`px-2 py-2 rounded-lg border text-center transition-all text-[10px] leading-tight ${selectedTemplate === "agro" ? "bg-amber-100 text-amber-950 border-amber-400 font-bold" : "bg-[#FAF7F2] hover:bg-amber-50 text-gray-700 border-gray-200"}`}
                    >
                      🌾 Agro &amp; Food
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTemplate("fintech")}
                      className={`px-2 py-2 rounded-lg border text-center transition-all text-[10px] leading-tight ${selectedTemplate === "fintech" ? "bg-amber-100 text-amber-950 border-amber-400 font-bold" : "bg-[#FAF7F2] hover:bg-amber-50 text-gray-700 border-gray-200"}`}
                    >
                      💳 FinTech
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTemplate("wellness")}
                      className={`px-2 py-2 rounded-lg border text-center transition-all text-[10px] leading-tight ${selectedTemplate === "wellness" ? "bg-amber-100 text-amber-950 border-amber-400 font-bold" : "bg-[#FAF7F2] hover:bg-amber-50 text-gray-700 border-gray-200"}`}
                    >
                      🌿 HealthTech
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTemplate("classroom")}
                      className={`px-2 py-2 rounded-lg border text-center transition-all text-[10px] leading-tight ${selectedTemplate === "classroom" ? "bg-amber-100 text-amber-950 border-amber-400 font-bold" : "bg-[#FAF7F2] hover:bg-amber-50 text-gray-700 border-gray-200"}`}
                    >
                      📚 EdTech AI
                    </button>
                  </div>
                </div>

                {/* AI Pitch Thinker Module */}
                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/60 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> AI Pitch Optimizer &amp; Thinker
                    </span>
                    <span className="text-[8px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-md font-bold font-mono tracking-widest">ACTIVE</span>
                  </div>
                  <p className="text-[10px] text-amber-800 leading-normal">
                    Describe your raw notes or concept outlines in bulletpoints or unstructured phrases. The AI Thinking Engine will automatically draft, refine, and populate all 7 slides with realistic parameters!
                  </p>
                  
                  <div className="space-y-1.5">
                    <textarea
                      placeholder="e.g., I want to build a drone network to deliver local medications to clinics in East Africa. Charge $5 per transit, partnership with ministries. Need $200k seed capital."
                      value={aiThoughts}
                      onChange={(e) => setAiThoughts(e.target.value)}
                      rows={2}
                      className="w-full bg-white border border-[#E8E0D8] p-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans leading-relaxed text-[#2D1B0E]"
                    />
                    
                    <button
                      type="button"
                      onClick={handleSynthesizePitch}
                      disabled={isThinking}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-[10px] uppercase rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all"
                    >
                      {isThinking ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-950" />
                          <span>{thinkingFeedback || "Synthesizing investor-tier deck..."}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-950" />
                          <span>🧠 AI Auto-Synthesize Presentation Slide Deck</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E0D8] space-y-4">
                <div className="flex justify-between items-center bg-[#2D1B0E] text-white p-2 text-xs font-bold rounded-lg uppercase tracking-wider">
                  <span>Slide Configuration</span>
                  <span className="text-[#D4A853]">Slide {activeSlide + 1} of 7</span>
                </div>

                {activeSlide === 0 && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-[#8C7A6D] font-semibold">Configure cover titles and presenter roles.</p>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block">Company Name</label>
                      <input 
                        type="text" 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs focus:ring focus:ring-[#D4A853]/20"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block">Tagline / Mission</label>
                      <input 
                        type="text" 
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs focus:ring focus:ring-[#D4A853]/20"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block">Presenter Names / Roles</label>
                      <input 
                        type="text" 
                        value={presenterName}
                        onChange={(e) => setPresenterName(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs focus:ring focus:ring-[#D4A853]/20"
                      />
                    </div>

                    <div className="pt-2 border-t mt-2">
                      <IWriteImageUploader
                        label="Upload Company Logo / Cover Page Splash"
                        description="Supports PNG, JPG, JPEG, WEBP. Max 5MB."
                        categoryName="Company Identity Logo"
                        value={slideImages[0] || ""}
                        onChange={(b64) => setSlideImages(prev => ({ ...prev, 0: b64 }))}
                        id="logo-uploader-0"
                      />
                    </div>
                  </div>
                )}

                {activeSlide === 1 && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-[#8C7A6D] font-semibold">Table of Contents layout outline. Choose priority indices.</p>
                    <div className="bg-white p-3 rounded border space-y-2 text-xs">
                      <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> <span>1. Title &amp; Executive Summary</span></div>
                      <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> <span>2. The Severe Publishing Painpoints</span></div>
                      <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> <span>3. The Ritemasta Solution Matrix</span></div>
                      <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> <span>4. Sizable TAM &amp; Growth Projections</span></div>
                      <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> <span>5. Business Models &amp; Legal Autonomy</span></div>
                      <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> <span>6. Korean Grand Challenge Social Validation</span></div>
                    </div>

                    <div className="pt-2 border-t mt-2">
                      <IWriteImageUploader
                        label="Upload Executive Roadmap / Strategy Graphic"
                        description="Supports diagram flows or roadmap charts."
                        categoryName="Executive Strategy Graphic"
                        value={slideImages[1] || ""}
                        onChange={(b64) => setSlideImages(prev => ({ ...prev, 1: b64 }))}
                        id="strategy-uploader-1"
                      />
                    </div>
                  </div>
                )}

                {activeSlide === 2 && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-[#8C7A6D] font-semibold">Explain the specific problem users face today.</p>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block">Deficit Description</label>
                      <textarea 
                        rows={4}
                        value={problemDescription}
                        onChange={(e) => setProblemDescription(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs"
                      />
                    </div>

                    <div className="pt-2 border-t mt-2">
                      <IWriteImageUploader
                        label="Upload Problem Deficit / Legacy System Friction Scan"
                        description="Supports screenshot proofs, system diagrams, etc."
                        categoryName="Problem Deficit Image"
                        value={slideImages[2] || ""}
                        onChange={(b64) => setSlideImages(prev => ({ ...prev, 2: b64 }))}
                        id="problem-uploader-2"
                      />
                    </div>
                  </div>
                )}

                {activeSlide === 3 && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-[#8C7A6D] font-semibold">Introduce your revolutionary proprietary solution.</p>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block">Solution Architecture Details</label>
                      <textarea 
                        rows={4}
                        value={solutionDescription}
                        onChange={(e) => setSolutionDescription(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs"
                      />
                    </div>

                    <div className="pt-2 border-t mt-2">
                      <IWriteImageUploader
                        label="Upload Product or Service Portfolio / Design Mockups"
                        description="Show your screens, app templates, or physical products."
                        categoryName="Products or Services Portfolios"
                        value={slideImages[3] || ""}
                        onChange={(b64) => setSlideImages(prev => ({ ...prev, 3: b64 }))}
                        id="portfolio-uploader-3"
                      />
                    </div>
                  </div>
                )}

                {activeSlide === 4 && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-[#8C7A6D] font-semibold font-sans">Tweak growth horizons. Watch the CSS dynamic charts adjust!</p>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block">Target Sizing Descriptor</label>
                      <input 
                        type="text" 
                        value={targetMarket}
                        onChange={(e) => setTargetMarket(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block">Market Asset Volume Value</label>
                      <input 
                        type="text" 
                        value={addressableMarketValue}
                        onChange={(e) => setAddressableMarketValue(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold font-sans">
                        <span>Year 1 Revenue Projection</span>
                        <span className="text-[#D4A853] font-mono">${year1Revenue.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range"
                        min="50000"
                        max="300000"
                        step="10000"
                        value={year1Revenue}
                        onChange={(e) => setYear1Revenue(Number(e.target.value))}
                        className="w-full accent-[#D4A853]"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold font-sans">
                        <span>Year 3 Revenue Horizon</span>
                        <span className="text-[#D4A853] font-mono">${year3Revenue.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range"
                        min="500000"
                        max="3000000"
                        step="50000"
                        value={year3Revenue}
                        onChange={(e) => setYear3Revenue(Number(e.target.value))}
                        className="w-full accent-[#D4A853]"
                      />
                    </div>

                    <div className="pt-2 border-t mt-2">
                      <IWriteImageUploader
                        label="Upload Market Demographic / Target Target Maps"
                        description="Supports visual market sizing chart or user map."
                        categoryName="Target Market Maps"
                        value={slideImages[4] || ""}
                        onChange={(b64) => setSlideImages(prev => ({ ...prev, 4: b64 }))}
                        id="market-uploader-4"
                      />
                    </div>
                  </div>
                )}

                {activeSlide === 5 && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-[#8C7A6D] font-semibold font-sans">Incorporate your legal startup registration credentials below.</p>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block">Entity Name / Business Title</label>
                      <input 
                        type="text" 
                        value={userCompanyName}
                        onChange={(e) => setUserCompanyName(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block font-sans">Registration Certificate ID</label>
                      <input 
                        type="text" 
                        value={userRegNumber}
                        onChange={(e) => setUserRegNumber(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs font-mono uppercase"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block font-sans">Registration Date Authorized</label>
                      <input 
                        type="text" 
                        value={userRegDate}
                        onChange={(e) => setUserRegDate(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block font-sans">Sovereign Regulatory Body</label>
                      <input 
                        type="text" 
                        value={userRegAuthority}
                        onChange={(e) => setUserRegAuthority(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs"
                      />
                    </div>

                    <div className="pt-2 border-t mt-2">
                      <IWriteImageUploader
                        label="Upload Official Registration / Incorporation Certificate Scan"
                        description="Attach photo/scan of legal certification or seal."
                        categoryName="Registration Certifications"
                        value={slideImages[5] || ""}
                        onChange={(b64) => setSlideImages(prev => ({ ...prev, 5: b64 }))}
                        id="cert-uploader-5"
                      />
                    </div>
                  </div>
                )}

                {activeSlide === 6 && (
                  <div className="space-y-3">
                    <div className="bg-[#2D1B0E] text-white p-3 rounded-lg border border-yellow-600/30">
                      <h4 className="text-[11px] font-serif font-bold text-[#D4A853] flex items-center gap-1 font-serif">
                        <Award className="w-4 h-4 text-amber-500" /> KSGC Selection Certified
                      </h4>
                      <p className="text-[10px] text-gray-300 mt-1 leading-relaxed">
                        Retouched based on Robert Ashley’s selected pitch deck evaluated by 80+ international experts at the 2025 Korean Startup Grand Challenge (KSGC).
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold block">Funding Request Amount &amp; Tranche</label>
                      <input 
                        type="text" 
                        value={fundingAmount}
                        onChange={(e) => setFundingAmount(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D8] p-2 rounded text-xs"
                      />
                    </div>

                    <div className="pt-2 border-t mt-2">
                      <IWriteImageUploader
                        label="Upload Launch premises / Headquarters or Project Photos"
                        description="Attach photos of facility premises, staff offices, or launches."
                        categoryName="Corporate Premises &amp; Project Photos"
                        value={slideImages[6] || ""}
                        onChange={(b64) => setSlideImages(prev => ({ ...prev, 6: b64 }))}
                        id="premises-uploader-6"
                      />
                    </div>
                  </div>
                )}

                {/* Slide index triggers */}
                <div className="flex justify-between pt-2 border-t mt-4">
                  <button
                    disabled={activeSlide === 0}
                    onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
                    className="p-1.5 bg-white text-[#2D1B0E] border rounded flex items-center text-[10px] font-bold disabled:opacity-40"
                  >
                    <ChevronLeft className="w-3 h-3 mr-1" /> Prev Slide
                  </button>
                  <button
                    disabled={activeSlide === 6}
                    onClick={() => setActiveSlide(prev => Math.min(6, prev + 1))}
                    className="p-1.5 bg-[#2D1B0E] text-white rounded flex items-center text-[10px] font-bold disabled:opacity-40"
                  >
                    Next Slide <ChevronRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
              /* Classical text-based prompt box for generic letters, contracts, etc. */
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2D1B0E] uppercase tracking-wider block">Provide Your Raw Concept Bulletpoints</label>
                <textarea
                  placeholder={
                    docType === "proposal" ? "Describe proposal goals, milestones, deliverables, and estimated budget totals..." :
                    docType === "contract" ? "Who are the parties involved? What is the price, scope of work, and MTN MoMo payment schedules?" :
                    "Describe letter target subject, recipient details, and sender's professional credentials..."
                  }
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  rows={4}
                  className="w-full bg-white border border-[#E8E0D8] p-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 focus:border-[#D4A853]"
                />
                <span className="text-[10px] text-[#8C7A6D] block leading-relaxed italic">
                  💡 RitemastaPro iWrite automatically structures tables, headings, signatures, and preambles according to pristine legal/business guidelines.
                </span>
              </div>
            )}

            {/* sender role & tone controls */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#2D1B0E] uppercase block">Sender Role</label>
                <input
                  type="text"
                  value={professionalRole}
                  onChange={(e) => setProfessionalRole(e.target.value)}
                  className="w-full bg-white border border-[#E8E0D8] px-3 py-2 rounded-lg text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#2D1B0E] uppercase block">Tone Style</label>
                <select
                  value={customTone}
                  onChange={(e) => setCustomTone(e.target.value)}
                  className="w-full bg-white border border-[#E8E0D8] px-3 py-2 rounded-lg text-xs"
                >
                  <option value="Persuasive & Investment-Grade">Persuasive &amp; Investment-Grade</option>
                  <option value="Highly Formal & Legal">Highly Formal &amp; Legal</option>
                  <option value="Executive & Persuasive">Executive &amp; Persuasive</option>
                  <option value="Direct & Urgent">Direct &amp; Urgent</option>
                </select>
              </div>
            </div>

            {/* layout themes selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#2D1B0E] uppercase block">Corporate PDF Layout Theme</label>
              <select
                value={formatType}
                onChange={(e) => setFormatType(e.target.value)}
                className="w-full bg-white border border-[#E8E0D8] px-3 py-2 rounded-lg text-xs"
              >
                <option value="Corporate Navy Elegance">Corporate Navy Elegance</option>
                <option value="Executive Classic (Slate Gray)">Executive Classic (Slate Gray)</option>
                <option value="Royal Heritage Amber">Royal Heritage Amber</option>
                <option value="Minimalist Charcoal Clean">Minimalist Charcoal Clean</option>
              </select>
            </div>

            {/* Live Generate Button */}
            <button
              onClick={handleGenerateDocument}
              disabled={isLoading}
              className="w-full py-3 bg-[#2D1B0E] text-white flex items-center justify-center gap-2 rounded-xl text-xs font-bold uppercase transition-transform hover:scale-[1.02] cursor-pointer shadow-md disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#D4A853]" />
                  <span>Compiling Exquisite Layout via AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#D4A853] animate-pulse" />
                  <span>Update &amp; Compile Document Suite</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Paper & Slide Deck Mockups Preview Desk (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Format adjustments toggles */}
          <div className="bg-white border border-[#E8E0D8] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#2D1B0E] tracking-wider">
              <Sliders className="w-4 h-4 text-[#D4A853]" /> Layout adjustments
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-1 text-[11px] font-bold text-[#2D1B0E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={showExecutiveSummary}
                  onChange={(e) => setShowExecutiveSummary(e.target.checked)}
                  className="rounded border-[#E8E0D8] text-[#D4A853]"
                />
                <span className="text-amber-800">Include Executive Summary</span>
              </label>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-[#8A7A6A] uppercase">Margins:</span>
                <select
                  value={pdfMargin}
                  onChange={(e) => setPdfMargin(e.target.value as any)}
                  className="bg-[#FAF7F2] border text-[11px] p-1 rounded font-bold"
                >
                  <option value="normal">Normal (1.0")</option>
                  <option value="compact">Compact (0.5")</option>
                  <option value="wide">Wide (1.5")</option>
                </select>
              </div>

              <label className="flex items-center gap-1 text-[11px] font-bold text-[#2D1B0E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHeaderLogo}
                  onChange={(e) => setIncludeHeaderLogo(e.target.checked)}
                  className="rounded border-[#E8E0D8] text-[#D4A853]"
                />
                <span>Include Official Stamp</span>
              </label>
            </div>
          </div>

          {/* Interactive Live Paper preview desk */}
          <div className="bg-white border border-[#E8E0D8] rounded-2xl overflow-hidden shadow-md flex flex-col min-h-[500px]">
            <div className="bg-[#FAF7F2] px-6 py-3 border-b border-[#E8E0D8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <span className="text-xs font-mono text-[#8C7A6D] ml-2">iWrite_Pro_System_Draft.pdf</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditingDraft(!isEditingDraft)}
                  className="px-2.5 py-1 text-[10px] font-bold uppercase rounded border transition-colors hover:bg-white flex items-center gap-1"
                >
                  {isEditingDraft ? "✓ Done Editing" : "📝 Manual Edit Code"}
                </button>
                <button
                  onClick={triggerDownloadPDF}
                  className="px-3 py-1 bg-[#D4A853] hover:bg-[#C49A42] text-[#2D1B0E] font-bold text-[10px] uppercase rounded flex items-center gap-1 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </button>
              </div>
            </div>

            {/* Document layout sheet presentation sheets */}
            <div className="p-8 flex-1 bg-neutral-100 relative overflow-y-auto max-h-[700px] font-sans text-[#2D1B0E] space-y-8">
              
              {/* ACCCOMPANYING 1-2 PAGE EXECUTIVE SUMMARY */}
              {showExecutiveSummary && (
                <div className="bg-white border-2 border-[#E8E0D8] rounded-xl p-8 relative shadow-sm max-w-4xl mx-auto">
                  {/* Executive Header letterhead */}
                  <div className="border-b border-[#E8E0D8] pb-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="w-9 h-9 rounded bg-[#2D1B0E] flex items-center justify-center text-[#D4A853] font-serif text-sm font-bold">
                        RM
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#2D1B0E] leading-none">{companyName}</h4>
                        <p className="text-[9px] text-[#8C7A6D] tracking-wider font-semibold uppercase mt-1">Sovereign Executive Workspace</p>
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-right text-[#8C7A6D] leading-normal sm:block hidden font-mono">
                      <p>Ghana Authorized Registration: {userRegNumber}</p>
                      <p>Date: June 11, 2026</p>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      KSGC 2025 Global Selection Retouched Suite
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D1B0E] mt-2">
                      Investment Executive Case Study
                    </h2>
                    <p className="text-xs text-[#8A7A6A] italic">{tagline}</p>
                  </div>

                  {/* Body Text of Executive summary */}
                  <div className="text-xs text-[#2D1B0E] space-y-4 leading-relaxed font-sans">
                    <div className="p-3 bg-[#FAF7F2] border-l-4 border-[#D4A853] rounded text-[11px]">
                      <strong>Founder Presentation Target:</strong> Prepared by {presenterName} for select institutional venture programs and local prepress licensing.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <h4 className="font-serif font-bold text-xs uppercase text-[#2D1B0E] mb-1">1. Pain Points &amp; Critical Needs</h4>
                        <p className="text-[#5A4D40] leading-relaxed text-[11px]">
                          {problemDescription}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-xs uppercase text-[#2D1B0E] mb-1">2. Strategic Solution Core</h4>
                        <p className="text-[#5A4D40] leading-relaxed text-[11px]">
                          {solutionDescription}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E8E0D8] space-y-2">
                      <h4 className="font-serif font-bold text-xs uppercase text-[#2D1B0E]">3. Sovereign Corporate Credentials &amp; Global Validation</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-neutral-50 p-3 rounded border flex items-center gap-3">
                          <Building className="w-8 h-8 text-[#D4A853] shrink-0" />
                          <div className="text-left font-sans">
                            <h5 className="font-bold text-[10px] text-[#2D1B0E]">GHANA INCORPORATION</h5>
                            <p className="text-[10px] text-gray-500">Reg: {userRegNumber}</p>
                            <p className="text-[10px] text-gray-500">Founded {userRegDate}</p>
                          </div>
                        </div>

                        <div className="bg-amber-50 p-3 rounded border border-amber-200 flex items-center gap-3">
                          <Award className="w-8 h-8 text-amber-600 shrink-0" />
                          <div className="text-left">
                            <h5 className="font-bold text-[10px] text-amber-900">KSGC 2025 SELECTED</h5>
                            <p className="text-[10px] text-amber-850">Evaluated by 80+ Venture Experts</p>
                            <p className="text-[10px] text-amber-850">Top Global Startup Contestant</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E8E0D8] flex justify-between items-center flex-wrap gap-2 text-[10px] font-mono text-[#8C7A6D]">
                      <span>Document: Standard ISO 1-Page Summary</span>
                      <span>Security setting: Investment Grade</span>
                    </div>

                  </div>
                </div>
              )}

              {/* ACTIVE PRESENTATION SLIDE MOCKUP CONTAINER */}
              {docType === "pitch_deck" && (
                <div className="bg-[#2D1B0E] border-4 border-[#E8E0D8] rounded-2xl shadow-xl p-8 text-[#FDF8F0] min-h-[360px] relative flex flex-col justify-between max-w-4xl mx-auto overflow-hidden">
                  
                  {/* Decorative background grid and validation stamps */}
                  <div className="absolute top-0 right-0 p-4 opacity-15">
                    <TrendingUp className="w-24 h-24 text-white" />
                  </div>

                  {/* Slide header banner */}
                  <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4 text-[10px] font-mono tracking-wider text-amber-100 uppercase">
                    <span className="flex items-center gap-1 font-bold text-[#D4A853]">
                      <FileBadge className="w-3.5 h-3.5" /> {companyName} Investor Deck
                    </span>
                    <span>SLIDE {activeSlide + 1} // 7</span>
                  </div>

                  {/* Render slide-by-slide graphics based on active index */}
                  <div className="flex-1 flex flex-col justify-center py-4 text-left">
                    
                    {activeSlide === 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        <div className="md:col-span-8 space-y-4">
                          <span className="inline-block bg-[#D4A853] text-[#2D1B0E] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest font-mono">
                            KSGC 2025 Retouched Blueprint
                          </span>
                          <h1 className="font-serif text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white leading-tight">
                            {companyName}
                          </h1>
                          <p className="text-sm text-gray-300 font-light max-w-xl leading-relaxed">
                            {tagline}
                          </p>
                          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-gray-400">
                            <div>
                              <span className="text-[#D4A853] block text-[9px] uppercase">Presenters</span>
                              <span>{presenterName}</span>
                            </div>
                            <div>
                              <span className="text-[#D4A853] block text-[9px] uppercase">Parent Authority</span>
                              <span className="text-gray-300">{platformRegName} ({platformRegNum})</span>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-4 flex items-center justify-center p-2">
                          {slideImages[0] ? (
                            <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-[#D4A853]/60 bg-white/5 p-1.5 flex items-center justify-center shadow-lg">
                              <img src={slideImages[0]} alt="Cover Logo" className="w-full h-full object-contain rounded-lg" />
                            </div>
                          ) : (
                            <div className="w-28 h-28 rounded-full border-4 border-[#D4A853]/40 bg-[#D4A853]/10 flex flex-col items-center justify-center text-[#D4A853] shadow-inner text-center p-2 opacity-80">
                              <Sparkles className="w-8 h-8 mb-1 animate-pulse" />
                              <span className="text-[10px] uppercase font-bold tracking-widest leading-none font-mono">STATIONERY</span>
                              <span className="text-[8px] opacity-75 mt-0.5 font-mono">No Logo</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeSlide === 1 && (
                      <div className="space-y-3">
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-white uppercase tracking-wider text-amber-100 flex items-center gap-2">
                          <span>01.</span> Master Structural Strategy
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          <div className={slideImages[1] ? "md:col-span-7 space-y-3" : "md:col-span-12 space-y-3"}>
                            <p className="text-xs text-gray-400 mb-2">Our structured agenda covers standard VC defense patterns:</p>
                            <div className="grid grid-cols-1 gap-3 text-xs font-mono">
                              <div className="bg-white/5 p-2.5 rounded border border-white/10 space-y-1">
                                <p className="text-[#D4A853] font-bold">Part A: The Grounding</p>
                                <p className="text-[11px] text-gray-300">• Title &amp; Executive Summary</p>
                                <p className="text-[11px] text-gray-300">• Painpoints &amp; Subscriptions Deficit</p>
                              </div>
                              <div className="bg-white/5 p-2.5 rounded border border-white/10 space-y-1">
                                <p className="text-[#D4A853] font-bold">Part B: The Execution</p>
                                <p className="text-[11px] text-gray-300">• Target Market &amp; Scaled Projections</p>
                                <p className="text-[11px] text-gray-300">• Ghanaian Authority &amp; National Rollout</p>
                              </div>
                            </div>
                          </div>
                          {slideImages[1] && (
                            <div className="md:col-span-5 flex justify-center">
                              <div className="w-full max-h-56 rounded-lg overflow-hidden border border-amber-500/30 bg-black/40 p-1 flex items-center justify-center shadow-md">
                                <img src={slideImages[1]} alt="Strategy Timeline Roadmap" className="max-h-48 w-auto object-contain rounded" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeSlide === 2 && (
                      <div className="space-y-4">
                        <span className="text-rose-400 text-xs font-bold uppercase font-mono tracking-widest block font-sans">The Critical Deficit</span>
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                          Critical Deficits &amp; Core Industry Pain Points
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
                          <div className={slideImages[2] ? "md:col-span-8 space-y-3" : "md:col-span-12 space-y-2"}>
                            <div className="space-y-3 font-sans text-xs text-gray-200">
                              <div className="p-3.5 bg-red-950/40 border border-red-500/30 rounded-xl space-y-1">
                                <span className="text-rose-400 block font-bold uppercase tracking-wider text-[9px] font-mono">⚠️ THE IDENTIFIED CRITICAL DEFICIT</span>
                                <p className="leading-relaxed text-[11px] font-light">{problemDescription}</p>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[9px] text-[#D4A853]">
                                <div className="p-2 bg-white/5 rounded border border-white/10">
                                  🚨 RECURRING FINANCIAL WASTE &amp; INEFFICIENCIES
                                </div>
                                <div className="p-2 bg-white/5 rounded border border-white/10">
                                  🚨 WEAK INFRASTRUCTURE &amp; DISTRIBUTION DEFICITS
                                </div>
                              </div>
                            </div>
                          </div>
                          {slideImages[2] && (
                            <div className="md:col-span-4 flex items-center justify-center">
                              <div className="w-full max-h-56 rounded-lg overflow-hidden border border-red-500/30 bg-black/40 p-1 flex flex-col items-center justify-center shadow-md">
                                <div className="text-[8px] uppercase tracking-wider text-red-400 font-mono mb-1">Legacy Deficit Scan</div>
                                <img src={slideImages[2]} alt="Friction Proof Deficit Point" className="max-h-36 w-auto object-contain rounded" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeSlide === 3 && (
                      <div className="space-y-4">
                        <span className="text-[#D4A853] text-xs font-bold uppercase font-mono tracking-widest block font-sans">The Strategic Savior</span>
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                          {companyName} Solution Architecture
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          <div className={slideImages[3] ? "md:col-span-8 space-y-3" : "md:col-span-12 space-y-3"}>
                            <p className="text-xs text-gray-300 leading-relaxed font-light">{solutionDescription}</p>
                            
                            {/* Process architecture flow diagram */}
                            <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px] font-mono text-gray-300">
                              <div className="bg-white/5 p-1 rounded border border-[#D4A853]/20">
                                <p className="text-[#D4A853] font-bold">1. SOURCE</p>
                                <p className="scale-90 opacity-70">Raw Input</p>
                              </div>
                              <div className="bg-white/5 p-1 rounded border border-[#D4A853]/20">
                                <p className="text-[#D4A853] font-bold">2. REFINEMENT</p>
                                <p className="scale-90 opacity-70">Active Process</p>
                              </div>
                              <div className="bg-white/5 p-1 rounded border border-[#D4A853]/20">
                                <p className="text-[#D4A853] font-bold">3. ALIGN</p>
                                <p className="scale-90 opacity-70">Unified Core</p>
                              </div>
                              <div className="bg-white/5 p-1 rounded border border-[#D4A853]/20">
                                <p className="text-[#D4A853] font-bold">4. OUTPUT</p>
                                <p className="scale-90 opacity-70">Global Value</p>
                              </div>
                            </div>
                          </div>
                          {slideImages[3] && (
                            <div className="md:col-span-4 flex justify-center font-sans">
                              <div className="w-full max-h-56 rounded-lg overflow-hidden border border-[#D4A853]/30 bg-black/40 p-1 flex flex-col items-center justify-center shadow-md">
                                <span className="text-[8px] uppercase tracking-wider text-[#D4A853] font-mono mb-1">Product portfolio mockup</span>
                                <img src={slideImages[3]} alt="Product / Service Portfolio" className="max-h-36 w-auto object-contain rounded" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeSlide === 4 && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-emerald-400 text-xs font-bold uppercase font-mono tracking-widest block">Market TAM Dynamics</span>
                            <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                              Growth Outlook &amp; Target TAM
                            </h2>
                          </div>
                          <div className="text-right bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[10px] font-mono text-emerald-300">
                            PROJECTIONS ACTIVE
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          <div className="md:col-span-4 text-xs font-mono space-y-2">
                            <div>
                              <span className="text-gray-400 block uppercase text-[9px]">Sizing Indicator</span>
                              <span className="font-bold text-white">{targetMarket}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block uppercase text-[9px]">Calculated TAM Horizon</span>
                              <span className="font-bold text-[#D4A853]">{addressableMarketValue}</span>
                            </div>
                          </div>

                          {/* Beautiful CSS Dynamic Area Chart drawn using HTML */}
                          <div className={slideImages[4] ? "md:col-span-5 bg-white/5 p-3 rounded-xl border border-white/10 space-y-3 font-mono text-xs text-left" : "md:col-span-8 bg-white/5 p-4 rounded-xl border border-white/10 space-y-3 font-mono text-xs text-left"}>
                            <div className="space-y-1">
                              <div className="flex justify-between font-mono text-[9px]">
                                <span className="text-gray-400">Year 1 Milestones Target</span>
                                <span className="text-white font-bold">${year1Revenue.toLocaleString()} ARR</span>
                              </div>
                              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                                  style={{ width: `${Math.min(100, (year1Revenue / 300000) * 100)}%` }}
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between font-mono text-[9px]">
                                <span className="text-gray-400">Year 3 High Scale Horizon</span>
                                <span className="text-[#D4A853] font-bold">${year3Revenue.toLocaleString()} ARR</span>
                              </div>
                              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-[#D4A853] to-amber-400 h-full rounded-full transition-all duration-500"
                                  style={{ width: `${Math.min(100, (year3Revenue / 3000000) * 100)}%` }}
                                />
                              </div>
                            </div>

                            <span className="text-[8px] text-gray-500 italic block text-right">
                              *Sliders simulate rewards.
                            </span>
                          </div>

                          {slideImages[4] && (
                            <div className="md:col-span-3 flex justify-center font-sans">
                              <div className="w-full max-h-48 rounded-lg overflow-hidden border border-emerald-500/30 bg-black/40 p-1 flex flex-col items-center justify-center shadow-md">
                                <span className="text-[7px] uppercase tracking-wider text-emerald-400 font-mono mb-0.5">Demographics Map</span>
                                <img src={slideImages[4]} alt="TAM Demographics Map" className="max-h-28 w-auto object-contain rounded" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeSlide === 5 && (
                      <div className="space-y-4">
                        <span className="text-amber-400 text-xs font-bold uppercase font-mono tracking-widest block">Ghana Corporate Sovereign Identity</span>
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                          Verified Integrity &amp; Registration Authority
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Perfect mini representation replica of Ghanaian Certificate of Registration */}
                          <div className={slideImages[5] ? "md:col-span-8" : "md:col-span-12"}>
                            <div className="bg-white text-black p-3.5 rounded-xl border-t-8 border-red-600/90 font-serif shadow-lg relative max-w-lg mx-auto text-left">
                              <div className="absolute top-2 right-2 text-[9px] font-mono font-bold text-red-600 border border-red-600 px-1 py-0.5 rounded">
                                ID: {userRegNumber || "BN-PENDING"}
                              </div>
                              
                              <div className="text-center pb-1.5 border-b border-gray-200">
                                <span className="text-[9px] uppercase font-bold tracking-wider text-amber-900 block font-sans">Republic of Ghana</span>
                                <span className="text-[8px] font-sans font-bold text-gray-500">The Registration of Business Names Act, 1962 (No. 151)</span>
                                <h3 className="text-xs font-bold mt-0.5 text-[#2D1B0E] font-sans">CERTIFICATE OF REGISTRATION</h3>
                              </div>

                              <div className="py-2 text-center px-4 font-sans">
                                <p className="text-[10px] leading-relaxed text-gray-700">
                                  This is to certify that the business enterprise operating as:
                                </p>
                                <h4 className="font-serif font-bold text-xs tracking-wide text-red-700 uppercase my-0.5">
                                  {userCompanyName || companyName}
                                </h4>
                                <p className="text-[9px] text-gray-500 leading-relaxed">
                                  has been legally registered as a certified corporate entity.
                                </p>
                              </div>

                              <div className="border-t border-gray-200 pt-1.5 flex justify-between items-center text-[8px] font-sans text-gray-400">
                                <span>REG DATE: {userRegDate}</span>
                                <span>Regulatory Body: {userRegAuthority}</span>
                              </div>

                              <div className="mt-1.5 pt-1.5 border-t border-dashed border-gray-300 text-[8px] text-gray-400 leading-normal italic text-center font-sans font-sans">
                                Compliant under licensing authority of Ritemasta Publications (Sovereign Registration Corp Act, Reg. ID BN360822013)
                              </div>
                            </div>
                          </div>

                          {slideImages[5] && (
                            <div className="md:col-span-4 flex justify-center">
                              <div className="w-full max-h-52 rounded-lg overflow-hidden border border-amber-500/30 bg-black/40 p-1 flex flex-col items-center justify-center shadow-md">
                                <span className="text-[7px] uppercase tracking-wider text-amber-400 font-mono mb-0.5">Official Certificate Original Scan</span>
                                <img src={slideImages[5]} alt="Corporate Registration Scan" className="max-h-28 w-auto object-contain rounded" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeSlide === 6 && (
                      <div className="space-y-3 font-sans">
                        <div className="flex justify-between items-center bg-yellow-500/10 border border-yellow-500/20 p-2 rounded-lg">
                          <div>
                            <span className="text-[#D4A853] text-[9px] font-bold uppercase tracking-widest block font-mono">Korean Startup Grand Challenge Validation</span>
                            <h3 className="font-serif text-sm font-bold text-white">
                              Selected &amp; Audited by 80+ VC Industry Experts
                            </h3>
                          </div>
                          <div className="bg-white text-[#2D1B0E] p-1 rounded font-bold text-[9px] font-mono shrink-0">
                            KSGC 2025
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          <div className={slideImages[6] ? "md:col-span-8 space-y-3 text-left" : "md:col-span-12 space-y-3 text-left"}>
                            <div className="bg-white/5 p-2.5 rounded-lg border border-white/10 text-[11px] leading-relaxed italic text-gray-300">
                              "{companyName}’s high-impact layout breakthrough and localized market architecture stood out as one of the most promising selected enterprise solutions evaluated by international investors at the Seoul Grand Challenge."
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div className="bg-white/5 p-2 rounded font-sans">
                                <span className="text-[#D4A853] block text-[9px] uppercase font-mono">Global Validation Rate</span>
                                <span className="font-bold font-mono text-[11px]">Top 60 Global Contestants</span>
                              </div>
                              <div className="bg-white/5 p-2 rounded font-sans">
                                <span className="text-[#D4A853] block text-[9px] uppercase font-mono">Funding Target Sought</span>
                                <span className="font-bold font-mono text-[11px] text-emerald-400">{fundingAmount}</span>
                              </div>
                            </div>
                          </div>

                          {slideImages[6] && (
                            <div className="md:col-span-4 flex justify-center font-sans">
                              <div className="w-full max-h-52 rounded-lg overflow-hidden border border-amber-500/30 bg-black/40 p-1 flex flex-col items-center justify-center shadow-md">
                                <span className="text-[7px] uppercase tracking-wider text-amber-400 font-mono mb-0.5">Corporate Premises/Premises</span>
                                <img src={slideImages[6]} alt="Corporate Premises and Launch Team" className="max-h-28 w-auto object-contain rounded" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Landscape slide footer */}
                  <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                    <span>Evaluated by: KSGC Seoul Panel </span>
                    <span>Corporate Registry GHS</span>
                    <span className="text-white font-serif tracking-wider font-semibold">RitemastaPro Suite</span>
                  </div>
                </div>
              )}

              {/* Text Area Draft content for alternate documents (generic contract, mou, letters) */}
              {docType !== "pitch_deck" && (
                <div className="bg-white p-8 border border-neutral-300/80 rounded-2xl max-w-4xl mx-auto shadow-sm">
                  {isEditingDraft ? (
                    <textarea
                      value={compiledDraft}
                      onChange={(e) => setCompiledDraft(e.target.value)}
                      className="w-full h-full min-h-[400px] bg-white border-0 text-xs font-mono focus:outline-none leading-relaxed whitespace-pre-wrap"
                    />
                  ) : (
                    <div className="text-xs leading-relaxed space-y-4 font-mono whitespace-pre-wrap text-[#2D1B0E] text-left">
                      {compiledDraft || "Welcome! Provide your ideas or criteria and trigger the compiler to output beautiful professional copy."}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Bottom info footer */}
            <div className="px-6 py-3 bg-[#FAF7F2] border-t border-[#E8E0D8] text-[10px] text-[#8A7A6A] flex justify-between items-center flex-wrap gap-2 font-mono shrink-0">
              <span>Target Standard: ISO 300-DPI Vector</span>
              <span>Margins setup: {pdfMargin.toUpperCase()}</span>
              <span>Compiled by: iWrite Pro</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
