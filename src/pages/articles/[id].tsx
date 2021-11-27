import { NextPage, GetStaticPaths, GetStaticProps } from "next";
//import { config } from "@blog.config";
import { PubDate, PreDate } from "@src/components/articles/header/ArticleDate";
//目次　toc
import { TocList } from "@src/components/articles/Toc";
import { getBlogs, getPreview } from "@src/lib/blog";
import { BlogLink } from "@src/components/BlogList";
import { HeaderTags } from "@src/components/articles/header/HeaderTag";
//SEOコンポーネント
import { BlogSEO } from "@src/components/BlogSEO";
//OGP画像生成メソッド
import { clOverlay } from "@src/lib/cl";
import { member } from "@src/utils/member";
import { isDraft } from "@src/utils/isDraft";
import { toStringId } from "@src/utils/toStringId";
import { Profile, AsideProfile } from "@src/components/cards/Profile";
// scss modules
import styles from "@src/styles/pages/blog/BlogContent.module.scss";
//　props型
import { ArticleItems } from "@src/types";
//記事内ヘッダー
import { ArticleHeader } from "@src/components/articles/header/HeaderLayout";
//header画像コンポーンネント
//import { HeaderImage } from "@src/components/articles/header/HeaderImage";
//header 記事タイトルコンポーネント
import { HeaderTitle } from "@src/components/articles/header/HeaderTitle";
/* 
 サイドバー用コンポーネント
 削除の可能性

 サイドバーresponsive custom hooks
 //import useWindowDimentions from "@src/hooks/useWindowDimensions";

//sidebar目次コンポーネント
import { SidebarTocList } from "@src/components/articles/sidebar/SidebarToc";
//sidebar 関連タグリストコンポーネント
import { SidebarTagList } from "@src/components/articles/sidebar/Tag";
//aside用レイアウトコンポーネント
import { ArticleSidebar } from "@src/components/articles/sidebar/SidebarLayout";
//aside内sticky要素コンポーネントArticleWrapper
import { SidebarSticky } from "@src/components/articles/sidebar/SidebarSticky";

*/

//article body 記事内要コンポーネント
import {
  ArticleBody,
  FixArticleBody,
} from "@src/components/articles/ArticleBody";

import { ArticleWrapper } from "@src/components/Wrapper";
//sns icon.svg
import { TwitterIcon } from "@src/components/icons/TwitterIcon";
interface Props {
  blog: ArticleItems;
  category: string;
  body: string;
  preview: boolean;
  latestArticles: ArticleItems[];
  cl: string;
  path?: string;
}
interface ArticleBodyItems {
  markdown: string;
  language?: string;
  code?: string;
}
//interface TocList {
//  text: string;
//  id: string;
//  name: string;
//}

const Blog: NextPage<Props> = (props) => {
  const { title, publishedAt, createdAt, updatedAt, tags, id, body } =
    props.blog;
  const { cl, preview, latestArticles } = props;
  return (
    <>
      <BlogSEO
        title={title}
        id={id}
        image={cl}
        path={"/articles"}
        isSummaryLarge={true}
      />
      <article className={styles.blog_article}>
        <ArticleWrapper>
          <div className={styles.blog_content_main}>
            <div className={styles.blog_content_layout}>
              <div className={styles.blog_content_article}>
                <ArticleHeader>
                  {preview && (
                    <a
                      href="/api/clearPreview"
                      className={styles.clear_preview_mode}
                    >
                      ** preview mode　解除 **
                    </a>
                  )}
                  {preview ? (
                    <PreDate createdAt={createdAt} updatedAt={updatedAt} />
                  ) : (
                    <PubDate publishedAt={publishedAt} updatedAt={updatedAt} />
                  )}
                  <HeaderTitle title={title} />
                  <HeaderTags tags={tags} />
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
          <div>
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
          </div>
        </ArticleWrapper>
      </article>
    </>
  );
};
//[id].tsx 静的生成用パス
export const getStaticPaths: GetStaticPaths = async () => {
  const data: { contents: ArticleItems[] } = await getBlogs();
  const paths = data.contents.map((content) => {
    return { params: { id: content.id } };
  });
  return {
    paths,
    fallback: "blocking",
  };
};
//静的生成用props
export const getStaticProps: GetStaticProps = async (context) => {
  const { params, previewData } = context;
  const draftKey = isDraft(previewData) ? previewData?.draftKey : "";
  const id = toStringId(params.id);
  //下書きpreview記事表示メソッド
  const data = await getPreview(id, draftKey);
  //最新記事表示data取得(0-5)
  const latestData = await getBlogs();
  //OGP画像テキスト挿入 for cloudinary
  const clContent = await clOverlay(data.title);
  return {
    props: {
      blog: data,
      //category: data.category.name[0],
      preview: context.preview || false,
      latestArticles: latestData.contents,
      cl: clContent,
    },
  };
};
export default Blog;
