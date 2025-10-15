import { defineField } from "sanity";

export const IMAGE_UPLOAD_HELP_TEXT = "For best results, upload images in 16:9 aspect ratio (1920x1080px recommended).";

interface ImageFieldOptions {
  name: string;
  title: string;
  description?: string;
  required?: boolean;
  hotspot?: boolean;
  includeAlt?: boolean;
  includeCaption?: boolean;
  includeGrayscale?: boolean;
  grayscaleDefault?: boolean;
}

export function createImageField({
  name,
  title,
  description,
  required = false,
  hotspot = false,
  includeAlt = false,
  includeCaption = false,
  includeGrayscale = false,
  grayscaleDefault = false,
}: ImageFieldOptions) {
  const fields = [];

  if (includeAlt) {
    fields.push({
      name: "alt",
      type: "string",
      title: "Alternative Text",
      description: "Important for accessibility and SEO",
    });
  }

  if (includeCaption) {
    fields.push({
      name: "caption",
      type: "string",
      title: "Caption",
      description: "Optional caption for the image",
    });
  }

  if (includeGrayscale) {
    fields.push({
      name: "isGrayscale",
      type: "boolean",
      title: "Apply Grayscale Filter",
      description: "Apply grayscale filter to the image",
      initialValue: grayscaleDefault,
    });
  }

  return defineField({
    name,
    title,
    type: "image",
    description,
    options: {
      hotspot,
    },
    fields: fields.length > 0 ? fields : undefined,
    validation: required ? (Rule) => Rule.required() : undefined,
  });
}