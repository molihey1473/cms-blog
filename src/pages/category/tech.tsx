import Head from "next/head";
import { NextPage, GetStaticProps } from "next";
import { getCategory, getBlogs } from "@src/lib/blog";
import { Wrapper } from "@src/components/Wrapper";
import { Profile } from "@src/components/cards/Profile";
import { member } from "@src/utils/member";
import { BlogList, BlogFlatList } from "@src/components/BlogList";
import { CategoryFlatList } from "@src/components/CategoryList";
import { BlogItem, SortedArticleList } from "@src/types";

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
const page: NextPage<{ sortedArticlesData: SortedArticleList[] }> = (props) => {
  const pageTitle = "Tech";
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta property="og:title" content="MoliHey" />
        <meta
          property="og:url"
          content="https://blog-sage-nine.vercel.app/category/tech"
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
      <div className="tech_container">
        <Wrapper>
          <h2 className="tech_title">{pageTitle}</h2>
          <div className="tech_items_container">
            <BlogFlatList items={props.sortedArticlesData} />
          </div>
        </Wrapper>
      </div>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const path = "tech";
  //const data = await getCategory(path);
  const data = await getBlogs(path);

  return {
    props: {
      sortedArticlesData: data,
    },
  };
};
export default page;
