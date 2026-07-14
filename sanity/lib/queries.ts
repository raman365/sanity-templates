import { groq } from "next-sanity";

const projectFields = groq`
  _id,
  title,
  "slug": slug.current,
  summary,
  coverImage,
  tags,
  client,
  date,
  location,
  link,
  linkLabel,
  featured
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    name,
    tagline,
    bio,
    profileImage,
    socialLinks[]{ label, url },
    aboutTitle,
    aboutText,
    aboutImage,
    stats[]{ value, label }
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, _createdAt asc){
    _id,
    title,
    description,
    icon
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc)[0...6]{
    ${projectFields}
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(featured desc, _createdAt desc){
    ${projectFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ${projectFields},
    body,
    gallery
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

export const experiencesQuery = groq`
  *[_type == "experience"] | order(startDate desc){
    _id,
    company,
    role,
    startDate,
    endDate,
    description,
    logo
  }
`;
