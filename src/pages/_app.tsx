import { AppProps } from "next/app";
import Head from "next/head";

import { Footer } from "@src/layouts/Footer";
import { Header } from "@src/layouts/Header";
import "@src/styles/globals/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="avatar/color_profile.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
