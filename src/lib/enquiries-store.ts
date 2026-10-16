import fs from "fs/promises";
import path from "path";

export interface EnquiryNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface EnquiryAuditLog {
  id: string;
  action: string;
  timestamp: string;
}

export interface Enquiry {
  id: string;
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  service: string;
  description: string;
  budget: string;
  preferredContact: "Email" | "WhatsApp" | "Phone Call";
  status: "new" | "in_progress" | "contacted" | "closed" | "archived";
  isRead: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  notes: EnquiryNote[];
  history: EnquiryAuditLog[];
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const FILE_PATH = path.join(DATA_DIR, "enquiries.json");

async function ensureFileExists() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(FILE_PATH);
    } catch {
      // File doesn't exist, initialize empty array for real live inquiries
      await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), "utf8");
    }
  } catch (error) {
    console.error("Error ensuring enquiries file exists:", error);
  }
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  await ensureFileExists();
  try {
    const raw = await fs.readFile(FILE_PATH, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to read enquiries:", err);
    return [];
  }
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  const all = await getAllEnquiries();
  return all.find((e) => e.id === id || e.reference === id) || null;
}

export async function createEnquiry(
  input: Omit<Enquiry, "id" | "reference" | "createdAt" | "updatedAt" | "notes" | "history"> & {
    reference?: string;
  }
): Promise<Enquiry> {
  const all = await getAllEnquiries();
  const id = `ENQ-${Math.floor(10000 + Math.random() * 90000)}`;
  const reference = input.reference || `IWS-${Date.now().toString().slice(-6)}`;
  const now = new Date().toISOString();

  const newEnquiry: Enquiry = {
    ...input,
    id,
    reference,
    createdAt: now,
    updatedAt: now,
    notes: [],
    history: [
      {
        id: `hist-${Date.now()}`,
        action: "Inquiry created",
        timestamp: now,
      },
    ],
  };

  all.unshift(newEnquiry);
  await fs.writeFile(FILE_PATH, JSON.stringify(all, null, 2), "utf8");
  return newEnquiry;
}

export async function updateEnquiry(
  id: string,
  updates: Partial<Omit<Enquiry, "id" | "reference" | "createdAt">> & {
    newNote?: string;
    auditAction?: string;
  }
): Promise<Enquiry | null> {
  const all = await getAllEnquiries();
  const index = all.findIndex((e) => e.id === id || e.reference === id);
  if (index === -1) return null;

  const current = all[index];
  const now = new Date().toISOString();

  const updatedNotes = [...current.notes];
  if (updates.newNote && updates.newNote.trim()) {
    updatedNotes.unshift({
      id: `note-${Date.now()}`,
      author: "Admin",
      text: updates.newNote.trim(),
      createdAt: now,
    });
  }

  const updatedHistory = [...current.history];
  if (updates.auditAction) {
    updatedHistory.unshift({
      id: `hist-${Date.now()}`,
      action: updates.auditAction,
      timestamp: now,
    });
  }

  const updatedEnquiry: Enquiry = {
    ...current,
    ...updates,
    notes: updatedNotes,
    history: updatedHistory,
    updatedAt: now,
  };

  all[index] = updatedEnquiry;
  await fs.writeFile(FILE_PATH, JSON.stringify(all, null, 2), "utf8");
  return updatedEnquiry;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const all = await getAllEnquiries();
  const filtered = all.filter((e) => e.id !== id && e.reference !== id);
  if (filtered.length === all.length) return false;

  await fs.writeFile(FILE_PATH, JSON.stringify(filtered, null, 2), "utf8");
  return true;
}

export async function getEnquiriesStats() {
  const all = await getAllEnquiries();
  const total = all.length;
  const newCount = all.filter((e) => e.status === "new").length;
  const inProgress = all.filter((e) => e.status === "in_progress").length;
  const contacted = all.filter((e) => e.status === "contacted").length;
  const closed = all.filter((e) => e.status === "closed").length;
  const unread = all.filter((e) => !e.isRead).length;

  const serviceBreakdown: Record<string, number> = {};
  all.forEach((e) => {
    serviceBreakdown[e.service] = (serviceBreakdown[e.service] || 0) + 1;
  });

  return {
    total,
    newCount,
    inProgress,
    contacted,
    closed,
    unread,
    serviceBreakdown,
  };
}
