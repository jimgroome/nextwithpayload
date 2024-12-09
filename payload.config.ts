import sharp from "sharp";
import {
  EXPERIMENTAL_TableFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import {
  translator,
  copyResolver,
  openAIResolver,
} from "@payload-enchants/translator";
import { searchPlugin } from "@payloadcms/plugin-search";
import Publications from "./app/(payload)/collections/Publications";
import Admins from "./app/(payload)/collections/Admins";
import Users from "./app/(payload)/collections/Users";
import { deeplTranslate } from "./app/(payload)/util/deeplTranslate";

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
    translator({
      collections: ["publications"],
      globals: [],
      resolvers: [
        copyResolver(),
        deeplTranslate({
          apiKey: process.env.DEEPL_API_KEY!,
        }),
      ],
    }),
  ],
  i18n: {
    // supportedLanguages: { en },
    translations: {
      en: {
        "plugin-translator": {
          resolver_deepl_buttonLabel: "Deepl translate",
          resolver_deepl_errorMessage:
            "An error occurred when trying to translate the data",
          resolver_deepl_modalTitle: "Choose the locale to translate from",
          resolver_deepl_submitButtonLabelEmpty: "Translate only empty fields",
          resolver_deepl_submitButtonLabelFull: "Translate all",
          resolver_deepl_successMessage:
            'Successfully translated. Press "Save" to apply the changes.',
        },
      },
    },
  },
});
