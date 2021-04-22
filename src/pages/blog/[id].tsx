import { Wrapper } from "@src/components/Wrapper";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getBlog, getPreview } from "@src/lib/blog";
import { Tags } from "@src/components/tags/tags";
import cheerio from "cheerio";
import dayjs from "dayjs";
// scss modules
import styles from "@src/styles/pages/blog/BlogContent.module.scss";
//　props型
import { BlogItem, TagItems } from "@src/types";
// react hooks
import { useRef, useCallback } from "react";
interface Props {
  blog: BlogItem & TagItems;
  preview: boolean;
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
  //<h1>タグを目次用に抽出
  const $ = cheerio.load(body);
  const headings = $("h1").toArray();
  const toc: TocList[] = headings.map((data) => ({
    text: data.children[0].data,
    id: data.attribs.id,
    name: data.name,
  }));
  //公開前、下書き記事用props
  const preview = props.preview;
  const scrollBottomRef = useRef<HTMLElement>(null);
  return (
    <>
      <article className={styles.blog_article}>
        <Wrapper>
          <div className={styles.blog_content_main}>
            <section className={styles.blog_content_layout}>
              <div className={styles.blog_content_article}>
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
                      作成日：{dayjs(createdAt).format("YYYY/MM/DD")}
                    </span>
                    <span className={styles.blog_content_article_at_list}>
                      更新日:{dayjs(updatedAt).format("YYYY/MM/DD")}
                    </span>
                  </div>
                ) : (
                  <div className={styles.blog_content_article_at}>
                    <span>公開日{dayjs(publishedAt).format("YYYY/MM/DD")}</span>
                  </div>
                )}
                <span className={styles.blog_content_tags}>{category}</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${body}`,
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
                          <li className={styles.blog_sidebar_toc_list_item}>
                            {item.text}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
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
  const data = await getPreview(id, draftKey);
  return {
    props: {
      blog: data,
      preview: context.preview || false,
    },
  };
};
export default Blog;
