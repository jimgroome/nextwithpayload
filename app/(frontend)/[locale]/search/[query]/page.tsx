import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";

import type { Publication as PublicationType } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

type Args = {
  params: Promise<{
    query?: string;
    locale?: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { query = "home", locale = "en" } = await paramsPromise;

  let results: PublicationType[] | null;

  results = await getSearchResults({
    query,
    locale,
  });

  return (
    <section className="flex flex-col mt-auto mb-auto">
      <h1 className="text-3xl mb-2">Search results</h1>
      <ul>
        {results?.length === 0 && <li>No results found</li>}
        {results?.map((result) => (
          <li key={result.id}>
            <a href={`/${locale}/publications/${result.slug}`}>
              {result.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const getSearchResults = cache(
  async ({ query, locale }: { query: string; locale: TypedLocale }) => {
    const { isEnabled: draft } = await draftMode();

    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "publications",
      draft,
      locale: locale || "en",
      pagination: false,
      overrideAccess: draft,
      where: {
        or: [
          {
            title: {
              contains: query,
            },
          },
          {
            content: {
              contains: query,
            },
          },
        ],
      },
    });

    return result.docs || null;
  }
);
