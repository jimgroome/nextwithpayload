import { CollectionConfig, Access } from "payload";

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  access: {
    // Anyone can create a user
    create: () => true,
  },
  auth: true,
  fields: [],
};

export default Users;
