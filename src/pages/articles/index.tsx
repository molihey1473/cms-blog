import { GetStaticProps, NextPage } from "next";

import { BlogList } from "@src/components/BlogList";
import { CategoryList } from "@src/components/CategoryList";
import { Wrapper } from "@src/components/Wrapper";

import { getAllArticles } from "@src/lib/blog";

import { ArticleItems } from "@src/types/types";

import styles from "@src/styles/pages/blog/BlogList.module.scss";

interface Props {
  blogs: ArticleItems[];
}
const page: NextPage<Props> = (props) => {
  return (
    <>
      <main>
        <Wrapper>
          <CategoryList />
        </Wrapper>
        <section className={styles.blog_list_layout}>
          <Wrapper>
            <BlogList items={props.blogs} />
          </Wrapper>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: {
    contents: ArticleItems[];
  } = await getAllArticles();
  return {
    props: {
      blogs: data.contents,
    },
  };
};
export default page;
