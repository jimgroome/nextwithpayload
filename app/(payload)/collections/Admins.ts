import { CollectionConfig } from "payload";
import { formatSlug } from "../util/formatSlug";

const Admins: CollectionConfig = {
  slug: "admins",
  admin: {
    useAsTitle: "email",
  },
  access: {
    admin: ({ req: { user } }) => {
      return Boolean(user);
    },
  },
  auth: true,
  fields: [],
};

export default Admins;
