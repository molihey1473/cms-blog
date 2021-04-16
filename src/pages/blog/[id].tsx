import { Wrapper } from "@src/components/Wrapper";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getBlog, getPreview } from "@src/lib/blog";
import { Tags } from "@src/components/tags/tags";
import dayjs from "dayjs";
import styles from "@src/styles/pages/blog/BlogContent.module.scss";
import { BlogItem, TagItems } from "@src/types";
interface Props {
  blog: BlogItem & TagItems;
  preview: boolean;
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
  const preview = props.preview;
  const router = useRouter();
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
