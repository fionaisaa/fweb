import Head from "next/head";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
    children: ReactNode;
    name?: string;
}

export function MainLayout({ children, name }: Props) {
    return (
        <div>
            <Head>
                <title>{name || "Apulia Restaurant "}</title>
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
