import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { BlogFlatItem } from "@src/components/BlogList";
//SEO コンポーネント
import { BlogSEO } from "@src/components/BlogSEO";
import { TwemojiP } from "@src/components/icons/Twemoji";

//twemoji
import { getTags } from "@src/lib/blog";

//import { TagList } from "@src/components/tags/TagList";
import { TaggedList, Taglinks } from "@src/types/types";

import { getTagPath } from "@src/utils/helper";
//import { toStringName } from "@src/utils/toStringTagName";

import styles from "@src/styles/pages/blog/BlogList.module.scss";

interface Props {
  name: string;
  path: string;
  taggedBlogs: {
    id: string;
    title: string;
    publishedAt: string;
  }[];
}
interface Params extends ParsedUrlQuery {
  name: string;
}
const Page: NextPage<Props> = (props) => {
  const { taggedBlogs, name, path } = props;
  return (
    <>
      <BlogSEO title={name} path={path} isSummaryLarge={false} />
      <div className={styles.tagged_blog_content}>
        <div className={styles.tag_name_container}>
          <div className={styles.tag_name}>
            <TwemojiP emoji={"✊"} />
            {`#${name}`}
          </div>
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
    </>
  );
};
export const getStaticPaths: GetStaticPaths<Params> = async () => {
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
export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { params } = context;
  const { name } = params as Params;
  //tags CMSに関連した記事を抽出するため、再度、頭文字を大文字化
  const rename = name.charAt(0).toUpperCase();
  //idで抽出したデータではなく/tags/reactのようにnameで表示させる
  const data = await getTags<TaggedList[]>(rename);
  //tags/[name].tsxのpath
  const path = getTagPath(name);
  //const preData = data.contents[0].content.map((item, i) => {
  //  console.log(item.title, item.publishedAt);

  //});
  return {
    props: {
      name: name,
      taggedBlogs: data,
      path: path,
    },
  };
};
export default Page;
