"use client";

import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.refresh();
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      <button className="button" onClick={() => logout()}>
        Log out
      </button>
    </div>
  );
};

export default Logout;
