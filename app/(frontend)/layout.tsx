import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Next with Payload",
  description: "Let's see what we can do with Next.js and Payload",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="p-4 w-full max-w-4xl ml-auto mr-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
