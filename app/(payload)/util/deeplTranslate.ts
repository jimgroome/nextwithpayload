import * as deepl from "deepl-node";
import type {
  TranslateResolver,
  TranslateResolverArgs,
} from "@payload-enchants/translator/resolvers/types";

export interface DeeplResolverConfig {
  apiKey: string;
  chunkLength?: number;
}

export const chunkArray = <T>(array: T[], length: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / length) }, (_, i) =>
    array.slice(i * length, i * length + length)
  );
};

const deeplTranslate = ({
  apiKey,
  chunkLength = 100,
}: DeeplResolverConfig): TranslateResolver => ({
  key: "deepl",
  resolve: async (args: TranslateResolverArgs) => {
    const translator = new deepl.Translator(apiKey);

    const { localeFrom, localeTo, req, texts } = args as {
      localeFrom: deepl.TargetLanguageCode;
      localeTo: deepl.TargetLanguageCode;
      req: any;
      texts: string[];
    };

    const translatedTexts = await Promise.all(
      chunkArray(texts, chunkLength).map(async (q) => {
        const results = await Promise.all(
          q.map(async (text) => {
            const result = await translator.translateText(text, null, localeTo);
            return result.text;
          })
        );

        return results;
      })
    );

    return {
      success: true,
      translatedTexts: translatedTexts.flat(),
    };
  },
});

export { deeplTranslate };
