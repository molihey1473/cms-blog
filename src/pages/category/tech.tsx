import { NextPage, GetStaticProps } from "next";
import { getCategory } from "@src/lib/blog";
import { WideWrapper } from "@src/components/WideWrapper";
import { BlogLink } from "@src/components/BlogList";
import { CategoryList } from "@src/components/CategoryList";
import styles from "@src/styles/pages/blog/BlogList.module.scss";

interface Props {
  name: string;
  content: {
    id: string;
    title: string;
    publishedAt: string;
    meta?: { image: { url: string } };
  }[];
}
const page: NextPage<{ sortedDatas: Props }> = (props) => {
  const pageTitle = "Tech";
  return (
    <>
      <WideWrapper>
        <CategoryList />
      </WideWrapper>
      <section className={styles.blog_list_layout}>
        <WideWrapper>
          <div>
            <h1>{pageTitle}</h1>
          </div>
          <div className={styles.blog_list}>
            {props.sortedDatas.content.map((blog, i) => (
              <BlogLink key={`blog-link-${i}`} item={blog} />
            ))}
          </div>
        </WideWrapper>
      </section>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const path: string = "tech";
  const data = await getCategory(path);
  return {
    props: {
      sortedDatas: data.contents[0],
    },
  };
};
export default page;
