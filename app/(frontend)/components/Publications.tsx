"use client";

import { Publication } from "@/payload-types";
import { useParams } from "next/navigation";

const Publications = ({ publications }: { publications: Publication[] }) => {
  const params = useParams<{ locale: string }>();
  const { locale } = params;

  return (
    <div className="mb-4">
      <h2 className="mb-2 text-2xl">Publications</h2>
      {publications.length === 0 ? (
        <p>No publications found</p>
      ) : (
        <ul>
          {publications?.map((publication) => (
            <li key={publication.id}>
              <a href={`/${locale}/publications/${publication.slug}`}>
                {publication.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Publications;
