import { Wrapper } from "@src/components/Wrapper";
import { getBlog, getPreview } from "@src/lib/blog";
import dayjs from "dayjs";
import { BlogItem } from "@src/types";
interface Props {
  blog: BlogItem;
}
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
const Blog: NextPage<Props> = (props) => {
  const { title, publishedAt, category, body } = props.blog;
  return (
    <div>
      <h1>{title}</h1>
      <p>{dayjs(publishedAt).format("YYYY/MM/DD")}</p>
      <span>{category}</span>
      <div
        dangerouslySetInnerHTML={{
          __html: `${body}`,
        }}
      />
    </div>
  );
};

//[id].tsx 静的生成用パス
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getBlog();
  const paths = data.contents.map(
    (content: { id: string }) => `/blog/${content.id}`
  );
  return {
    paths,
    fallback: false,
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
    },
  };
};
export default Blog;
