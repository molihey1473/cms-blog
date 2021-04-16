import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getTags } from "@src/lib/blog";
import { TaggedBlogs } from "@src/types";
const Page: NextPage<{ taggedBlogs: TaggedBlogs[] }> = (props) => {
  return (
    <>
      <h1>テスト</h1>
      <div>
        <ul>
          {props.taggedBlogs.map((taggedBlog, i) => (
            <li key={i}>{taggedBlog.title}</li>
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
      return `/tags/${content.id}`;
      //return `/tags/${content.name.replace(/\./, "").toLowerCase()}`;
    }) || [];
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id as string;
  const data = await getTags(id);
  return {
    props: {
      taggedBlogs: data.content,
    },
  };
};
export default Page;
