import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getTags } from "@src/lib/blog";
import { TaggedBlogs } from "@src/types";
import { BlogLink } from "@src/components/BlogLink";
const Page: NextPage<{ taggedBlogs: TaggedBlogs[] }> = (props) => {
  return (
    <>
      <h1>テスト</h1>
      <div>
        <ul>
          {props.taggedBlogs.map((taggedBlog, i) => (
            <li key={i}>{taggedBlog.content[i].title}</li>
          ))}
        </ul>
      </div>
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
  return { paths, fallback: true };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params.name as string;
  //tags CMSに関連した記事を抽出するため、再度、頭文字を大文字化
  const rename = name.charAt(0).toUpperCase();
  const data = await getTags(rename);
  const content = data.contents.map((item, i) => {
    console.log(item.content[0].title);
  });
  return {
    props: {
      taggedBlogs: data.contents,
    },
  };
};
export default Page;
