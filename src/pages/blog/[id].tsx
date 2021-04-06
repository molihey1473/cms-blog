import { Wrapper } from "@src/components/Wrapper";
import { getBlog, getBlogContent } from "@src/lib/blog";
import dayjs from "dayjs";
import { BlogItem } from "@src/types";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
const Blog: NextPage<{ blog: BlogItem }> = (props) => {
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
  const draftKey = context.params?.slug;
  console.log(draftKey);
  const id = context.params?.id;
  const data =
    typeof id === "string" ? await getBlogContent(id, draftKey) : null;
  return {
    props: {
      blog: data,
    },
  };
};
export default Blog;
