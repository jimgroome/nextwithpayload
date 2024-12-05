import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-row gap-2 justify-between mb-8">
      <h1 className="text-3xl">
        <Link href="/">Next with Payload</Link>
      </h1>
      <ul className="flex flex-row gap-2">
        <li>fhewl</li>
      </ul>
    </header>
  );
};

export default Header;
