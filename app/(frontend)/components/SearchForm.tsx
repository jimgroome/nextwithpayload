"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchForm = () => {
  const params = useParams<{ locale: string }>();
  const { locale } = params;
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <div className="mb-4">
      <h2 className="text-2xl mb-2">Search</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          router.push(`/${locale}/search/${searchTerm}`);
        }}
        autoComplete="off"
        className="flex gap-2"
      >
        <input
          type="text"
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
          className="border border-gray-300"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
