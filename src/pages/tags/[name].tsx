import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { PageSEO } from "@src/components/PageSEO";

import { getTags } from "@src/lib/blog";

import { Taglinks } from "@src/types/types";

import { getTagPath } from "@src/utils/helper";

import { RelationalArticleListPage } from "@src/features/RelationalArticleList";
import { PageView } from "@src/layouts/PageView";
import { PageWrapper } from "@src/layouts/PageWrapper";

//import JsonData from "../../../.contents/posts.json";

//interface Props {
//  name: string;
//  path: string;
//  articleList: {
//    id: string;
//    title: string;
//    publishedAt: string;
//    tags: { name: string }[];
//  }[];
//}
interface Params extends ParsedUrlQuery {
  name: string;
}
const Page: NextPage<{ name: string; path: string }> = (props) => {
  const { name, path } = props;
  return (
    <>
      <PageSEO title={name} path={path} isSummaryLarge={false} />
      <PageView>
        <PageWrapper>
          <RelationalArticleListPage name={name} path={path} />
        </PageWrapper>
      </PageView>
    </>
  );
};
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await getTags<Taglinks>();
  console.log(data);
  const paths = data.contents.map((items) => {
    const lowScaleName = items.name.replace(/\./g, "").toLowerCase();
    return { params: { name: lowScaleName } };
  }); //|| [];
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps<
  { name: string; path: string },
  Params
> = async (context) => {
  const { params } = context;
  const { name } = params as Params;
  //const rename = name.charAt(0).toUpperCase();
  //const data = await getTags<TaggedList[]>(rename);
  const path = getTagPath(name);
  //const list = await getFilterArticleList(name, JsonData);
  //console.log(list);
  return {
    props: {
      name: name,
      path: path,
    },
  };
};
export default Page;
