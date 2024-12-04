// import { FieldHook } from 'payload/types';

import { Publication } from "@/payload-types";
import { FieldHook } from "payload";

const format = (val: string): string =>
  val
    .replace(/[ _]/g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

export const formatSlug =
  (fallback: keyof Publication): FieldHook<Publication> =>
  ({ operation, value, originalDoc, data }) => {
    if (typeof value === "string") {
      return format(value);
    }

    if (operation === "create") {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback];

      if (fallbackData && typeof fallbackData === "string") {
        return format(fallbackData);
      }
    }

    return value;
  };
