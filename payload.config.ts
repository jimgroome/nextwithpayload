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
  editor: lexicalEditor({
    features: ({ defaultFeatures, rootFeatures }) => [
      ...defaultFeatures,
      EXPERIMENTAL_TableFeature(),
    ],
  }),
  collections: [Publications, Admins, Users],
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
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
    ],
    defaultLocale: "en",
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
        deeplTranslate({
          apiKey: process.env.DEEPL_API_KEY!,
        }),
      ],
    }),
  ],
  i18n: {
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
