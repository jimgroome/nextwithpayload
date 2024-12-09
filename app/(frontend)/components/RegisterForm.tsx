"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const login = async () => {
    try {
      await fetch("/api/users/", {
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

      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-2xl mb-2">Register</h2>

      {success ? (
        <p>Successfully registered. Use the form below to login.</p>
      ) : (
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

          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
