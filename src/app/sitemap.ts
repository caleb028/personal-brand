import { MetadataRoute } from "next";
import { siteConfig } from "@/content/siteConfig";
import { projects } from "@/content/projects";
import { insightArticles } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    "",
    "/about",
    "/services",
    "/projects",
    "/process",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const articlePages = insightArticles.map((article) => ({
    url: `${baseUrl}/insights/${article.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...articlePages];
}
