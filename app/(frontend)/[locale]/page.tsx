import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import { draftMode, headers as nextHeaders } from "next/headers";
import React, { cache } from "react";
import config from "@payload-config";

import Publications from "../components/Publications";
import SearchForm from "../components/SearchForm";
import LoginForm from "../components/LoginForm";
import Logout from "../components/Logout";
import RegisterForm from "../components/RegisterForm";

type Args = {
  params: Promise<{
    locale?: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = "en" } = await paramsPromise;

  const { publications, isLoggedIn } = await getPageData({
    locale,
  });

  const payload = await getPayload({ config });

  return (
    <>
      <Publications publications={publications} />
      <SearchForm />

      {isLoggedIn ? (
        <Logout />
      ) : (
        <>
          <RegisterForm />
          <LoginForm />
        </>
      )}
    </>
  );
}

const getPageData = cache(async ({ locale }: { locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode();

  const headers = await nextHeaders();

  const payload = await getPayload({ config: configPromise });

  const publications = await payload.find({
    collection: "publications",
    draft,
    limit: 5,
    locale: locale || "en",
    pagination: false,
    overrideAccess: draft,
  });

  const auth = await payload.auth({ headers });

  return { publications: publications.docs || null, isLoggedIn: !!auth.user };
});
