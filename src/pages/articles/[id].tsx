import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { useRouter } from "next/router";

import { BlogSEO } from "@src/components/BlogSEO";

import { getAllArticles, getArticleContent } from "@src/lib/blog";
import { clOverlay } from "@src/lib/cl";

import { ArticleItems } from "@src/types/types";

import { getArticlePath } from "@src/utils/helper";
import { isDraft } from "@src/utils/isDraft";

import { ArticlePage } from "@src/features/articles";

interface Props {
  articleData: Readonly<ArticleItems>;
  readonly preview: boolean;
  readonly cl: string;
  readonly path: string;
}
interface Params extends ParsedUrlQuery {
  id: string;
}
//type Params = Pick<ArticleItems, "id">;
const Blog: NextPage<Props> = (props) => {
  const { title } = props.articleData;
  const { cl, preview, path, articleData } = props;
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BlogSEO title={title} image={cl} path={path} isSummaryLarge={true} />
      <ArticlePage preview={preview} articleData={articleData} />
    </>
  );
};
//[id].tsx 静的生成用パス
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: { contents: ArticleItems[] } = await getAllArticles();
  const paths = data.contents.map((content) => {
    return { params: { id: content.id } } || [];
  });
  return {
    paths,
    fallback: "blocking",
  };
};
//静的生成用props
export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { params, previewData } = context;
  const draftKey = isDraft(previewData) ? previewData?.draftKey : "";
  //const id = toStringId(params.id);
  const { id } = params as Params;
  //下書きpreview記事表示メソッド
  const data = await getArticleContent(id, draftKey);
  //OGP画像テキスト挿入 for cloudinary
  const clContent = await clOverlay(data.title);
  //記事のpath
  const path = getArticlePath(id);
  return {
    props: {
      articleData: data,
      preview: context.preview || false,
      cl: clContent,
      path: path,
    },
  };
};
export default Blog;
