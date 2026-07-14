import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Your full name, shown in the hero and site header.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "One line describing what you do.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description: "A short paragraph about you, shown on the home page.",
    }),
    defineField({
      name: "profileImage",
      title: "Profile image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g. "GitHub", "LinkedIn", "X", "Email"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https", "mailto"] }),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "aboutTitle",
      title: "About — heading",
      type: "string",
      group: "about",
      description: 'e.g. "Who we are", "About me". Leave empty to hide the About section.',
    }),
    defineField({
      name: "aboutText",
      title: "About — text",
      type: "text",
      rows: 6,
      group: "about",
      description: "One or two paragraphs. Separate paragraphs with a blank line.",
    }),
    defineField({
      name: "aboutImage",
      title: "About — image",
      type: "image",
      group: "about",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alternative text", type: "string" }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "about",
      description: "Small headline numbers shown in the About section (optional).",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: 'e.g. "12+", "150", "24h"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g. "Years", "Projects delivered"',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
  ],
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "about", title: "About & stats" },
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", media: "profileImage" },
  },
});
