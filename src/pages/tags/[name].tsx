import { NextPage, GetStaticPaths, GetStaticProps } from "next";
const Page: NextPage = (props) => {
  return (
    <>
      <h1>タグ</h1>
    </>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {};
};
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};
export default Page;
