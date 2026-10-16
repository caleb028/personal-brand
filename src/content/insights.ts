export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "Software Engineering" | "Business Digital Transformation" | "E-Commerce" | "Development Best Practices";
  publishedAt: string;
  readTime: string;
  author: string;
  tableOfContents: { id: string; title: string }[];
  content: string; // Markdown formatted article body
  tags: string[];
}

export const insightArticles: InsightArticle[] = [
  {
    slug: "designing-resilient-mpesa-payment-handlers",
    title: "Designing Resilient M-Pesa Payment Handlers in Production",
    excerpt:
      "A technical walkthrough of building idempotent webhook listeners, handling network timeouts, and preventing duplicate ledger postings in Kenyan financial workflows.",
    category: "Software Engineering",
    publishedAt: "October 8, 2026",
    readTime: "7 min read",
    author: "Lebby Software Solutions",
    tags: ["M-Pesa Daraja", "Node.js", "Payment Gateways", "System Architecture"],
    tableOfContents: [
      { id: "the-reality-of-mobile-payments", title: "The Reality of Mobile Payment Gateways" },
      { id: "idempotency-and-callback-receipts", title: "Idempotency and Callback Receipts" },
      { id: "handling-stk-push-timeouts", title: "Handling STK Push Timeouts Gracefully" },
      { id: "unmatched-payments-queue", title: "The Unmatched Payments Queue" },
      { id: "practical-checklist", title: "Production Deployment Checklist" },
    ],
    content: `
Mobile money systems like Safaricom's Daraja API are the lifeblood of commerce and institutional fees across East Africa. However, transitioning from sandbox testing to live high-volume production reveals edge cases that off-the-shelf tutorial code rarely addresses.

### The Reality of Mobile Payment Gateways

In an ideal flow, a customer requests a payment prompt (STK Push), enters their PIN, and Safaricom's servers issue an HTTP POST callback to your endpoint within 3 seconds. 

In production, however:
- Mobile users frequently take 20 to 45 seconds to authorize transactions.
- Cellular signal drops or network timeouts can delay webhook callbacks by several minutes.
- The payment gateway may retry sending callbacks multiple times if your server response is slightly delayed.

If your backend code simply receives a callback and increments an account balance without safeguards, a retried callback will double-credit the customer.

### Idempotency and Callback Receipts

The cornerstone of reliable payment engineering is strict idempotency. Every completed M-Pesa transaction arrives with a globally unique reference number (e.g. \`SJC45KL98P\`).

Before modifying any user balances or generating receipts:
1. **Database Constraint:** Store transaction references with a unique database index constraint (\`@unique\` in Prisma or \`UNIQUE INDEX\` in PostgreSQL).
2. **Transaction Locking:** Wrap the lookup, verification, and ledger credit in an atomic database transaction.
3. **Payload Archival:** Always save the raw callback JSON in an immutable audit table before parsing. If an unforeseen format exception occurs, you have an uncorrupted record of the customer's funds.

\`\`\`typescript
// Safe idempotent callback handler pattern
const existingReceipt = await prisma.mpesaTransaction.findUnique({
  where: { receiptNumber: rawReceiptNumber },
});

if (existingReceipt) {
  // Already processed; acknowledge immediately to prevent retry spam
  return NextResponse.json({ ResultCode: 0, ResultDesc: "Duplicate acknowledged" });
}

await prisma.$transaction(async (tx) => {
  await tx.mpesaTransaction.create({
    data: { receiptNumber: rawReceiptNumber, amount, phone, status: "COMPLETED" },
  });
  await tx.accountLedger.update({
    where: { accountId },
    data: { balance: { increment: amount } },
  });
});
\`\`\`

### Handling STK Push Timeouts Gracefully

When a customer initiates an STK Push, avoid locking their user interface into an infinite loading spinner. Set a clear 60-second polling boundary. If the webhook has not landed within that window, transition the interface to a "Processing Confirmation" state with an option to check status using their transaction code.

Never assume a client-side timeout means the customer did not pay. They may have typed their PIN 20 seconds later while in an elevator. Rely solely on the server webhook to finalize order statuses.

### The Unmatched Payments Queue

For C2B (PayBill) transactions where customers manually type an account number (such as a school admission number or rental house code), human typos are inevitable. If a parent types "ADM-102" instead of "ADM-1024", your automated matcher will fail to find the student.

Rather than rejecting the funds or losing the payment, routes should catch unassigned transactions and place them into an **Unmatched Payments Reconciliation Queue**. This allows the bursar or administrator to manually assign the verified transaction with an audit note.

### Production Deployment Checklist

1. Always enforce HTTPS with valid TLS certificates on callback endpoints.
2. Whitelist Safaricom's official IP ranges or authenticate HMAC request signatures.
3. Return HTTP 200 within 2 seconds of receipt; offload heavy post-processing (e.g. PDF receipt generation, SMS dispatch) to asynchronous background workers.
4. Set up automated daily reconciliation comparing your local transaction tally against Safaricom's settlement portal export.
`,
  },
  {
    slug: "why-most-custom-software-fails-and-how-scope-discipline-fixes-it",
    title: "Why Most Custom Business Software Fails (And How Scope Discipline Fixes It)",
    excerpt:
      "A pragmatic look at why software projects drift off schedule and how focusing on core operational bottlenecks ensures high adoption and real ROI.",
    category: "Business Digital Transformation",
    publishedAt: "September 24, 2026",
    readTime: "6 min read",
    author: "Lebby Software Solutions",
    tags: ["Project Management", "Business Analysis", "SME Tech", "Software Strategy"],
    tableOfContents: [
      { id: "the-temptation-of-everything-at-once", title: "The Temptation of Everything at Once" },
      { id: "identifying-the-core-bottleneck", title: "Identifying the Core Bottleneck" },
      { id: "the-phased-delivery-framework", title: "The Phased Delivery Framework" },
      { id: "software-that-staff-actually-use", title: "Software That Staff Actually Use" },
    ],
    content: `
Many business owners have experienced a software project that began with great optimism, dragged on for months past its projected deadline, and ultimately arrived with features nobody uses and bugs in the parts that matter most.

Why does this happen so frequently? In almost every case, the root cause is not programming ability—it is lack of scope discipline.

### The Temptation of Everything at Once

When an organization decides to replace manual paperwork with custom software, stakeholders understandably compile an exhaustive wishlist:
- "Can it do automated payroll?"
- "Can it forecast next quarter's revenue with artificial intelligence?"
- "Can we have animated 3D charts on the executive screen?"

While all of these features sound appealing in abstract presentations, trying to build them all in version 1.0 dilutes attention away from the primary business problem. The launch gets delayed, the budget balloons, and user testing occurs too late.

### Identifying the Core Bottleneck

Before writing a single line of code, an effective software consultancy must ask one central question:

> *"What is the single operational task that, if automated tomorrow, would save your business the most time or prevent the biggest loss?"*

In a school, that bottleneck is usually fee reconciliation and CBC grade compiling.
In a grain milling business, that bottleneck is weighbridge tare accuracy and moisture deduction disputes.
In a property agency, that bottleneck is tracking tenant arrears and automated payment matching.

Solve that specific problem first. Build the software around that core workflow, validate it in real day-to-day operations, and ensure the staff members responsible for that task are delighted.

### The Phased Delivery Framework

At Lebby Software Solutions, we structure software development around distinct, verifiable milestones:

1. **Phase 1: Operational Core (MVP)** — The single essential workflow works flawlessly. Data is structured cleanly, core users can do their jobs faster, and basic reporting is functional.
2. **Phase 2: Automated Integrations** — Connect payment gateways, SMS notifications, and external accounting tools.
3. **Phase 3: Refinement & Advanced Insights** — Deep reporting, edge-case automations, and workflow optimizations based on actual operational feedback.

### Software That Staff Actually Use

Software delivers zero business value if your staff avoids using it. Beautiful interfaces that require 14 mouse clicks to complete a basic receipt will quickly be abandoned in favor of paper notebooks.

A great developer understands that user experience is not just visual aesthetics—it is efficiency, speed, keyboard accessibility, and respect for the operator's time.
`,
  },
  {
    slug: "moving-from-excel-sheets-to-custom-web-portals",
    title: "Moving from Excel Sheets to Custom Web Portals: What SMEs Must Plan For",
    excerpt:
      "Spreadsheets are fantastic for starting out, but dangerous for scaling operations. Here is how businesses can transition safely to centralized web databases.",
    category: "Development Best Practices",
    publishedAt: "September 12, 2026",
    readTime: "5 min read",
    author: "Lebby Software Solutions",
    tags: ["Database Design", "SME Operations", "Web Portals", "Data Integrity"],
    tableOfContents: [
      { id: "when-spreadsheets-break-down", title: "When Spreadsheets Break Down" },
      { id: "three-hidden-costs-of-excel", title: "The Three Hidden Costs of Spreadsheet Chaos" },
      { id: "structuring-the-migration", title: "Structuring the Data Migration" },
      { id: "preserving-familiarity", title: "Preserving Operational Familiarity" },
    ],
    content: `
Microsoft Excel and Google Sheets are among the most capable general-purpose tools ever created. For a newly established business with one or two operators, a well-crafted spreadsheet is fast, flexible, and cost-effective.

However, as a company grows to multiple employees, locations, or higher transaction volumes, spreadsheets transition from an asset into a serious operational risk.

### When Spreadsheets Break Down

Spreadsheets begin showing dangerous cracks when:
- Multiple team members edit the same file, resulting in conflicting copies labeled "FINAL_v2_updated_REAL.xlsx".
- Cell formulas get accidentally edited or overwritten without anyone noticing for weeks.
- Crucial customer and financial records reside on one staff member's personal laptop without central backup.
- It is impossible to give a receptionist permission to record client visits without also revealing company financials.

### The Three Hidden Costs of Spreadsheet Chaos

1. **Lack of Role-Based Access:** Spreadsheets are all-or-nothing. You cannot restrict an employee to viewing only their assigned tasks while hiding salary or margin figures in the next tab.
2. **Zero Audit Trail:** If a row disappears or a balance changes, spreadsheets cannot definitively show who made the edit, at what time, or from what IP address.
3. **Data Inconsistency:** One employee enters phone numbers as \`0712...\`, another as \`+254...\`, and another as \`712...\`. In a database-driven web application, strict validation normalizes data at entry.

### Structuring the Data Migration

Moving to a custom web portal does not mean discarding your historical data. A professional developer will:
- Clean and normalize existing spreadsheet records (removing duplicates, standardizing phone and date formats).
- Define a relational database schema (e.g. separating Customers from Invoices and Payments).
- Write automated migration scripts that ingest historical records into PostgreSQL or MySQL.
- Run reconciliation queries to ensure ending balances match between the old spreadsheet and the new database.

### Preserving Operational Familiarity

The secret to successful digital adoption is making the web portal feel natural to staff members who have used spreadsheets for years.

Incorporate clean data tables with instant keyboard search, multi-column sorting, and single-click CSV export. When staff members realize they can do their daily tasks in half the time without fear of breaking formulas, adoption is immediate and enthusiastic.
`,
  },
  {
    slug: "balancing-speed-and-maintainability-in-nextjs",
    title: "Balancing Speed and Long-Term Maintainability in Next.js Applications",
    excerpt:
      "How to build high-performance web applications that load quickly on mobile devices while keeping the codebase clean and manageable for years.",
    category: "Software Engineering",
    publishedAt: "August 29, 2026",
    readTime: "8 min read",
    author: "Lebby Software Solutions",
    tags: ["Next.js", "TypeScript", "Performance", "Clean Architecture"],
    tableOfContents: [
      { id: "the-architecture-choice", title: "The Architecture Choice" },
      { id: "server-components-vs-client-interactivity", title: "Server Components vs. Client Interactivity" },
      { id: "strict-typescript-contracts", title: "Strict TypeScript Contracts" },
      { id: "avoiding-dependency-bloat", title: "Avoiding Dependency Bloat" },
    ],
    content: `
Modern web engineering moves at a dizzying pace. New frameworks, styling systems, and component libraries emerge almost monthly. Yet for real client applications, the most critical engineering virtue is not novelty—it is long-term stability and maintainability.

Next.js with the App Router offers an exceptional foundation for building business platforms, but only if architected deliberately.

### The Architecture Choice

Building an application that will run reliably for the next five years requires disciplined boundaries between data access, business logic, and presentation.

Key architectural rules we enforce at Lebby Software Solutions:
- **Server-First Data Fetching:** Keep sensitive database queries and API secrets on the server. Never expose Prisma queries or private environment variables to client bundles.
- **Strict TypeScript Types:** Never use \`any\`. Use Zod schemas to validate form submissions on both client and server boundaries, ensuring runtime data matches compile-time types.
- **Semantic Components:** Build modular, reusable UI components rather than 800-line monolithic page files.

### Server Components vs. Client Interactivity

One of the greatest benefits of the modern React and Next.js paradigm is React Server Components (RSC). By rendering non-interactive content (layouts, article copy, headers, static cards) on the server, the browser receives lightweight HTML instead of megabytes of JavaScript.

Reserve the \`"use client"\` directive strictly for elements that truly require user interaction:
- Interactive modals and drawers
- Form state validation with active feedback
- Tab switchers and live search filters

This separation ensures the site feels lightning-fast even on budget smartphones connected to standard cellular networks.

### Strict TypeScript Contracts

When an application scales to tens of thousands of lines of code, TypeScript is your primary defense against regression bugs. Defining clear domain models—such as \`Invoice\`, \`Tenant\`, \`AttendanceRecord\`, or \`BatchSlip\`—ensures that if an API changes, every affected UI component is caught at build time before deployment.

### Avoiding Dependency Bloat

Every external npm library you add is code you did not write, must maintain, and could introduce breaking changes during future Node.js upgrades. 

Before running \`npm install\`, ask whether a 5-line native utility or CSS transition can accomplish the same goal without adding 200 kilobytes to your production bundle. Restraint in dependency selection is the hallmark of mature software engineering.
`,
  },
];
