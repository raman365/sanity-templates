import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "A short description shown on project cards.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description: "The full project write-up.",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
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
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description:
        'Whatever fits your craft — e.g. "Renovation", "Oil on canvas", "Next.js".',
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      description: "Who the work was for (optional).",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "MMM YYYY" },
      description: "When the work was completed (optional).",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Oslo, Norway" (optional).',
    }),
    defineField({
      name: "link",
      title: "External link",
      type: "url",
      description:
        "Optional link related to this work — a live site, a listing, an article…",
    }),
    defineField({
      name: "linkLabel",
      title: "Link label",
      type: "string",
      description:
        'Button text for the external link, e.g. "Visit site", "View listing". Defaults to "View link".',
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured projects appear on the home page.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "summary", media: "coverImage" },
  },
});
