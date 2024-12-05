import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";

import type { Publication as PublicationType } from "@/payload-types";
import Publications from "../components/Publications";
import SearchForm from "../components/SearchForm";

type Args = {
  params: Promise<{
    locale?: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = "en" } = await paramsPromise;

  let publications: PublicationType[] | null;

  publications = await queryPublications({
    locale,
  });

  return (
    <>
      <Publications publications={publications} />
      <SearchForm />
    </>
  );
}

const queryPublications = cache(async ({ locale }: { locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "publications",
    draft,
    limit: 5,
    locale: locale || "en",
    pagination: false,
    overrideAccess: draft,
  });

  return result.docs || null;
});
