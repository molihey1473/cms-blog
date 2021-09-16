import Head from "next/head";
import { NextPage, GetStaticProps } from "next";
import posts from ".contents/posts.json";
import { Wrapper } from "@src/components/Wrapper";
//import { Wrapper } from "@src/components/Wrapper";
import { Profile } from "@src/components/cards/Profile";
import { BlogList, BlogFlatList } from "@src/components/BlogList";
import { CategoryList } from "@src/components/CategoryList";
import { member } from "@src/utils/member";
// get data methods
import { getBlogs } from "@src/lib/blog";
// SEO component
import { BlogSEO } from "@src/components/BlogSEO";

//types
import { ArticleItems } from "@src/types";

//interface Props {
//  allArticlesData: ArticleItems[];
//}
const Home: NextPage<{ allArticlesData: ArticleItems[]; category: string }> = (
  props
) => {
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
      <BlogSEO title={"MoliHey"} />
      <Wrapper>
        <Profile member={member} />
      </Wrapper>
      <Wrapper>
        <CategoryList />
      </Wrapper>
      <div className="all_container">
        <Wrapper>
          <h2 className="all_title">ALL</h2>
          <div className="all_items_container">
            {props.allArticlesData ? (
              <BlogFlatList items={props.allArticlesData} />
            ) : (
              <BlogList items={props.allArticlesData} />
            )}
          </div>
        </Wrapper>
      </div>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const data: { contents: ArticleItems[] } = await getBlogs();
  return {
    props: {
      allArticlesData: data.contents,
    },
  };
};
export default Home;
