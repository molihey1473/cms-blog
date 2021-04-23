import "@src/styles/globals.scss";
import { Header } from "@src/components/Header";
import { Footer } from "@src/components/Footer";
import { AppProps } from "next/app";

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
