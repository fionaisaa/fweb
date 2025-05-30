import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import cs from "classnames";
import Logo from "@/assets/icons/logo.svg";
import { signOut, useSession } from "next-auth/react";


////ndarje
export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const items = [
    { name: "Home", pathName: "/" },
    { name: "About", pathName: "/about" },
    { name: "Contact us", pathName: "/contact" },
    { name: "Blogs", pathName: "/blogs" },
    { name: "News", pathName: "/news" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-[#fff8f2] border-b shadow-sm py-3">
      <div className="container mx-auto flex items-center justify-between px-6">
        
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={30} height={30} className="w-10 h-10" />
          <span className="text-[#7B3F00] font-bold text-xl tracking-wide"></span>
        </Link>

      
        <nav className="hidden md:flex gap-8">
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
        </nav>

       
        <div className="flex gap-4 items-center">
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
