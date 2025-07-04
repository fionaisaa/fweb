import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import cs from "classnames";
import Logo from "@/assets/icons/logo.svg";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const items = [
    { name: "Home", pathName: "/" },
    { name: "About", pathName: "/about" },
    { name: "Contact us", pathName: "/contact" },
    { name: "Blogs", pathName: "/blogs" },
    { name: "Locations", pathName: "/locations" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-[#fff8f2] border-b shadow-sm py-3">
      <div className="container mx-auto flex items-center px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={30} height={30} className="w-10 h-10" />
          
        </Link>

        {/* Navigation menu on the right */}
        <nav className="hidden md:flex gap-8 items-center ml-auto relative">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.pathName}
              className={cs(
                "text-[#7B3F00] hover:text-[#D2691E] transition-all font-medium",
                {
                  "underline font-semibold text-[#D2691E]": router.pathname === item.pathName,
                }
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-[#7B3F00] hover:text-[#D2691E] font-medium focus:outline-none"
            >
              More ▾
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50">
                <Link
                  href="/gallery"
                  className="block px-4 py-2 text-sm text-[#7B3F00] hover:bg-[#fff8f2] hover:text-[#D2691E]"
                >
                  Gallery
                </Link>
                <Link
                  href="/news"
                  className="block px-4 py-2 text-sm text-[#7B3F00] hover:bg-[#fff8f2] hover:text-[#D2691E]"
                >
                  News
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex gap-4 items-center ml-6">
          {status === "authenticated" ? (
            <>
              <Link
                href="/dashboard"
                className="text-[#7B3F00] hover:text-[#D2691E] font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-[#D2691E] text-white px-4 py-2 rounded hover:bg-[#b85d1b] transition"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="bg-[#D2691E] text-white px-4 py-2 rounded hover:bg-[#b85d1b] transition"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="bg-[#D2691E] text-white px-4 py-2 rounded hover:bg-[#b85d1b] transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
