import { Wrapper } from "@src/components/Wrapper";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getBlog, getPreview } from "@src/lib/blog";
import dayjs from "dayjs";
import styles from "@src/styles/pages/blog/BlogContent.module.scss";
import { BlogItem } from "@src/types";
interface Props {
  blog: BlogItem;
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
  } = props.blog;
  const preview = props.preview;
  const router = useRouter();
  return (
    <>
      <section className={styles.blog_content_layout}>
        <Wrapper>
          <div className={styles.blog_content_article}>
            {preview && <a href="/api/clearPreview">preview mode　解除</a>}
            <h1 className={styles.blog_content_title}>{title}</h1>
            {preview ? (
              <div className={styles.blog_content_article_at}>
                <span>作成日：{dayjs(createdAt).format("YYYY/MM/DD")}</span>
              </div>
            ) : (
              <div className={styles.blog_content_article_at}>
                <span>公開日{dayjs(publishedAt).format("YYYY/MM/DD")}</span>
              </div>
            )}
            <span>{category}</span>
            <div
              dangerouslySetInnerHTML={{
                __html: `${body}`,
              }}
            />
          </div>
        </Wrapper>
      </section>
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
