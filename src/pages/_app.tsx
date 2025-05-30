import { MainLayout } from "@/components/MainLayout";
import { NewsProvider } from "@/lib/contexts/NewsContext";
import '@/styles/globals.css';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const title = pageProps.title || "My Platform";
  const description = pageProps.description || "My Platform Description";
  const image = pageProps.image || "https://my-domain/meta.svg";
  const url = pageProps.url || "https://my-domain";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="url" content={url} />
        <meta name="image" content={image} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:image" content={image} />
      </Head>
      <SessionProvider>
      <MainLayout>
        <NewsProvider>
        <Component {...pageProps} />
        </NewsProvider>
      </MainLayout>
      </SessionProvider>
    </>
  );
}