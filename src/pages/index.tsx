import { NextPage, GetStaticProps } from "next";
import { Profile } from "@src/components/cards/Profile";
import { BlogList, BlogFlatList } from "@src/components/BlogList";
import { CategoryList } from "@src/components/CategoryList";
import { PageTitle } from "@src/components/PageTitle";
import { member } from "@src/utils/member";
// get data methods
import { getBlogs } from "@src/lib/blog";
// SEO component
import { BlogSEO } from "@src/components/BlogSEO";

//types
import { ArticleItems } from "@src/types";
// css style
import styles from "@src/styles/components/View.module.scss";

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
      <div className={styles.page_all_container}>
        <PageTitle title={"ALL"} />
        <div className={styles.all_items}>
          {!!props.allArticlesData ? (
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
