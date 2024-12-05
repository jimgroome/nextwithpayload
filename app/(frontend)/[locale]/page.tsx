import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";

import type { Publication as PublicationType } from "@/payload-types";
import Publications from "../components/Publications";

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
    <div className="flex flex-col min-h-screen items-center">
      <section className="flex flex-col mt-auto mb-auto">
        <Publications publications={publications} />
      </section>
    </div>
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
