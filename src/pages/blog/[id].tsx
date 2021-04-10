import { Wrapper } from "@src/components/Wrapper";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getBlog, getPreview } from "@src/lib/blog";
import dayjs from "dayjs";
import { BlogItem } from "@src/types";
interface Props {
  blog: BlogItem;
  preview: boolean;
}

const Blog: NextPage<Props> = (props) => {
  const { title, publishedAt, category, body } = props.blog;
  const preview = props.preview;
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {preview && <a href="/api/clearPreview">preview mode　解除</a>}
      <h1>{title}</h1>
      {preview ? (
        <p>下書き！！</p>
      ) : (
        <p>{dayjs(publishedAt).format("YYYY/MM/DD")}</p>
      )}
      <span>{category}</span>
      <div
        dangerouslySetInnerHTML={{
          __html: `${body}`,
        }}
      />
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
