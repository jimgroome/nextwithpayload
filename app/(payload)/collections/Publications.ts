import { CollectionConfig } from "payload";
import { formatSlug } from "../util/formatSlug";

const Publications: CollectionConfig = {
  slug: "publications",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    { name: "title", type: "text", localized: true },
    { name: "previewContent", type: "richText", localized: true },
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

export default Publications;
