import { NextPage, GetStaticProps } from "next";
import { getBlogs } from "@src/lib/blog";
import { BlogItem, TagItems } from "@src/types";
//import Link from "next/link";
import { WideWrapper } from "@src/components/WideWrapper";
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
        <WideWrapper>
          <CategoryList />
        </WideWrapper>
        <section className={styles.blog_list_layout}>
          <WideWrapper>
            <BlogList items={props.blogs} />
          </WideWrapper>
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
