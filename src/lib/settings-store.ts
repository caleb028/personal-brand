import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

interface SystemSettings {
  adminPasscode: string;
  updatedAt: string;
}

const DEFAULT_SETTINGS: SystemSettings = {
  adminPasscode: process.env.ADMIN_PASSCODE || "admin2026",
  updatedAt: new Date().toISOString(),
};

async function ensureSettingsFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(SETTINGS_FILE);
    } catch {
      await fs.writeFile(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf8");
    }
  } catch (error) {
    console.error("Failed to ensure settings file exists:", error);
  }
}

export async function getAdminPasscode(): Promise<string> {
  await ensureSettingsFile();
  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf8");
    const data = JSON.parse(raw);
    return data.adminPasscode || process.env.ADMIN_PASSCODE || "admin2026";
  } catch (err) {
    console.error("Failed to read settings:", err);
    return process.env.ADMIN_PASSCODE || "admin2026";
  }
}

export async function updateAdminPasscode(newPasscode: string): Promise<boolean> {
  await ensureSettingsFile();
  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf8");
    const data: SystemSettings = JSON.parse(raw);
    data.adminPasscode = newPasscode;
    data.updatedAt = new Date().toISOString();
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Failed to update passcode in settings:", err);
    return false;
  }
}

export async function getAdminSettingsMetadata() {
  await ensureSettingsFile();
  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf8");
    const data: SystemSettings = JSON.parse(raw);
    return {
      hasCustomPasscode: data.adminPasscode !== "admin2026",
      updatedAt: data.updatedAt,
    };
  } catch {
    return {
      hasCustomPasscode: false,
      updatedAt: new Date().toISOString(),
    };
  }
}
