"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const SearchForm = () => {
  const params = useParams<{ locale: string }>();
  const { locale } = params;
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <div>
      <h1>Search</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.push(`/${locale}/search/${searchTerm}`);
        }}
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
