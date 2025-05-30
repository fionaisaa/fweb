import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";

export default function Footer() {
    return (
        <div className="border-t">
            <div className="container mx-auto py-7 flex items-center justify-between">
                <Link href="/">
                    <img className="h-10" src={Logo} alt="Logo" />
                </Link>
                <p className="text-gray-600">All rights reserved - MyCompanyName.</p>
            </div>
        </div>
    );
}