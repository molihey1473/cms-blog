import { NextPage } from "next";

//import { BlogFlatList, BlogList } from "@src/components/BlogList";
//import { Profile } from "@src/components/cards/Profile";
//import { CategoryList } from "@src/components/CategoryList";
//import { PageSEO } from "@src/components/PageSEO";
//import { PageTitle } from "@src/components/PageTitle";

//import { getAllArticles } from "@src/lib/blog";

import { ArticleItems } from "@src/types/types";

import { TopPage } from "@src/features/Top";
//import { PageView } from "@src/layouts/PageView";
//import { PageWrapper } from "@src/layouts/PageWrapper";
//import { member } from "@src/utils/member";

//import styles from "@src/styles/components/View.module.scss";

const Home: NextPage<{
  articleListData: ArticleItems[];
  category: string;
}> = () => {
  return (
    // <>
    //   <PageSEO title={"MoliHey"} isSummaryLarge={true} />
    //   <Profile member={member} />{ }
    //   <CategoryList />
    //   <div className={styles.page_all_container}>
    //     <PageTitle title={"ALL"} />
    //     <div className={styles.all_items}>
    //       {props.allArticlesData ? (
    //         <BlogFlatList items={props.allArticlesData} />
    //       ) : (
    //         <BlogList items={props.allArticlesData} />
    //       )}
    //     </div>
    //   </div>
    // </>
    <>
      <TopPage />
    </>
  );
};
//export const getStaticProps: GetStaticProps = async () => {
//  const data: { contents: ArticleItems[] } = await getAllArticles();
//  return {
//    props: {
//      articleListData: data.contents,
//    },
//  };
//};
export default Home;
