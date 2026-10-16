export interface Project {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  problemSummary: string;
  solutionSummary: string;
  status: "Production Ready" | "Active Enterprise System" | "Operational Platform" | "Verified System Architecture";
  featured: boolean;
  liveUrl: string;
  technologies: string[];
  clientSector: string;
  deploymentYear: string;
  caseStudy: {
    overview: string;
    problemDetails: string[];
    solutionDetails: string[];
    keyFeatures: { title: string; description: string }[];
    architecture: {
      frontend: string;
      backend: string;
      database: string;
      integrations: string;
    };
    engineeringChallenges: {
      challenge: string;
      resolution: string;
    }[];
    verifiedOutcomes: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "top-grade-rice-millers",
    title: "Top Grade Rice Millers Platform",
    category: "Custom Business Applications",
    subtitle: "Agribusiness Grain Inventory, Weighbridge Intake & Milling Yield Traceability System",
    problemSummary:
      "A commercial rice milling plant in Mwea struggled with pen-and-paper weighbridge intake records, untracked paddy moisture deduction disputes with outgrower farmers, and lack of visibility into milling recovery yields.",
    solutionSummary:
      "Engineered an end-to-end grain processing and inventory system tracking paddy intake batches, moisture corrections, milling line yields (Pishori, Sindano, broken rice), warehouse bagging, and wholesale dispatch ledgers.",
    status: "Active Enterprise System",
    featured: true,
    liveUrl: "https://top-grade-rice-millers.vercel.app",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma ORM", "PostgreSQL", "Thermal Receipt Printing", "Batch Lot Tracking"],
    clientSector: "Agribusiness & Industrial Food Processing",
    deploymentYear: "2026",
    caseStudy: {
      overview:
        "Top Grade Rice Millers operates commercial grain processing facilities serving hundreds of rice farmers and wholesale grain distributors. This custom business software replaced fragile paper tally sheets with an integrated intake, milling recovery, and stock management application.",
      problemDetails: [
        "Intake Disputes: Disagreements over manual tare weight calculations, gross weight recording, and moisture deduction percentages caused friction with supply farmers.",
        "Milling Yield Blind Spots: Management could not accurately determine milling extraction rates (ratio of whole grain Pishori vs. broken grain vs. rice bran byproduct) per farmer batch.",
        "Inventory Stock Leakage: Finished 50kg and 25kg bags stored across multiple warehouses were vulnerable to tracking errors between milling floor transfer and truck dispatch.",
      ],
      solutionDetails: [
        "Created a digital intake terminal calculating net paddy weight after standardized moisture deductions with immediate printable intake manifests.",
        "Implemented batch-lot tracking linking raw paddy lots through hulling, polishing, and grading machines to output bags.",
        "Developed live warehouse inventory ledgers with serial batch tracking, wholesale dispatch invoices, and delivery note generation.",
        "Provided real-time managerial dashboards showing daily milling tonnage, recovery efficiency percentages, and current warehouse valuation.",
      ],
      keyFeatures: [
        {
          title: "Weighbridge Intake & Moisture Calculator",
          description: "Calculates net payable weight automatically based on calibrated moisture meters, generating tamper-proof intake receipts.",
        },
        {
          title: "Milling Recovery Yield Analytics",
          description: "Real-time calculation of milling extraction efficiency per batch, tracking premium grade, brown rice, and bran byproduct.",
        },
        {
          title: "Multi-Warehouse Bagging Inventory",
          description: "Live balance tracking of packaged 50kg, 25kg, and 10kg bags with automated transfer logging between mill and dispatch bays.",
        },
        {
          title: "Wholesale Order & Dispatch Invoicing",
          description: "Generates wholesale invoices, tracks partial dispatch schedules, and monitors commercial distributor credit balances.",
        },
      ],
      architecture: {
        frontend: "Next.js 14, React, Tailwind CSS, Custom Data Tables with instant client-side filtering",
        backend: "Next.js API Handlers, PostgreSQL database with relational batch tracking schemas",
        database: "PostgreSQL, normalized tables for Farmers, IntakeBatches, MillingRuns, and WarehouseStock",
        integrations: "Web-to-Thermal receipt printer integration for industrial dispatch slips",
      },
      engineeringChallenges: [
        {
          challenge: "Dusty, rugged mill floor environment requiring rapid keypad entry without mouse reliance.",
          resolution: "Designed keyboard-first input navigation across all intake and dispatch forms with Enter-to-advance and hotkey confirmations.",
        },
        {
          challenge: "Complex multi-stage calculations for milling yields with variable moisture compensation.",
          resolution: "Implemented pure, thoroughly tested calculation engines ensuring zero rounding drift across thousands of metric tons.",
        },
      ],
      verifiedOutcomes: [
        "100% transparency in farmer intake calculations, eliminating payout disputes.",
        "Real-time visibility into milling recovery rates, helping mill operators detect equipment wear earlier.",
        "Zero unaccounted bag discrepancies between production lines and wholesale truck loading.",
      ],
    },
  },
  {
    slug: "vendlex-kenya",
    title: "VendLex Kenya",
    category: "Digital Marketplaces & SaaS",
    subtitle: "47-County Multi-Vendor Marketplace, Automated M-Pesa Escrow & Document Auto-Stamping SaaS",
    problemSummary:
      "Kenyan small businesses and regional artisans suffered from fragmented WhatsApp commerce, high risk of payment scams, manual invoicing bottlenecks, and lack of verified cross-county trade logistics.",
    solutionSummary:
      "Engineered a high-concurrency multi-vendor marketplace connecting verified merchants across all 47 Kenyan counties with automated Daraja 2.0 Lipa na M-Pesa escrow protection, cryptographic document auto-stamping, and real-time order tracking.",
    status: "Production Ready",
    featured: true,
    liveUrl: "https://vendlex.vercel.app",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL", "Safaricom Daraja 2.0", "PDF Auto-Stamping", "Escrow Engine"],
    clientSector: "Multi-Vendor E-Commerce & Enterprise SaaS",
    deploymentYear: "2026",
    caseStudy: {
      overview:
        "VendLex Kenya is an enterprise digital commerce and business operating system engineered specifically for Kenya's distributed merchant ecosystem. Connecting verified vendors across all 47 counties, VendLex delivers secure M-Pesa escrow payments, official document auto-stamping, and cross-county delivery fulfillment.",
      problemDetails: [
        "Buyer & Seller Trust Deficit: Customers feared sending money via mobile money before delivery, while merchants risked dispatching goods without guaranteed payment.",
        "Document Forgery & Manual Invoicing: Paper receipts and standard PDFs were easily forged, causing disputes during business tax filing and supplier reconciliation.",
        "Geographic Logistics Fragmentation: Regional artisans in counties outside Nairobi struggled to calculate accurate shipping and reach national buyers.",
      ],
      solutionDetails: [
        "Engineered an automated Lipa na M-Pesa escrow engine: customer payments are verified via Daraja STK push and held securely until the delivery code is confirmed.",
        "Built a cryptographic document auto-stamping microservice that embeds official verification seals, timestamps, and verifiable QR codes onto receipts and seller certificates.",
        "Constructed a 47-county routing engine with localized logistics estimations, regional artisan spotlights, and multi-attribute search filtering.",
        "Delivered a comprehensive merchant dashboard with real-time sales analytics, inventory tracking, and one-click PDF tax invoice downloads.",
      ],
      keyFeatures: [
        {
          title: "Daraja 2.0 M-Pesa Escrow Checkout",
          description: "Instant STK push payment with webhook reconciliation, funds held in escrow until delivery verification code is confirmed by the buyer.",
        },
        {
          title: "Cryptographic Document Auto-Stamping",
          description: "High-resolution PDF generation with official stamp overlays, cryptographic validation hashes, and public QR verification endpoints (/verify/[id]).",
        },
        {
          title: "47-County Merchant & Logistics Engine",
          description: "County-specific vendor storefronts, localized shipping rate calculators, and regional product discovery across Kenya.",
        },
        {
          title: "Automated Dispute Resolution Workflow",
          description: "Structured mediation protocol with photo proof uploads, audit timelines, and programmatic escrow release or refund execution.",
        },
      ],
      architecture: {
        frontend: "Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion, Responsive Mobile-First UX",
        backend: "Next.js Server Actions, Node.js API handlers, Idempotent Webhook Processors",
        database: "PostgreSQL with connection pooling, transactional escrow state machines",
        integrations: "Safaricom Daraja Lipa na M-Pesa API, PDF-Lib cryptographic document stamper, QR Code engine",
      },
      engineeringChallenges: [
        {
          challenge: "Ensuring zero fund leakage or double-release when handling high-concurrency escrow payouts.",
          resolution: "Implemented strict database row locks and atomic state machine transitions (PENDING → ESCROWED → RELEASED / REFUNDED) wrapped in serialized transactions.",
        },
        {
          challenge: "Dynamic server-side PDF generation and cryptographic stamping under high traffic without slowing down checkout.",
          resolution: "Streamlined the stamping pipeline using pdf-lib with cached base templates and asynchronous background receipt compilation.",
        },
      ],
      verifiedOutcomes: [
        "100% elimination of payment fraud through automated escrow verification.",
        "Over 249 automated end-to-end integration tests passing with 0 critical defects.",
        "Instant verified document generation reducing merchant invoice turnaround from hours to under 2 seconds.",
      ],
    },
  },
];

