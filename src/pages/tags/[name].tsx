import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { WideWrapper } from "@src/components/WideWrapper";
import { BlogLink } from "@src/components/BlogList";
import { getTags } from "@src/lib/blog";
import { TaggedBlogList } from "@src/components/tags/TaggedBlogLIst";
import { TaggedBlogs } from "@src/types";
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
const Page: NextPage<{ taggedBlogs: Props }> = (props) => {
  return (
    <>
      <section className={styles.tagged_blog_list_layout}>
        <WideWrapper>
          <div className={styles.tagged_blog_content}>
            <div
              className={styles.tag_name}
            >{`#${props.taggedBlogs.name}`}</div>
            <div className={styles.tagged_blog_list}>
              {props.taggedBlogs.content.map((taggedBlog, i) => (
                <BlogLink key={`taggedBlog-${i}`} item={taggedBlog} />
              ))}
            </div>
          </div>
        </WideWrapper>
      </section>
    </>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getTags();
  //paths [name]tsx意外
  const paths =
    data.contents.map((content: { name: string; id: string }) => {
      //URL "/tags/[name]"の見た目をよくするため[name]を小文字、"."を消す。
      // [React, Vercel, Next.js]など
      const lowScaleName = content.name.replace(/\./g, "").toLowerCase();
      return `/tags/${lowScaleName}`;
      //return `/tags/${content.name.replace(/\./, "").toLowerCase()}`;
    }) || [];
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params.name as string;
  //tags CMSに関連した記事を抽出するため、再度、頭文字を大文字化
  const rename = name.charAt(0).toUpperCase();
  //idで抽出したデータではなく/tags/reactのようにnameで表示させる
  const data = await getTags(rename);
  //const preData = data.contents[0].content.map((item, i) => {
  //  console.log(item.title, item.publishedAt);
  //});
  return {
    props: {
      taggedBlogs: data.contents[0],
    },
  };
};
export default Page;
