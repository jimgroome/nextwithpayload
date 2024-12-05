import { CollectionConfig } from "payload";
import { formatSlug } from "../util/formatSlug";

const Admins: CollectionConfig = {
  slug: "admins",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [],
};

export default Admins;
