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
  const paths =
    data.contents.map(
      (content) => `tags/${content.name.replace(/\./g, "").toLowerCase()}`
    ) || [];
  console.log(paths);
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
export default Page;
