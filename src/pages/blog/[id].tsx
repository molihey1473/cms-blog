import { WideWrapper } from "@src/components/Wrapper";
//import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
//blog config
//import { config } from "@blog.config";
import { PubDate, PreDate } from "@src/components/articles/ArticleDate";
import { getBlogs, getPreview } from "@src/lib/blog";
import { BlogLink } from "@src/components/BlogList";
import { Tags, TaggedList } from "@src/components/tags/tagItems";
import { SidebarProfile } from "@src/components/SidebarProfile";
//twemoji
import twemoji from "twemoji";
//SEOコンポーネント
import { BlogSEO } from "@src/components/BlogSEO";
//OGP画像生成メソッド
import { clOverlay } from "@src/lib/cl";
//toc
import cheerio, { CheerioParserOptions } from "cheerio";
//シンタックスハイライト　heighlight.js
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
//日付表示
import dayjs from "dayjs";
// scss modules
import styles from "@src/styles/pages/blog/BlogContent.module.scss";
//　props型
import { BlogItem, TagItems } from "@src/types";
// react hooks
//import { useRef, useCallback } from "react";
interface Props {
  blog: BlogItem;
  category: string;
  body: string;
  toc: TocList[];
  preview: boolean;
  latestArticles: BlogItem[];
  cl: string;
  path?: string;
}
interface TocList {
  text: string;
  id: string;
  name: string;
}
const Blog: NextPage<Props> = (props) => {
  const { title, publishedAt, createdAt, updatedAt, tags, id } = props.blog;
  const body = props.body;
  const category = props.category;
  //cloudinry で生成したOGPデータ
  const cl = props.cl;
  //目次データ
  const toc = props.toc;
  //公開前、下書き記事用props
  const preview = props.preview;
  //最新記事
  const latestArticles = props.latestArticles;
  return (
    <>
      <BlogSEO title={title} id={id} image={cl} path="/blog" />
      <article className={styles.blog_article}>
        <WideWrapper>
          <div className={styles.blog_content_main}>
            <section className={styles.blog_content_layout}>
              <div className={styles.blog_content_article}>
                <div>
                  <img
                    src={
                      props.blog.meta.image.url ||
                      "https://images.microcms-assets.io/assets/f94653ed008f4b178eaa8ae1659f31fe/b76bebf3e1ee41f69266c82bb713f989/MORIHEY%E3%81%AE%E3%83%95%E3%82%99%E3%83%AD%E3%82%AF%E3%82%99.png"
                    }
                    alt={`${title}-image`}
                  />
                </div>

                <PreDate createdAt={createdAt} updatedAt={updatedAt} />

                <PubDate publishedAt={publishedAt} />

                {preview && (
                  <a
                    href="/api/clearPreview"
                    className={styles.clear_preview_mode}
                  >
                    ** preview mode　解除 **
                  </a>
                )}
                {preview ? (
                  <div className={styles.blog_content_article_at}>
                    <span className={styles.blog_content_article_at_list}>
                      <time>
                        作成日：{dayjs(createdAt).format("YYYY/MM/DD")}
                      </time>
                    </span>
                    <span className={styles.blog_content_article_at_list}>
                      <time>
                        更新日:{dayjs(updatedAt).format("YYYY/MM/DD")}
                      </time>
                    </span>
                  </div>
                ) : (
                  <div className={styles.blog_content_article_at}>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                      <time>{dayjs(publishedAt).format("YYYY/MM/DD")}</time>
                    </span>
                  </div>
                )}
                <h1 className={styles.blog_content_title}>{title}</h1>
                <TaggedList tags={tags} />
                <div
                  dangerouslySetInnerHTML={{
                    __html: body,
                  }}
                  className={styles.blog_content_body}
                />
              </div>
            </section>
            <aside className={styles.blog_sidebar_layout}>
              <div className={styles.blog_sidebar_content}>
                <div className={styles.blog_sidebar_tags}>
                  <div className={styles.blog_sidebar_topic_title}>Tags</div>
                  <div className={styles.blog_sidebar_topic_links}>
                    {tags.map((tag, i) => (
                      <Tags key={i} tagLink={tag} />
                    ))}
                  </div>
                </div>
                <div className={styles.blog_sidebar_sticky}>
                  <div className={styles.blog_sidebar_toc}>
                    <div className={styles.blog_sidebar_toc_title}>目次</div>
                    <div className={styles.blog_sidebar_toc_area}>
                      <ol className={styles.blog_sidebar_toc_list}>
                        {toc.map((item, i) => (
                          <li
                            key={i}
                            className={styles.blog_sidebar_toc_list_item}
                          >
                            <a href={encodeURI(`#${item.id}`)}>{item.text}</a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
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
        </WideWrapper>
      </article>
    </>
  );
};

//[id].tsx 静的生成用パス
export const getStaticPaths: GetStaticPaths = async () => {
  const data: { contents: BlogItem[] } = await getBlogs();
  const paths =
    data.contents.map((content: { id: string }) => `/blog/${content.id}`) ?? [];
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
  const headings = $("h1").toArray();
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
      category: data.category[0].name[0],
      body: $.html(),
      toc: tocData,
      preview: context.preview || false,
      latestArticles: latestData.contents,
      cl: clContent,
    },
  };
};
export default Blog;
