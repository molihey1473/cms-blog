import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Wrapper } from "@src/components/Wrapper";
import { BlogLink, BlogFlatItem } from "@src/components/BlogList";
//twemoji
import twemoji from "twemoji";
import { getTags } from "@src/lib/blog";
//import { TagList } from "@src/components/tags/TagList";
import { TaggedBlogs, Taglinks, TaggedList } from "@src/types";
import { toStringName } from "@src/utils/toStringTagName";
import styles from "@src/styles/pages/blog/BlogList.module.scss";
interface Props {
  name: string;
  taggedBlogs: {
    id: string;
    title: string;
    publishedAt: string;
  }[];
}
const Page: NextPage<Props> = (props) => {
  const { taggedBlogs, name } = props;
  return (
    <>
      <section className={styles.tagged_blog_list_layout}>
        <Wrapper>
          <div className={styles.tagged_blog_content}>
            <div className={styles.tag_name_container}>
              <div
                dangerouslySetInnerHTML={{
                  __html: twemoji.parse("🏷", {
                    folder: "svg",
                    ext: ".svg",
                  }),
                }}
              />
              <div className={styles.tag_name}>{`#${name}`}</div>
            </div>
            {taggedBlogs ? (
              <div className={styles.tagged_blog_list}>
                {taggedBlogs.map((taggedBlog, i) => (
                  <BlogFlatItem
                    key={`taggedBlog-${i}`}
                    item={taggedBlog}
                    isTagIncluded={false}
                  />
                ))}
              </div>
            ) : (
              <div>関連した記事がありません</div>
            )}
          </div>
        </Wrapper>
      </section>
    </>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getTags<Taglinks>();
  //paths [name]tsx意外
  const paths =
    data.contents.map((items) => {
      //URL "/tags/[name]"の見た目をよくするため[name]を小文字、"."を消す。
      // [React, Vercel, Next.js]など
      const lowScaleName = items.name.replace(/\./g, "").toLowerCase();
      return { params: { name: lowScaleName } };
      //return lowScaleName;
      //return `/tags/${content.name.replace(/\./, "").toLowerCase()}`;
    }) || [];
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = toStringName(params.name);
  //tags CMSに関連した記事を抽出するため、再度、頭文字を大文字化
  const rename = name.charAt(0).toUpperCase();
  //idで抽出したデータではなく/tags/reactのようにnameで表示させる
  const data = await getTags<TaggedList[]>(rename);
  //const preData = data.contents[0].content.map((item, i) => {
  //  console.log(item.title, item.publishedAt);
  //});
  return {
    props: {
      name: name,
      taggedBlogs: data,
    },
  };
};
export default Page;
