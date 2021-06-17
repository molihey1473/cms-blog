import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getCategory } from "@src/lib/blog";
import { Wrapper } from "@src/components/Wrapper";
import { BlogLink } from "@src/components/BlogLink";
interface Props {}
const page: NextPage = (props) => {
  return (
    <>
      <Wrapper>
        <div>
          <h1>{props.sortedDatas.name[0]}</h1>
        </div>
      </Wrapper>
    </>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getCategory();
  const paths =
    data.contents.map((content: { name: string }) => {
      const name = content.name[0];
      return `/category/${name}`;
    }) || [];
  console.log(paths);
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params.name as string;
  const data = await getCategory(name);
  console.log(data.contents[0]);
  return {
    props: {
      sortedDatas: data.contents[0],
    },
  };
};
export default page;
