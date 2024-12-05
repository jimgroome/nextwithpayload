import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";

import type { Publication as PublicationType } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";

type Args = {
  params: Promise<{
    slug?: string;
    locale?: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = "home", locale = "en" } = await paramsPromise;

  let page: PublicationType | null;

  page = await queryPageBySlug({
    slug,
    locale,
  });

  const { title, content } = page;

  return (
    <section className="flex flex-col mt-auto mb-auto">
      <h1 className="text-3xl mb-2">{title}</h1>
      {!!content && <RichText data={content} />}
    </section>
  );
}

const queryPageBySlug = cache(
  async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
    const { isEnabled: draft } = await draftMode();

    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "publications",
      draft,
      limit: 1,
      locale: locale || "en",
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return result.docs?.[0] || null;
  }
);
