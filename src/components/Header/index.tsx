import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import cs from "classnames";
import Logo from "@/assets/icons/logo.svg";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const items = [
        { name: "Home", pathName: "/" },
        { name: "About", pathName: "/about" },
        { name: "Contact us", pathName: "/contact" },
        { name: "Blogs", pathName: "/blogs" },
        { name: "News", pathName: "/news" },
        { name: "Sign in", pathName: "/sign-in" },
        { name: "Sign up", pathName: "/sign-up" },
        { name: "Dashboard", pathName: "/dashboard" },
        


    ];

    return (
        <div className="py-2 fixed z-50 bg-white border-b w-full transition-all duration-300">
            <div className="container m-auto flex items-center justify-between">
                <Link href="/">
                    <Image src={Logo} alt="Logo" width={30} height={30} className="h-10 w-[100px]" />
                </Link>

                <div className="flex-1 flex gap-10 items-center justify-center">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            href={item.pathName}
                            className={cs("text-black font-medium", {
                                "underline font-semibold": router.pathname === item.pathName,
                            })}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="flex gap-5">
                    {status === "authenticated" ? (
                        <>
                            <Link href="/dashboard" className="text-black font-medium">
                                Dashboard
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="text-black font-medium"
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in" className="text-black font-medium">
                                Sign in
                            </Link>
                            <Link href="/sign-up" className="text-black font-medium">
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
