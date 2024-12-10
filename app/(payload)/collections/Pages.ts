import { CollectionConfig } from "payload";
import { formatSlug } from "../util/formatSlug";

const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "_status", "updatedAt"],
  },
  fields: [
    { name: "title", type: "text", localized: true },
    { name: "gated", type: "checkbox", defaultValue: false },
    {
      name: "previewContent",
      type: "richText",
      localized: true,
      admin: {
        condition: (data) => data.gated,
      },
    },
    { name: "content", type: "richText", localized: true },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      index: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
  ],
};

export default Pages;
