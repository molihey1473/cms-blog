import "@src/styles/globals.scss";
import { Header } from "@src/components/Header";
import { Footer } from "@src/components/Footer";
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@1,600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
