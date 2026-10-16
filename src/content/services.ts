export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  targetAudience: string;
  deliverables: string[];
  keyBenefits: string[];
  technologiesUsed: string[];
  processSummary: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: "01",
    slug: "website-design-development",
    title: "Website Design & Development",
    shortDescription:
      "Modern, responsive, and performance-focused websites for businesses, professionals, and organizations.",
    fullDescription:
      "A company website is often the first touchpoint for your prospective clients, partners, and investors. We design and build clean, fast, and search-optimized websites that clearly articulate your value proposition, build genuine credibility, and convert visitors into qualified business inquiries.",
    targetAudience:
      "Established businesses, professional service practices (law firms, medical clinics, consultancies), educational institutions, and emerging companies seeking a serious online presence.",
    deliverables: [
      "Custom responsive interface design tailored to your brand identity",
      "Semantic Next.js architecture with fast Core Web Vitals performance",
      "On-page SEO optimization with metadata, structured schema, and sitemaps",
      "Interactive inquiry forms with instant validation and email delivery",
      "Clear call-to-action pathways optimized for business inquiries",
      "Cross-browser testing across mobile, tablet, and desktop viewports",
    ],
    keyBenefits: [
      "Delivers an immediate impression of professional credibility",
      "Loads in under 1.5 seconds on modern mobile networks",
      "Easy to maintain without fragile visual page-builders",
      "Built-in accessibility following WCAG 2.2 AA standards",
    ],
    technologiesUsed: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Semantic HTML5", "Vercel / Cloud Hosting"],
    processSummary:
      "We begin by understanding your business offerings and target customers, draft a clean wireframe structure, develop responsive components, and thoroughly test before deploying to your custom domain.",
  },
  {
    id: "02",
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    shortDescription:
      "Purpose-built applications that streamline workflows, organize information, and improve operational efficiency.",
    fullDescription:
      "Off-the-shelf software often forces your business to adapt its internal processes to generic constraints. We engineer custom web applications designed specifically around your exact operational workflows, eliminating data silos, reducing manual repetition, and giving your team complete operational control.",
    targetAudience:
      "Growing companies, SMEs outgrowing spreadsheets, service providers managing multi-step client journeys, and organizations needing proprietary software systems.",
    deliverables: [
      "Modular full-stack web application with secure user authentication",
      "Role-based access control (Admin, Manager, Staff, Client portals)",
      "Centralized operational database with strict integrity constraints",
      "Real-time data filtering, search, sorting, and reporting views",
      "Automated notification triggers (email, SMS, in-app alerts)",
      "Comprehensive data export utilities (CSV, Excel, printable PDF)",
    ],
    keyBenefits: [
      "Eliminates hours wasted on repetitive spreadsheet reconciliation",
      "Provides transparent audit trails for every business action",
      "Enables your staff to work securely from any location or device",
      "Scales seamlessly as your transaction volume and headcount expand",
    ],
    technologiesUsed: ["Next.js App Router", "Node.js", "TypeScript", "PostgreSQL", "Prisma ORM", "REST APIs", "Redis"],
    processSummary:
      "We map your current business processes, identify bottlenecks, design database schemas and user workflows, build iteratively with regular milestones, and conduct end-user validation before rollout.",
  },
  {
    id: "03",
    slug: "ecommerce-development",
    title: "E-Commerce Development",
    shortDescription:
      "Online stores, product catalogs, ordering systems, and payment integrations designed for modern businesses.",
    fullDescription:
      "We build robust e-commerce solutions that make purchasing effortless for your customers and order fulfillment straightforward for your team. From custom product catalogs with real-time inventory tracking to reliable local payment gateways (such as Safaricom Daraja M-Pesa) and international credit card processors.",
    targetAudience:
      "Retailers, manufacturers, distributors, specialty merchants, and digital product creators looking to sell goods directly online without prohibitive marketplace commissions.",
    deliverables: [
      "Fast, mobile-optimized product catalog and discovery interface",
      "Frictionless checkout experience with guest checkout support",
      "Direct payment gateway integration (M-Pesa STK push, Card, Stripe)",
      "Real-time inventory deduction and low-stock alerts",
      "Automated order confirmation receipts and customer SMS notifications",
      "Administrative order management dashboard with fulfillment tracking",
    ],
    keyBenefits: [
      "Captures spontaneous mobile sales with instant M-Pesa STK prompts",
      "Zero monthly percentage fees taken by third-party storefront platforms",
      "Complete ownership of customer purchase history and contact data",
      "Reliable idempotent payment handlers that prevent duplicate charges",
    ],
    technologiesUsed: ["Next.js", "TypeScript", "Safaricom Daraja API", "Stripe", "PostgreSQL", "Tailwind CSS"],
    processSummary:
      "We structure your product categories and variants, implement secure payment webhooks with reconciliation queues, test payment edge cases, and train your team on order fulfillment workflows.",
  },
  {
    id: "04",
    slug: "business-management-systems",
    title: "Business Management Systems",
    shortDescription:
      "Custom administrative platforms for schools, retailers, service providers, and other organizations.",
    fullDescription:
      "Managing complex organizational operations requires software tailored to specific institutional models. We develop specialized administrative software—such as school management platforms (academics, fee ledgers, CBE grading), rental management ledgers, clinic records, and grain mill batch tracking systems—that reflect your exact operational rules.",
    targetAudience:
      "Primary and secondary schools, property management firms, agribusiness millers, manufacturing plants, health clinics, and institutional service providers.",
    deliverables: [
      "Multi-tenant or dedicated institutional operations platform",
      "Double-entry financial accounting and fee ledger modules",
      "Branded document generation (official report cards, receipts, statements)",
      "Regulatory and sector-specific grading or compliance engines",
      "Automated scheduling and conflict detection tools",
      "Executive governance and board-level reporting dashboards",
    ],
    keyBenefits: [
      "Custom-fitted to Kenyan institutional regulations and standards",
      "Eliminates financial leakages through automated payment matching",
      "Protects sensitive institutional data through granular access permissions",
      "Reduces administrative reporting cycles from days to minutes",
    ],
    technologiesUsed: ["Next.js", "Prisma ORM", "PostgreSQL", "TypeScript", "PDF Generation", "Role-Based ACL", "Docker"],
    processSummary:
      "We immerse ourselves in your institutional workflow, define domain models (e.g. CBC strands or property leases), build secure administrative portals, and deliver phased staff onboarding.",
  },
  {
    id: "05",
    slug: "api-systems-integration",
    title: "API & Systems Integration",
    shortDescription:
      "Connecting applications, databases, payment services, and external platforms to support smoother operations.",
    fullDescription:
      "Disparate software tools that do not communicate create unnecessary manual work and synchronization delays. We engineer robust, secure API integrations that connect your existing business tools, payment gateways, messaging networks, third-party logistics, and accounting packages into a unified, automated ecosystem.",
    targetAudience:
      "Businesses using multiple disjointed tools (CRM, accounting, SMS gateways, payment providers) that require automated data flow between platforms.",
    deliverables: [
      "Custom RESTful and webhook integration microservices",
      "Safaricom Daraja C2B and B2C automated settlement handlers",
      "SMS and WhatsApp Business automated messaging integrations",
      "Automated data synchronization between internal databases and third-party tools",
      "Resilient retry mechanisms with failure logging and dead-letter queues",
      "Clear technical API documentation for internal and external developers",
    ],
    keyBenefits: [
      "Eliminates human data re-entry between systems",
      "Guarantees real-time visibility across operational channels",
      "Idempotent design prevents duplicate records or double-charging",
      "Secure webhook validation with HMAC signatures and IP whitelisting",
    ],
    technologiesUsed: ["Node.js", "REST APIs", "Daraja M-Pesa", "Africa's Talking Gateway", "Webhooks", "PostgreSQL"],
    processSummary:
      "We audit API specifications for both endpoints, create robust sandbox test environments, implement idempotent webhook handlers with error-retry buffers, and monitor live telemetry.",
  },
  {
    id: "06",
    slug: "maintenance-technical-support",
    title: "Website Maintenance & Technical Support",
    shortDescription:
      "Ongoing improvements, updates, troubleshooting, and technical assistance for supported projects.",
    fullDescription:
      "Software requires proactive care to stay secure, fast, and aligned with evolving business requirements. We provide reliable maintenance partnerships for our clients, ensuring software updates, security patch application, database backups, uptime monitoring, and rapid troubleshooting whenever technical issues arise.",
    targetAudience:
      "Organizations and business owners who rely on their digital platforms for day-to-day revenue or operations and want dependable technical stewardship.",
    deliverables: [
      "Scheduled dependency updates and critical security patches",
      "Automated database backup routines with tested recovery protocols",
      "Uptime and performance monitoring with rapid incident response",
      "Continuous optimization of search engine indexing and Core Web Vitals",
      "Feature enhancements and UI refinements based on client feedback",
      "Direct technical liaison for domain, DNS, and hosting queries",
    ],
    keyBenefits: [
      "Peace of mind knowing a dedicated software engineer oversees your system",
      "Minimizes downtime and prevents costly security vulnerabilities",
      "Predictable support arrangements without unexpected emergency fees",
      "Continuously improving system value through incremental updates",
    ],
    technologiesUsed: ["Git & GitHub", "Vercel / Cloud Platforms", "PostgreSQL Backups", "Sentry / Error Tracking", "DNS / SSL Management"],
    processSummary:
      "We establish a structured support agreement, configure automated system telemetry and backup routines, and provide dedicated channels for routine requests and priority resolution.",
  },
];
