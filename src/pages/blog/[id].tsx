import { Wrapper } from "@src/components/Wrapper";
import { getBlog } from "@src/lib/blog";
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
export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params);
  const id = params.id;
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };
  const data = await fetch("https://roy1473.microcms.io/api/v1/blog/" + id, key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data,
    },
  };
};
export default Blog;
