import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import Link from "next/link";

import { FixArticleBody } from "@src/components/articles/ArticleBody";
import { PreDate, PubDate } from "@src/components/articles/header/ArticleDate";
import { ArticleHeader } from "@src/components/articles/header/HeaderLayout";
import { HeaderTags } from "@src/components/articles/header/HeaderTag";
import { HeaderTitle } from "@src/components/articles/header/HeaderTitle";
import { BlogSEO } from "@src/components/BlogSEO";
import { AsideProfile } from "@src/components/cards/Profile";
import { TwitterIcon } from "@src/components/icons/TwitterIcon";

import { getBlogs, getPreview } from "@src/lib/blog";
import { clOverlay } from "@src/lib/cl";

import { ArticleItems } from "@src/types/types";

import { getArticlePath } from "@src/utils/helper";
import { isDraft } from "@src/utils/isDraft";
import { member } from "@src/utils/member";
//import { toStringId } from "@src/utils/toStringId";

import styles from "@src/styles/pages/blog/BlogContent.module.scss";

interface Props {
  blog: ArticleItems;
  //category: string;
  //body: string;
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
  return (
    <>
      <BlogSEO title={title} image={cl} path={path} isSummaryLarge={true} />
      <article className={styles.blog_article}>
        <div className={styles.blog_content_main}>
          <div className={styles.blog_content_layout}>
            <div className={styles.blog_content_article}>
              <ArticleHeader>
                {preview && (
                  <Link href={"/api/clearPreview"}>
                    <a className={styles.clear_preview_mode}>
                      ** preview mode 解除 **
                    </a>
                  </Link>
                )}
                {preview ? (
                  <PreDate createdAt={createdAt} updatedAt={updatedAt} />
                ) : (
                  <PubDate publishedAt={publishedAt} updatedAt={updatedAt} />
                )}
                <HeaderTitle title={title} />
                {tags && <HeaderTags tags={tags} />}
              </ArticleHeader>
              <FixArticleBody articleBody={body} />
              <div className={styles.article_share_container}>
                <div className={styles.share_button_container}>
                  <div className={styles.share_title}>Share</div>
                  <a
                    className={styles.share_button}
                    href={`http://twitter.com/share?url=https://blog-sage-nine.vercel.app/articles/${id}.tsx&text=${encodeURI(
                      title
                    )}`}
                  >
                    <TwitterIcon />
                  </a>
                </div>
              </div>
              <aside className={styles.author_info}>
                <AsideProfile member={member} />
              </aside>
            </div>
          </div>
        </div>

        {/*<div>
          <section className={styles.latestArticles_layout}>
            <div className={styles.latestArticles_title}>最近の記事</div>
            <div className={styles.latestArticles_list}>
              {latestArticles &&
                latestArticles
                  .slice(0, 3)
                  .map((latestBlog, i) => (
                    <BlogLink key={`latest-blog-${i}`} item={latestBlog} />
                  ))}
            </div>
          </section>
                  </div>*/}
      </article>
    </>
  );
};
//[id].tsx 静的生成用パス
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: { contents: ArticleItems[] } = await getBlogs();
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
  const data = await getPreview(id, draftKey);
  //最新記事表示data取得(0-5)
  const latestData = await getBlogs();
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
