import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getCategory } from "@src/lib/blog";
import { WideWrapper } from "@src/components/WideWrapper";
import { BlogLink } from "@src/components/BlogList";
import { CategoryList } from "@src/components/CategoryList";
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
  const pageTitle =
    props.sortedDatas.name[0].charAt(0).toUpperCase() +
    props.sortedDatas.name[0].slice(1);
  return (
    <>
      <section>
        <WideWrapper>
          <CategoryList />
        </WideWrapper>
        <WideWrapper>
          <div>
            <h1>{pageTitle}</h1>
          </div>
        </WideWrapper>
      </section>
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
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params.name as string;
  const data = await getCategory(name);
  return {
    props: {
      sortedDatas: data.contents[0],
    },
  };
};
export default page;
