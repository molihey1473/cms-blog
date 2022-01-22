import Head from "next/head";
import { NextPage } from "next";
import posts from ".contents/posts.json";
import { Profile } from "@src/components/cards/Profile";
import { member } from "@src/utils/member";
import { CategoryList } from "@src/components/CategoryList";

import { PostList } from "@src/components/PostList";
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
      <div className="others_container">
        <h2 className="others_title">Others</h2>
        <div className="others_items_container">
          <PostList items={posts} />
        </div>
      </div>
    </>
  );
};
export default Page;
