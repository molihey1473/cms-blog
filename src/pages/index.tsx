import Head from "next/head";
import { NextPage } from "next";
import posts from ".contents/posts.json";
import twemoji from "twemoji";
import { Wrapper } from "@src/components/Wrapper";
//import { Wrapper } from "@src/components/Wrapper";
import { Profile } from "@src/components/cards/Profile";
import { BlogList } from "@src/components/BlogList";
import { PostList } from "@src/components/PostList";
import { CategoryList } from "@src/components/CategoryList";
import { member } from "@src/utils/member";
//import { PostItem } from "@src/types";
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
      <Wrapper>
        <Profile member={member} />
      </Wrapper>
      <Wrapper>
        <CategoryList />
      </Wrapper>
      <div className={styles.all_container}>
        <Wrapper>
          <h2 className={styles.all_title}>ALL</h2>
          <div className={styles.all_item_container}>
            <PostList items={posts} />
          </div>
        </Wrapper>
      </div>
    </>
  );
};
export default Home;
