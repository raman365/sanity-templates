import type { PortableTextBlock } from "next-sanity";

export interface SanityImage {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
  alt?: string;
  caption?: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  name?: string;
  tagline?: string;
  bio?: string;
  profileImage?: SanityImage;
  socialLinks?: SocialLink[];
}

export interface Project {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  body?: PortableTextBlock[];
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  tech?: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Experience {
  _id: string;
  company?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  logo?: SanityImage;
}
