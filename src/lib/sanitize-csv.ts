/**
 * Client-safe CSV Formula Injection Sanitizer (OWASP CWE-1236).
 * Neutralizes characters (=, +, -, @, \t, \r) that spreadsheet applications
 * (Excel, Google Sheets, LibreOffice Calc) interpret as formulas or DDE execution triggers.
 */
export function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return '""';
  let str = String(value).trim();

  // If text starts with a formula trigger, prepend a single quote to force plain text interpretation
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  // Escape inner double quotes by doubling them according to RFC 4180
  return `"${str.replace(/"/g, '""')}"`;
}
