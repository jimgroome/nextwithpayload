import sharp from "sharp";
import {
  EXPERIMENTAL_TableFeature,
  lexicalEditor,
  LinkFeature,
} from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import Publications from "./app/(payload)/collections/Publications";
import { searchPlugin } from "@payloadcms/plugin-search";
import Admins from "./app/(payload)/collections/Admins";
import Users from "./app/(payload)/collections/Users";

export default buildConfig({
  admin: {
    user: "admins",
  },
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor({
    features: ({ defaultFeatures, rootFeatures }) => [
      ...defaultFeatures,
      EXPERIMENTAL_TableFeature(),
      // TableFeatureClient({

      // }),
      // LinkFeature,
    ],
  }),
  // Define and configure your collections in this array
  collections: [Publications, Admins, Users],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "French",
        code: "fr",
      },
    ], // required
    defaultLocale: "en", // required
  },
  plugins: [
    searchPlugin({
      collections: ["publications"],
      defaultPriorities: {
        publications: 10,
      },
    }),
  ],
});
