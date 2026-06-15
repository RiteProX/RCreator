/**
 * RitemastaPro - Shared Types Definition
 */

export interface User {
  id: string;
  email: string;
  name: string;
  isUnlocked: boolean; // Safe lifetime access pass
  isDesignStudioUnlocked?: boolean; // Standalone visual designer pass
  isIWriteProUnlocked?: boolean; // Standalone AI copywriter / agreements generator pass
  unlockCode?: string;
  createdAt: string;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface DocumentMetadata {
  title: string;
  subtitle?: string;
  author: string;
  publisher?: string;
  edition?: string;
  isbn?: string;
  copyright?: string;
  coverImage?: string;
  backCoverImage?: string;
  logoImage?: string;
}

export interface LayoutSettings {
  pageSize: "6x9" | "5.5x8.5" | "8.5x11" | "A4" | "Custom";
  customWidth?: number; // hours/inches
  customHeight?: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  bodyFontSize: number;
  lineSpacing: "1.15" | "1.5" | "2.0";
  fontSerif: string;
  fontSans: string;
  fontDisplay: string;
  fontSpecial?: string;
  activeTemplate: string;
}

export interface Project {
  id: string;
  userId: string;
  type: "ebook" | "POD" | "academic" | "magazine" | "poster" | "business_card" | "form" | "receipt" | "presentation" | "pitch_deck" | "proposal" | "synopsis";
  metadata: DocumentMetadata;
  layout: LayoutSettings;
  chapters: Chapter[];
  reviewComments?: ReviewComment[];
  createdAt: string;
  updatedAt: string;
}

export interface ReviewComment {
  id: string;
  author: string;
  text: string;
  status: "pending" | "resolved" | "approved" | "attention";
  chapterId: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "yayra";
  text: string;
  timestamp: string;
}

export interface AccessCode {
  code: string;
  customerName: string;
  paymentMethod: string;
  amountPaidUsd: number;
  amountPaidGhs: number;
  status: "active" | "redeemed" | "pending";
  date: string;
}
