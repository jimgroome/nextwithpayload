import { Publication } from "@/payload-types";
import configPromise from "@payload-config";
import { headers as nextHeaders } from "next/headers";
import { getPayload } from "payload";

export const removeGatedContent = async (publication: Publication) => {
  const headers = await nextHeaders();
  const payload = await getPayload({ config: configPromise });
  const auth = await payload.auth({ headers });

  if (!auth.user) {
    return { ...publication, content: null };
  }

  return publication;
};
