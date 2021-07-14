import Head from "next/head";
import { NextPage, GetStaticProps } from "next";
import { getCategory } from "@src/lib/blog";
import { Wrapper } from "@src/components/Wrapper";
import { Profile } from "@src/components/cards/Profile";
import { member } from "@src/utils/member";
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
const page: NextPage<{ sortedArticlesData: Props }> = (props) => {
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
        <CategoryList />
      </Wrapper>
      <div className="tech_container">
        <Wrapper>
          <h2 className="tech_title">{pageTitle}</h2>
          <div className="tech_items_container">
            <BlogList items={props.sortedArticlesData.content} />
          </div>
        </Wrapper>
      </div>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const path: string = "tech";
  const data = await getCategory(path);
  return {
    props: {
      sortedArticlesData: data.contents[0],
    },
  };
};
export default page;
