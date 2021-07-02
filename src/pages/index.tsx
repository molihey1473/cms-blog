import Head from "next/head";
import { NextPage } from "next";
import posts from ".contents/posts.json";
//import post from "@.contents/posts.json";
//import { TwitterIcon } from "@src/components/icons/TwitterIcon";
//import { Header } from "@src/components/Header";
import { WideWrapper } from "@src/components/WideWrapper";
import { Wrapper } from "@src/components/Wrapper";
import { Profile } from "@src/components/cards/Profile";
import { PostList } from "@src/components/PostList";
import { CategoryList } from "@src/components/CategoryList";
import { member } from "@src/utils/member";
import { PostItem } from "@src/types";
import styles from "@src/styles/pages/Home.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta property="og:title" content="MoliHey" />
        <meta property="og:url" content="https://blog-sage-nine.vercel.app/" />
        <meta property="og:image" content="ogp/home-ogp.png" />
        <meta property="og:site_name" content="MoliHey" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <section className={styles.home_profile}>
        <Wrapper>
          <Profile member={member} />
        </Wrapper>
      </section>
      <Wrapper>
        <CategoryList />
      </Wrapper>
      <section className={styles.home_posts}>
        <Wrapper>
          <div className={styles.home_section_title_content}>
            <h2 className={styles.home_section_title}>関連記事</h2>
          </div>
          <PostList items={posts} />
        </Wrapper>
      </section>
    </>
  );
};
export default Home;
