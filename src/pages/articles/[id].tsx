import useWindowDimentions from "@src/hooks/useWindowDimensions";
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
//toc
import cheerio from "cheerio";
//シンタックスハイライト　heighlight.js
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
// scss modules
import styles from "@src/styles/pages/blog/BlogContent.module.scss";
//　props型
import { ArticleItems, TagItems } from "@src/types";
//記事内ヘッダー
import { ArticleHeader } from "@src/components/articles/header/HeaderLayout";
//header画像コンポーンネント
import { HeaderImage } from "@src/components/articles/header/HeaderImage";
//header 記事タイトルコンポーネント
import { HeaderTitle } from "@src/components/articles/header/HeaderTitle";

//sidebar目次コンポーネント
import { SidebarTocList } from "@src/components/articles/sidebar/SidebarToc";
//sidebar 関連タグリストコンポーネント
import { SidebarTagList } from "@src/components/articles/sidebar/Tag";
//article body 記事内要コンポーネント
import { ArticleBody } from "@src/components/articles/ArticleBody";
//aside用レイアウトコンポーネント
import { ArticleSidebar } from "@src/components/articles/sidebar/SidebarLayout";
//aside内sticky要素コンポーネントArticleWrapper
import { SidebarSticky } from "@src/components/articles/sidebar/SidebarSticky";
import { ArticleWrapper } from "@src/components/Wrapper";
//sns icon.svg
import { TwitterIcon } from "@src/components/icons/TwitterIcon";
interface Props {
  blog: ArticleItems;
  category: string;
  body: string;
  toc: TocList[];
  preview: boolean;
  latestArticles: ArticleItems[];
  cl: string;
  path?: string;
}
interface TocList {
  text: string;
  id: string;
  name: string;
}

const Blog: NextPage<Props> = (props) => {
  const { title, publishedAt, createdAt, updatedAt, tags, id, meta } =
    props.blog;
  const { body, category, cl, toc, preview, latestArticles } = props;
  //windowのサイズ用custom hook
  const { width, height } = useWindowDimentions();
  return (
    <>
      <BlogSEO title={title} id={id} image={cl} path={"/articles"} />
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
                <TocList toc={toc} />
                <ArticleBody body={body} />
                <div className={styles.article_share_container}>
                  <div className={styles.share_title}>Share</div>
                  <div className={styles.share_button_container}>
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
              </div>
            </div>
            {width <= 860 ? (
              <ArticleSidebar>
                <SidebarTagList tags={tags} />
                <SidebarSticky>
                  <SidebarTocList toc={toc} />
                </SidebarSticky>
              </ArticleSidebar>
            ) : (
              ""
            )}
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
  const paths =
    data.contents.map((content: { id: string }) => `/articles/${content.id}`) ??
    [];
  return {
    paths,
    fallback: "blocking",
  };
};
//静的生成用props
export const getStaticProps: GetStaticProps = async (context) => {
  const draftKey = context.previewData?.draftKey as string;
  const id = context.params?.id as string;
  //下書きpreview記事表示メソッド
  const data = await getPreview(id, draftKey);
  //最新記事表示data取得(0-5)
  const latestData = await getBlogs();
  //<h1>タグを目次用に抽出
  const $ = cheerio.load(data.body);
  const clContent = await clOverlay(data.title);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });
  //table of content
  const headings = $("h1, h2, h3").toArray();
  const tocData: TocList[] = headings.map((element: any): TocList => {
    return {
      text: element.children[0].data,
      id: element.attribs.id,
      name: element.name,
    };
  });
  return {
    props: {
      blog: data,
      category: data.category.name[0],
      body: $.html(),
      toc: tocData,
      preview: context.preview || false,
      latestArticles: latestData.contents,
      cl: clContent,
    },
  };
};
export default Blog;
