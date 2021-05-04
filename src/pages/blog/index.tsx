import { NextPage, GetStaticProps } from "next";
import { getBlog } from "@src/lib/blog";
import { BlogItem } from "@src/types";
import Link from "next/link";
import { Wrapper } from "@src/components/Wrapper";
import { BlogLink } from "@src/components/BlogLink";
import styles from "@src/styles/pages/blog/BlogList.module.scss";
const BlogList: NextPage<{ blogs: BlogItem[] }> = (props) => {
  return (
    <>
      <main>
        <section className={styles.blog_list_layout}>
          <Wrapper>
            <div className={styles.blog_list}>
              {props.blogs.map((blog, i) => (
                <BlogLink key={`blog-link-${i}`} item={blog} />
              ))}
            </div>
          </Wrapper>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: {
    contents: BlogItem[];
  } = await getBlog();
  return {
    props: {
      blogs: data.contents,
    },
  };
};
export default BlogList;
