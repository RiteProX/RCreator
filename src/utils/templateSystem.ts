/**
 * RitemastaPro - Template Definitions & Styling System
 * Contains comprehensive layout configurations for all 28 templates.
 */

export interface ColorPalette {
  primary: string;       // Main brand / accent color
  secondary: string;     // Support / secondary color
  background: string;    // Page ambient background
  cardColor: string;     // Surface container / card background
  textColor: string;     // Core readable text color
  mutedColor: string;    // Subtitles and metadata text
  borderColor: string;   // Accent lines / separators
}

export interface MarginPreset {
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
}

export type HeadingTreatment = "dropcap" | "numbered" | "icon-prefixed";

export interface TemplateDefinition {
  name: string;
  category: string;
  icon: string;
  styleFamily: "serif" | "sans" | "display";
  fontTriplet: {
    serif: string;
    sans: string;
    display: string;
  };
  palette: ColorPalette;
  headingTreatment: HeadingTreatment;
  margins: MarginPreset;
}

export const TEMPLATE_DEFINITIONS: Record<string, TemplateDefinition> = {
  "Serene Wellness": {
    name: "Serene Wellness",
    category: "Meditation & wellness",
    icon: "💆",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#2E7D32",       // Earthy forest green
      secondary: "#81C784",     // Gentle sage green
      background: "#F1F8E9",    // Soft organic herbal cream
      cardColor: "#FFFFFF",
      textColor: "#1B5E20",     // Deep foliage charcoal green
      mutedColor: "#558B2F",    // Mossy secondary text
      borderColor: "#DCEDC8"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.25, marginRight: 1.0 }
  },
  "Energy & Fitness": {
    name: "Energy & Fitness",
    category: "Health coaching",
    icon: "⚡",
    styleFamily: "sans",
    fontTriplet: {
      serif: "Lora",
      sans: "Inter",
      display: "Montserrat"
    },
    palette: {
      primary: "#FF6D00",       // Energizing high-vis orange
      secondary: "#FFAB40",     // Supporting orange amber
      background: "#FAFAFA",    // Clean active white
      cardColor: "#FFFFFF",
      textColor: "#212121",     // Strong carbon black
      mutedColor: "#757575",    // Dynamic grey
      borderColor: "#E0E0E0"
    },
    headingTreatment: "icon-prefixed",
    margins: { marginTop: 0.85, marginBottom: 0.85, marginLeft: 1.15, marginRight: 0.85 }
  },
  "Healing Wellness": {
    name: "Healing Wellness",
    category: "Natural healing",
    icon: "✨",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#00796B",       // Deep healing teal
      secondary: "#4DB6AC",     // Minty therapeutic teal
      background: "#E0F2F1",    // Healing mineral mist background
      cardColor: "#FFFFFF",
      textColor: "#004D40",     // Calming dark spruce
      mutedColor: "#00695C",    // Aquatic forest leaf text
      borderColor: "#B2DFDB"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.25, marginRight: 1.0 }
  },
  "Natural Living": {
    name: "Natural Living",
    category: "Organic lifestyle",
    icon: "🌿",
    styleFamily: "sans",
    fontTriplet: {
      serif: "Lora",
      sans: "Inter",
      display: "Montserrat"
    },
    palette: {
      primary: "#3E2723",       // Rich earthy walnut brown
      secondary: "#8D6E63",     // Clay brown accent
      background: "#efebe9",    // Soft stone flax
      cardColor: "#FFFFFF",
      textColor: "#272727",     // Charcoal bark
      mutedColor: "#5D4037",    // Cocoa brown
      borderColor: "#D7CCC8"
    },
    headingTreatment: "icon-prefixed",
    margins: { marginTop: 0.9, marginBottom: 0.9, marginLeft: 1.2, marginRight: 0.9 }
  },
  "Textbook Classic": {
    name: "Textbook Classic",
    category: "Educational & study",
    icon: "📚",
    styleFamily: "sans",
    fontTriplet: {
      serif: "Lora",
      sans: "Inter",
      display: "Montserrat"
    },
    palette: {
      primary: "#1A237E",       // Academic indigo blue
      secondary: "#3F51B5",     // Standard school textbook blue
      background: "#F5F5F7",    // Slate study white
      cardColor: "#FFFFFF",
      textColor: "#1C1C1E",     // Sharp ink black
      mutedColor: "#7986CB",     // Clean denim grey
      borderColor: "#C5CAE9"
    },
    headingTreatment: "numbered",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.25, marginRight: 1.0 }
  },
  "Coach's Journey": {
    name: "Coach's Journey",
    category: "Coaching & mentoring",
    icon: "🎯",
    styleFamily: "display",
    fontTriplet: {
      serif: "Cormorant Garamond",
      sans: "Poppins",
      display: "Jost"
    },
    palette: {
      primary: "#4E342E",       // Mentoring warm bronze
      secondary: "#D4A853",     // Elegant champion gold
      background: "#FDFBF7",    // Polished parchment cream
      cardColor: "#FFFFFF",
      textColor: "#3E2723",     // Warm dark walnut
      mutedColor: "#8D6E63",    // Earth cocoa support
      borderColor: "#EFEBE9"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.25, marginRight: 1.0 }
  },
  "Classic Novel": {
    name: "Classic Novel",
    category: "Fiction & novels",
    icon: "📖",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#1E1E24",       // Ink-horn black
      secondary: "#8A7A6A",     // Historic dust grey
      background: "#FAF6EE",    // Authentic novel paper cream
      cardColor: "#FFFFFF",
      textColor: "#111111",     // High print-contrast black
      mutedColor: "#5C5346",    // Faded charcoal sepia
      borderColor: "#E6DEC9"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.1, marginBottom: 1.1, marginLeft: 1.5, marginRight: 1.1 }
  },
  "Fashion Magazine": {
    name: "Fashion Magazine",
    category: "Magazines & newsletters",
    icon: "📰",
    styleFamily: "display",
    fontTriplet: {
      serif: "Cormorant Garamond",
      sans: "Poppins",
      display: "Jost"
    },
    palette: {
      primary: "#E91E63",       // Magenta print pink
      secondary: "#000000",     // Midnight solid black
      background: "#FFFFFF",    // High glossy pure white
      cardColor: "#FFFFFF",
      textColor: "#000000",     // Stark runway deep black
      mutedColor: "#9E9E9E",    // Slate model grey
      borderColor: "#F48FB1"
    },
    headingTreatment: "icon-prefixed",
    margins: { marginTop: 0.75, marginBottom: 0.75, marginLeft: 1.0, marginRight: 0.75 }
  },
  "Scientific Journal": {
    name: "Scientific Journal",
    category: "Academic reports",
    icon: "🔬",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#0D47A1",       // Laboratory cobalt navy
      secondary: "#1976D2",     // Instrument status blue
      background: "#F8F9FA",    // Clean room paper
      cardColor: "#FFFFFF",
      textColor: "#212121",     // Clean carbon black
      mutedColor: "#546E7A",    // Steel grey
      borderColor: "#CFD8DC"
    },
    headingTreatment: "numbered",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.25, marginRight: 1.0 }
  },
  "Executive Proposal": {
    name: "Executive Proposal",
    category: "Corporate synopsis",
    icon: "💼",
    styleFamily: "sans",
    fontTriplet: {
      serif: "Lora",
      sans: "Inter",
      display: "Montserrat"
    },
    palette: {
      primary: "#263238",       // Executive anthracite gray
      secondary: "#00BCD4",     // Teal business progress light
      background: "#ECEFF1",    // Sharp corporate slate
      cardColor: "#FFFFFF",
      textColor: "#212121",     // Formal briefing black
      mutedColor: "#607D8B",    // Signature steel gray
      borderColor: "#CFD8DC"
    },
    headingTreatment: "numbered",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.25, marginRight: 1.0 }
  },
  "Minimalist Poetry": {
    name: "Minimalist Poetry",
    category: "Short lines & verses",
    icon: "✒️",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#424242",       // Graphite grey
      secondary: "#9E9E9E",     // Vapor grey
      background: "#FFFDFB",    // Spacious studio white
      cardColor: "#FFFFFF",
      textColor: "#212121",     // Pure ink charcoal
      mutedColor: "#757575",    // Light slate gray
      borderColor: "#EEEEEE"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.5, marginBottom: 1.5, marginLeft: 1.75, marginRight: 1.5 }
  },
  "Culinary Recipes": {
    name: "Culinary Recipes",
    category: "Cookbook instructions",
    icon: "🍳",
    styleFamily: "display",
    fontTriplet: {
      serif: "Cormorant Garamond",
      sans: "Poppins",
      display: "Jost"
    },
    palette: {
      primary: "#D84315",       // Warm terracotta brick red
      secondary: "#FFB300",     // Vibrant spice turmeric saffron
      background: "#FDF5E6",    // Old flour sack beige
      cardColor: "#FFFFFF",
      textColor: "#3E2723",     // Warm cocoa brown
      mutedColor: "#795548",    // Ground coffee brown
      borderColor: "#FFCC80"
    },
    headingTreatment: "icon-prefixed",
    margins: { marginTop: 0.9, marginBottom: 0.9, marginLeft: 1.2, marginRight: 0.9 }
  },
  "Form/Receipt Standard": {
    name: "Form/Receipt Standard",
    category: "Professional receipts",
    icon: "🧾",
    styleFamily: "sans",
    fontTriplet: {
      serif: "Lora",
      sans: "Inter",
      display: "Montserrat"
    },
    palette: {
      primary: "#212121",       // Professional charcoal dark ink
      secondary: "#616161",     // Industrial audit grey
      background: "#FAFAFA",    // Clean register roll white
      cardColor: "#FFFFFF",
      textColor: "#212121",     // Dense ledger black
      mutedColor: "#757575",    // Carbon paper grey
      borderColor: "#BDBDBD"
    },
    headingTreatment: "numbered",
    margins: { marginTop: 0.4, marginBottom: 0.4, marginLeft: 0.4, marginRight: 0.4 }
  },
  "Startup Pitch Deck": {
    name: "Startup Pitch Deck",
    category: "Venture presentations",
    icon: "🚀",
    styleFamily: "display",
    fontTriplet: {
      serif: "Cormorant Garamond",
      sans: "Poppins",
      display: "Jost"
    },
    palette: {
      primary: "#6200EA",       // Kinetic violet neon
      secondary: "#00E5FF",     // Ultra cyber cyan
      background: "#0C0912",    // Venture digital dark space
      cardColor: "#171224",
      textColor: "#FFFFFF",     // Brilliant crystal white
      mutedColor: "#9E96B3",    // Starlight nebula violet
      borderColor: "#31254C"
    },
    headingTreatment: "icon-prefixed",
    margins: { marginTop: 0.8, marginBottom: 0.8, marginLeft: 1.1, marginRight: 0.8 }
  },
  "SHS SHS SHS Geography": {
    name: "SHS SHS SHS Geography",
    category: "Academic text layout",
    icon: "🌍",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#0E4D92",       // Atlas deep blue
      secondary: "#4C9F70",     // Topography forest khaki green
      background: "#FFFBF0",    // Historic parchment map tint
      cardColor: "#FFFFFF",
      textColor: "#2B1B17",     // Soil dark brown
      mutedColor: "#5B7065",    // River marine blue shadow
      borderColor: "#D2B48C"
    },
    headingTreatment: "numbered",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.25, marginRight: 1.0 }
  },
  "Faith-Based Set Apart": {
    name: "Faith-Based Set Apart",
    category: "Inspirational faith",
    icon: "⛪",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#800020",       // Sanctified burgundy maroon
      secondary: "#D4A853",     // Divine golden tabernacle
      background: "#FCFAF2",    // Warm candle chapel light
      cardColor: "#FFFFFF",
      textColor: "#2B1A1E",     // Sacred deeply aged black bean
      mutedColor: "#8C6A3B",    // Bronze olive support
      borderColor: "#D4C59E"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.1, marginBottom: 1.1, marginLeft: 1.4, marginRight: 1.1 }
  },
  "Chess Out Extraordinary": {
    name: "Chess Out Extraordinary",
    category: "Bold motivational",
    icon: "♟️",
    styleFamily: "display",
    fontTriplet: {
      serif: "Cormorant Garamond",
      sans: "Poppins",
      display: "Jost"
    },
    palette: {
      primary: "#000000",       // Grandmaster champion obsidian
      secondary: "#B8860B",     // Vintage championship dark gold
      background: "#FAF9F6",    // Polished marble board ivory
      cardColor: "#FFFFFF",
      textColor: "#121212",     // Staunton black
      mutedColor: "#696969",    // Pencil layout grey
      borderColor: "#CCCCCC"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.25, marginRight: 1.0 }
  },
  "The Bitter Leaf Protocol": {
    name: "The Bitter Leaf Protocol",
    category: "Step wellness protocol",
    icon: "🍃",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#1B4D3E",       // Anti-inflammatory bitter dark leaf
      secondary: "#8FBC8F",     // Healing aloe vera green
      background: "#EDF4F2",    // Purified water grey-green
      cardColor: "#FFFFFF",
      textColor: "#122620",     // Deep herbal tonic charcoal
      mutedColor: "#4E6E58",    // Celery support stalk text
      borderColor: "#C3DBD3"
    },
    headingTreatment: "numbered",
    margins: { marginTop: 0.95, marginBottom: 0.95, marginLeft: 1.2, marginRight: 0.95 }
  },
  "Natural Vitality Ga": {
    name: "Natural Vitality Ga",
    category: "Akan, Ga, Ewe dialect format",
    icon: "🇬🇭",
    styleFamily: "display",
    fontTriplet: {
      serif: "Cormorant Garamond",
      sans: "Poppins",
      display: "Jost"
    },
    palette: {
      primary: "#C8102E",       // Ga sunset deep scarlet
      secondary: "#FFCD00",     // Rich West African palm gold
      background: "#FFFBF2",    // Warm adobe savannah sand
      cardColor: "#FFFFFF",
      textColor: "#006B3F",     // Lush forest green text
      mutedColor: "#B55623",    // Earthy clay brick ginger
      borderColor: "#FFDDA1"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.25, marginRight: 1.0 }
  },
  "German Academic Core": {
    name: "German Academic Core",
    category: "French / German text layouts",
    icon: "🇪🇺",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#2C3E50",       // Heidelberg academic asphalt steel
      secondary: "#7F8C8D",     // German concrete grey
      background: "#F6F8F9",    // Editorial paper white
      cardColor: "#FFFFFF",
      textColor: "#1A252F",     // Sharp ink density
      mutedColor: "#95A5A6",    // Library stone dust
      borderColor: "#BDC3C7"
    },
    headingTreatment: "numbered",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.3, marginRight: 1.0 }
  },
  "Universal Receipts Simple": {
    name: "Universal Receipts Simple",
    category: "Forms & invoices",
    icon: "🏷️",
    styleFamily: "sans",
    fontTriplet: {
      serif: "Lora",
      sans: "Inter",
      display: "Montserrat"
    },
    palette: {
      primary: "#2C3E50",       // Slate ledger ink
      secondary: "#7F8C8D",     // Auditing carbon copy silver
      background: "#F9F9FA",    // Shop till bright silver
      cardColor: "#FFFFFF",
      textColor: "#111111",     // Stark barcode black
      mutedColor: "#595959",    // Itemized grey scale
      borderColor: "#D9D9D9"
    },
    headingTreatment: "numbered",
    margins: { marginTop: 0.5, marginBottom: 0.5, marginLeft: 0.5, marginRight: 0.5 }
  },
  "Standard Business Cards": {
    name: "Standard Business Cards",
    category: "Premium prints layout",
    icon: "📇",
    styleFamily: "sans",
    fontTriplet: {
      serif: "Lora",
      sans: "Inter",
      display: "Montserrat"
    },
    palette: {
      primary: "#1A1A1A",       // Executive linen black
      secondary: "#C5A880",     // Premium champagne foil
      background: "#FFFDF9",    // Eggshell visual card stock
      cardColor: "#FFFFFF",
      textColor: "#2B2B2B",     // Sophisticated carbon
      mutedColor: "#8C847E",    // Blind deboss silver
      borderColor: "#EBE3DB"
    },
    headingTreatment: "icon-prefixed",
    margins: { marginTop: 0.35, marginBottom: 0.35, marginLeft: 0.35, marginRight: 0.35 }
  },
  "Artistic Poster Classic": {
    name: "Artistic Poster Classic",
    category: "Broadsheet typography",
    icon: "🖼️",
    styleFamily: "display",
    fontTriplet: {
      serif: "Cormorant Garamond",
      sans: "Poppins",
      display: "Jost"
    },
    palette: {
      primary: "#C62828",       // Gallery exhibition red
      secondary: "#1565C0",     // Mid-century pop art blue
      background: "#FFF8E1",    // Coarse heavy poster canvas yellow
      cardColor: "#FFFFFF",
      textColor: "#0D0D0D",     // High solid screenprint ink
      mutedColor: "#D32F2F",    // Accent signal red
      borderColor: "#E0DBCE"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.3, marginBottom: 1.3, marginLeft: 1.5, marginRight: 1.3 }
  },
  "SHS Practical Atlas": {
    name: "SHS Practical Atlas",
    category: "Practical manuals",
    icon: "🗺️",
    styleFamily: "sans",
    fontTriplet: {
      serif: "Lora",
      sans: "Inter",
      display: "Montserrat"
    },
    palette: {
      primary: "#006064",       // Marine navigation deep cyan
      secondary: "#0097A7",     // Practical altitude survey light cyan
      background: "#F0F7F7",    // Grid worksheet light ice
      cardColor: "#FFFFFF",
      textColor: "#00363A",     // Hydrographic depth dark cyan
      mutedColor: "#00838F",    // Coordinates marker blue
      borderColor: "#B2EBF2"
    },
    headingTreatment: "numbered",
    margins: { marginTop: 0.9, marginBottom: 0.9, marginLeft: 1.2, marginRight: 0.9 }
  },
  "Wellness Protocol Reset": {
    name: "Wellness Protocol Reset",
    category: "Digestive healthy layouts",
    icon: "💧",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#0288D1",       // Hydrotherapeutic ocean blue
      secondary: "#4FC3F7",     // Gentle pure mineral stream blue
      background: "#E1F5FE",    // Revitalizing hydration sky blue
      cardColor: "#FFFFFF",
      textColor: "#01579B",     // Salubrious dark sapphire
      mutedColor: "#0288D1",    // Clean water current blue
      borderColor: "#B3E5FC"
    },
    headingTreatment: "numbered",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.25, marginRight: 1.0 }
  },
  "The Sevenfold Pack": {
    name: "The Sevenfold Pack",
    category: "Faith spiritual guidelines",
    icon: "🔥",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#D32F2F",       // Pentecostal purifying fire crimson
      secondary: "#FFA000",     // Bright glowing altar lamp amber
      background: "#FFFBF0",    // Eternal ancient high sanctuary parchment
      cardColor: "#FFFFFF",
      textColor: "#3E2723",     // Sacred heavy olive wood dark charcoal
      mutedColor: "#C2185B",    // Epistles deep raspberry wine
      borderColor: "#FFECB3"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.15, marginBottom: 1.15, marginLeft: 1.45, marginRight: 1.15 }
  },
  "Creative Portfolios": {
    name: "Creative Portfolios",
    category: "Personal synopses",
    icon: "🎨",
    styleFamily: "display",
    fontTriplet: {
      serif: "Cormorant Garamond",
      sans: "Poppins",
      display: "Jost"
    },
    palette: {
      primary: "#B25E50",       // Chic dry terracotta rose gold
      secondary: "#2E4F4F",     // Moody bespoke deep sage forest
      background: "#F4F1EA",    // Luxurious architecture studio linen
      cardColor: "#FFFFFF",
      textColor: "#212121",     // Premium design studio charcoal
      mutedColor: "#757575",    // Sketch graphite gray
      borderColor: "#E5E1D8"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.1, marginBottom: 1.1, marginLeft: 1.4, marginRight: 1.1 }
  },
  "Bookstera Clean Pro": {
    name: "Bookstera Clean Pro",
    category: "General author layouts",
    icon: "⭐",
    styleFamily: "serif",
    fontTriplet: {
      serif: "Playfair Display",
      sans: "Inter",
      display: "Playfair Display"
    },
    palette: {
      primary: "#37474F",       // Literary professional dark steel slate
      secondary: "#78909C",     // Refined library dust greyish steel
      background: "#FAF9F5",    // Clear-minded soft beige journal papers
      cardColor: "#FFFFFF",
      textColor: "#263238",     // Elegant deep ink
      mutedColor: "#546E7A",    // Muted book binding spine charcoal
      borderColor: "#CFD8DC"
    },
    headingTreatment: "dropcap",
    margins: { marginTop: 1.0, marginBottom: 1.0, marginLeft: 1.25, marginRight: 1.0 }
  }
};
