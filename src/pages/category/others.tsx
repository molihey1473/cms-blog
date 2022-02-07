import Head from "next/head";
import { NextPage } from "next";
import posts from ".contents/posts.json";
import { Profile } from "@src/components/cards/Profile";
import { member } from "@src/utils/member";
import { CategoryList } from "@src/components/CategoryList";

import { PostList } from "@src/components/PostList";
// css style
import styles from "@src/styles/components/View.module.scss";
const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta property="og:title" content="MoliHey" />
        <meta
          property="og:url"
          content="https://blog-sage-nine.vercel.app/category/others"
        />
        <meta property="og:image" content="ogp/home-ogp.png" />
        <meta property="og:site_name" content="MoliHey" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Profile member={member} />
      <CategoryList />
      <div className={styles.page_others_container}>
        <h2 className={styles.page_content_title}>Others</h2>
        <div className={styles.others_items}>
          <PostList items={posts} />
        </div>
      </div>
    </>
  );
};
export default Page;
