import Head from "next/head";
import { NextPage } from "next";
import { TwitterIcon } from "@src/components/icons/TwitterIcon";
import { Header } from "@src/components/Header";
import { Wrapper } from "@src/components/Wrapper";
import styles from "@src/styles/pages/Home.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <button>これはブログです</button>
      </main>
    </>
  );
};
export default Home;
