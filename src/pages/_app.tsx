import { AppProps } from "next/app";
import Head from "next/head";

import { Footer } from "@src/components/Footer";
import { Header } from "@src/components/Header";
import { ViewContainer } from "@src/components/View";
import { Wrapper } from "@src/components/Wrapper";

import "@src/styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/*<link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200&family=Noto+Sans+JP:wght@100&display=swap"
          rel="stylesheet"
        /> */}
        <link rel="icon" href="avatar/color_profile.png" />
      </Head>
      <Header />
      <ViewContainer>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ViewContainer>
      <Footer />
    </>
  );
}

export default MyApp;
