"use client";

import { Publication } from "@/payload-types";
import { useParams } from "next/navigation";

const Publications = ({ publications }: { publications: Publication[] }) => {
  const params = useParams<{ locale: string }>();
  const { locale } = params;

  return (
    <div>
      <h1>Publications</h1>
      {publications?.map((publication) => (
        <h2 key={publication.id}>
          <a href={`/${locale}/publications/${publication.slug}`}>
            {publication.title}
          </a>
        </h2>
      ))}
    </div>
  );
};

export default Publications;
