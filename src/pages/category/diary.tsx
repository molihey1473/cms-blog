import Head from "next/head";
import { NextPage, GetStaticProps } from "next";
import { Profile } from "@src/components/cards/Profile";
import { member } from "@src/utils/member";
import { getCategory, getBlogs } from "@src/lib/blog";
import { Wrapper } from "@src/components/Wrapper";
import { BlogList, BlogFlatList } from "@src/components/BlogList";
import { CategoryFlatList } from "@src/components/CategoryList";
import { SortedArticleList } from "@src/types";
//import styles from "@src/styles/pages/blog/BlogList.module.scss";

const page: NextPage<{ sortedArticlesData: SortedArticleList[] }> = (props) => {
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
        <CategoryFlatList />
      </Wrapper>
      <div className="diary_container">
        <Wrapper>
          <h2 className="diary_title">{pageTitle}</h2>
          <div className="diary_items_container">
            <BlogFlatList items={props.sortedArticlesData} />
          </div>
        </Wrapper>
      </div>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const path: string = "diary";
  const preData: { contents: SortedArticleList[] } = await getBlogs();
  const data = preData.contents.filter((item: SortedArticleList) => {
    return item.category.name[0] === path;
  });

  return {
    props: {
      sortedArticlesData: data,
    },
  };
};
export default page;
