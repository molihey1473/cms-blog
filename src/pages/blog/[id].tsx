import { Wrapper } from "@src/components/Wrapper";
//import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getBlog, getPreview } from "@src/lib/blog";
import { BlogLink } from "@src/components/BlogLink";
import { Tags } from "@src/components/tags/tags";
import { SidebarProfile } from "@src/components/SidebarProfile";
//toc, シンタックスハイライト用
import cheerio from "cheerio";
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
  toc: TocList[];
  preview: boolean;
  latestArticles: BlogItem[];
}
interface TocList {
  text: string;
  id: string;
  name: string;
}
const Blog: NextPage<Props> = (props) => {
  const {
    title,
    publishedAt,
    category,
    body,
    createdAt,
    updatedAt,
    tags,
  } = props.blog;
  const toc = props.toc;
  //公開前、下書き記事用props
  const preview = props.preview;
  //最新記事
  const latestArticles = props.latestArticles;
  return (
    <>
      <article className={styles.blog_article}>
        <Wrapper>
          <div className={styles.blog_content_main}>
            <section className={styles.blog_content_layout}>
              <div className={styles.blog_content_article}>
                <div>
                  <img
                    src="https://images.microcms-assets.io/assets/f94653ed008f4b178eaa8ae1659f31fe/7af338a3f4da4d6398ddc5ec8105b6a0/morihey2.png"
                    alt={`${title}-image`}
                  />
                </div>
                {preview && (
                  <a
                    href="/api/clearPreview"
                    className={styles.clear_preview_mode}
                  >
                    ** preview mode　解除 **
                  </a>
                )}
                <h1 className={styles.blog_content_title}>{title}</h1>
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
                    <time>
                      <span>
                        公開日{dayjs(publishedAt).format("YYYY/MM/DD")}
                      </span>
                    </time>
                  </div>
                )}
                <span className={styles.blog_content_tags}>{category}</span>
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
                  <SidebarProfile />
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
          <div className={styles.latestArticles_list}>
            {latestArticles &&
              latestArticles
                .slice(0, 5)
                .map((latestBlog, i) => (
                  <BlogLink key={`latest-blog-${i}`} item={latestBlog} />
                ))}
          </div>
        </Wrapper>
      </article>
    </>
  );
};

//[id].tsx 静的生成用パス
export const getStaticPaths: GetStaticPaths = async () => {
  const data: { contents: BlogItem[] } = await getBlog();
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
  const latestData = await getBlog();
  //<h1>タグを目次用に抽出
  const $ = cheerio.load(data.body);
  //table of content
  const headings = $("h1").toArray();
  const tocData = headings.map((data) => ({
    text: data.children[0].data,
    id: data.attribs.id,
    name: data.name,
  }));
  return {
    props: {
      blog: data,
      toc: tocData,
      preview: context.preview || false,
      latestArticles: latestData.contents,
    },
  };
};
export default Blog;
