"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const router = useRouter();

  const login = async () => {
    try {
      const req = await fetch("/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userDetails.email,
          password: userDetails.password,
        }),
      });

      const data = await req.json();

      if (!!data.user) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-2xl mb-2">Login</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await login();
        }}
        className="flex flex-col gap-2"
      >
        <input
          placeholder="Email"
          type="email"
          onChange={(event) =>
            setUserDetails({ ...userDetails, email: event.target.value })
          }
          value={userDetails.email}
          className="border border-gray-300"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(event) =>
            setUserDetails({ ...userDetails, password: event.target.value })
          }
          value={userDetails.password}
          className="border border-gray-300"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
