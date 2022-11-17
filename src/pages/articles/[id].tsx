import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { useRouter } from "next/router";

import { ArticleBody } from "@src/components/articles/ArticleBody";
import { Date } from "@src/components/articles/header/ArticleDate";
import { HeaderTags } from "@src/components/articles/header/HeaderTag";
import { HeaderTitle } from "@src/components/articles/header/HeaderTitle";
import { ArticleHeader } from "@src/components/articles/layouts/header";
import { ClearPreviewMode } from "@src/components/articles/preview/clearPreviewMode";
import { ShareArticle } from "@src/components/articles/social/ShareArticle";
import { BlogSEO } from "@src/components/BlogSEO";
import { AsideProfile } from "@src/components/cards/Profile";

import { getAllArticles, getArticleContent } from "@src/lib/blog";
import { clOverlay } from "@src/lib/cl";

import { ArticleItems } from "@src/types/types";

import { getArticlePath } from "@src/utils/helper";
import { isDraft } from "@src/utils/isDraft";
import { member } from "@src/utils/member";

import styles from "@src/styles/pages/blog/BlogContent.module.scss";

interface Props {
  blog: ArticleItems;
  preview: boolean;
  latestArticles: ArticleItems[];
  cl: string;
  path: string;
}
interface Params extends ParsedUrlQuery {
  id: string;
}
//type Params = Pick<ArticleItems, "id">;
const Blog: NextPage<Props> = (props) => {
  const { title, publishedAt, createdAt, updatedAt, tags, id, body } =
    props.blog;
  const { cl, preview, path } = props;
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BlogSEO title={title} image={cl} path={path} isSummaryLarge={true} />
      <article>
        <div className={styles.blog_content_main}>
          <div className={styles.blog_content_layout}>
            <div className={styles.blog_content_article}>
              <ArticleHeader>
                <ClearPreviewMode preview={preview} />
                <Date
                  preview={preview}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                  publishedAt={publishedAt}
                />
                <HeaderTitle title={title} />
                <HeaderTags tags={tags} />
              </ArticleHeader>
              <ArticleBody articleBody={body} />
              <ShareArticle title={title} id={id} />
              <aside className={styles.author_info}>
                <AsideProfile member={member} />
              </aside>
            </div>
          </div>
        </div>
      </article>
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
  //最新記事表示data取得(0-5)
  const latestData = await getAllArticles();
  //OGP画像テキスト挿入 for cloudinary
  const clContent = await clOverlay(data.title);
  //記事のpath
  const path = getArticlePath(id);
  return {
    props: {
      blog: data,
      //category: data.category.name[0],
      preview: context.preview || false,
      latestArticles: latestData.contents,
      cl: clContent,
      path: path,
    },
  };
};
export default Blog;
