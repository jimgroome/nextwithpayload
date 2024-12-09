import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import { draftMode, headers as nextHeaders } from "next/headers";
import React, { cache } from "react";

import type { Publication as PublicationType } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import { removeGatedContent } from "@/app/(frontend)/util/removeGatedContent";
import LoginForm from "@/app/(frontend)/components/LoginForm";

export interface PageProps {
  pageContent?: {
    title?: string | null;
    previewContent?: SerializedEditorState<SerializedLexicalNode> | null;
    content?: SerializedEditorState<SerializedLexicalNode> | null;
  } | null;
}

type Args = {
  params: Promise<{
    slug?: string;
    locale?: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = "home", locale = "en" } = await paramsPromise;

  let page: PageProps;

  page = await queryPageBySlug({
    slug,
    locale,
  });

  const { pageContent } = page;

  if (!pageContent) {
    return null;
  }

  const { title, previewContent, content } = pageContent;

  return (
    <section className="flex flex-col mt-auto mb-auto">
      <h1 className="text-3xl mb-2">{title}</h1>
      {!!previewContent && <RichText data={previewContent} />}

      {!!content ? (
        <RichText data={content} />
      ) : (
        <>
          <p>Please log in to see the rest of this publication.</p>
          <LoginForm />
        </>
      )}
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

    return {
      pageContent:
        result && result.docs.length
          ? await removeGatedContent(result.docs[0])
          : null,
    };
  }
);
