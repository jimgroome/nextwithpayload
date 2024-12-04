import configPromise from "@payload-config";
import { getPayload, Locale, TypedLocale } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";

import type { Publication as PageType } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useRouter } from "next/navigation";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: "publications",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home";
    })
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
    locale?: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = "home", locale = "en" } = await paramsPromise;

  let page: PageType | null;

  page = await queryPageBySlug({
    slug,
    locale,
  });

  const { title, content } = page;

  return (
    <article className="pt-16 pb-24">
      <h1>{title}</h1>
      {!!content && <RichText data={content} />}
    </article>
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
