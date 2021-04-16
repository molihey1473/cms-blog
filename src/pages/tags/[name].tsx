import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getTags } from "@src/lib/blog";
const Page: NextPage = (props) => {
  return (
    <>
      <h1>タグ</h1>
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
  return { paths, fallback: true };
};
export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context);
  return {
    props: {},
  };
};
export default Page;
