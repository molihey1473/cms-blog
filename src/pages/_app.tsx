import { AppProps } from "next/app";

import { Footer } from "@src/layouts/Footer";
import { Header } from "@src/layouts/Header";
import "@src/styles/globals/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
