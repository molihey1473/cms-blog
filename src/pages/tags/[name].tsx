import { title } from "process";
import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { BlogFlatList } from "@src/components/BlogList";
import { BlogSEO } from "@src/components/BlogSEO";
import { TagTitle } from "@src/components/TagTitle";

import {
  getTags,
  getFilterArtilcleList,
  getFilterArticleList,
} from "@src/lib/blog";

import { TaggedList, Taglinks } from "@src/types/types";

import { getTagPath } from "@src/utils/helper";

import styles from "@src/styles/pages/blog/BlogList.module.scss";

import JsonData from "../../../.contents/posts.json";

interface Props {
  name: string;
  path: string;
  taggedBlogs: {
    id: string;
    title: string;
    publishedAt: string;
    tags: { name: string }[];
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
        <TagTitle title={title} />
        {taggedBlogs ? (
          <BlogFlatList items={taggedBlogs} />
        ) : (
          <div>関連した記事がありません</div>
        )}
      </div>
    </>
  );
};
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await getTags<Taglinks>();
  const paths = data.contents.map((items) => {
    const lowScaleName = items.name.replace(/\./g, "").toLowerCase();
    return { params: { name: lowScaleName } };
  }); //|| [];
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { params } = context;
  const { name } = params as Params;
  const rename = name.charAt(0).toUpperCase();
  const data = await getTags<TaggedList[]>(rename);
  const path = getTagPath(name);
  const list = await getFilterArticleList(name, JsonData);
  console.log(list);
  return {
    props: {
      name: name,
      taggedBlogs: data,
      path: path,
    },
  };
};
export default Page;
