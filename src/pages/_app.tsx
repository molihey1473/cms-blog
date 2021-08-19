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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200&family=Noto+Sans+JP:wght@100&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="avatar/color_profile.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
