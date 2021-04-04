import { NextPage, GetStaticProps } from "next";
import { getBlog } from "@src/lib/blog";
import { Blog } from "@src/types";
import Link from "next/link";
import { Wrapper } from "@src/components/Wrapper";
import { BlogLink } from "@src/components/BlogLink";
import styles from "@src/styles/pages/blog/BlogList.module.scss";
const BlogItems: NextPage<{ blogs: Blog[] }> = (props) => {
  return (
    <>
      <head></head>
      <main>
        <section className={styles.blog_list_layout}>
          <Wrapper>
            <ul className={styles.blog_list}>
              {props.blogs.map((blog, i) => (
                <BlogLink key={`blog-link-${i}`} item={blog} />
              ))}
            </ul>
          </Wrapper>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: {
    contents: Blog[];
  } = await getBlog();
  return {
    props: {
      blogs: data.contents,
    },
  };
};
export default BlogItems;
