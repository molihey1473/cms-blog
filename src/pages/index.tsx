import { GetStaticProps, NextPage } from "next";

import { BlogFlatList, BlogList } from "@src/components/BlogList";
import { BlogSEO } from "@src/components/BlogSEO";
import { Profile } from "@src/components/cards/Profile";
import { CategoryList } from "@src/components/CategoryList";
import { PageTitle } from "@src/components/PageTitle";

import { getAllArticles } from "@src/lib/blog";

import { ArticleItems } from "@src/types/types";

import { member } from "@src/utils/member";

import styles from "@src/styles/components/View.module.scss";

const Home: NextPage<{ allArticlesData: ArticleItems[]; category: string }> = (
  props
) => {
  return (
    <>
      <BlogSEO title={"MoliHey"} isSummaryLarge={true} />
      <Profile member={member} />
      <CategoryList />
      <div className={styles.page_all_container}>
        <PageTitle title={"ALL"} />
        <div className={styles.all_items}>
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
  const data: { contents: ArticleItems[] } = await getAllArticles();
  return {
    props: {
      allArticlesData: data.contents,
    },
  };
};
export default Home;
