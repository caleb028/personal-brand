/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable X-Powered-By header to prevent technology fingerprinting (CWE-200)
  poweredByHeader: false,

  // OWASP Recommended Security Headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Mitigates Clickjacking attacks
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Prevents MIME-sniffing confusion
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Minimizes sensitive referrer leakage
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()", // Disables unused hardware APIs
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload", // Enforces HTTPS
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
