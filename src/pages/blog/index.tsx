import { NextPage, GetStaticProps } from "next";
import { getBlogs } from "@src/lib/blog";
import { BlogItem, TagItems } from "@src/types";
//import Link from "next/link";
import { Wrapper } from "@src/components/Wrapper";
import { BlogList } from "@src/components/BlogList";
import { CategoryList } from "@src/components/CategoryList";
import styles from "@src/styles/pages/blog/BlogList.module.scss";
interface Props {
  blogs: BlogItem[];
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
    contents: BlogItem[];
  } = await getBlogs();
  return {
    props: {
      blogs: data.contents,
    },
  };
};
export default page;
