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
      <BlogSEO title="MoliHey" isSummaryLarge={true} />
      <Profile member={member} />
      <CategoryList />
      <div className="all_container">
        <h2 className="all_title">ALL</h2>
        <div className="all_items_container">
          {props.allArticlesData ? (
            <BlogFlatList items={props.allArticlesData} />
          ) : (
            <BlogList items={props.allArticlesData} />
          )}
        </div>
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
