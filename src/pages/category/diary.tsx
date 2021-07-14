import Head from "next/head";
import { NextPage, GetStaticProps } from "next";
import { Profile } from "@src/components/cards/Profile";
import { member } from "@src/utils/member";
import { getCategory } from "@src/lib/blog";
import { Wrapper } from "@src/components/Wrapper";
import { BlogList } from "@src/components/BlogList";
import { CategoryList } from "@src/components/CategoryList";
//import styles from "@src/styles/pages/blog/BlogList.module.scss";

interface Props {
  name: string;
  content: {
    id: string;
    title: string;
    publishedAt: string;
    meta?: { image: { url: string } };
  }[];
}
const page: NextPage<{ sortedDatas: Props }> = (props) => {
  const pageTitle = "Diary";
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta property="og:title" content="MoliHey" />
        <meta
          property="og:url"
          content="https://blog-sage-nine.vercel.app/category/diary"
        />
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
      <div className="diary_container">
        <Wrapper>
          <h1 className="diary_title">{pageTitle}</h1>
          <div className="diary_items_container">
            <BlogList items={props.sortedDatas.content} />
          </div>
        </Wrapper>
      </div>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const path: string = "diary";
  const data = await getCategory(path);
  return {
    props: {
      sortedDatas: data.contents[0],
    },
  };
};
export default page;
