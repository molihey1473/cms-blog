import { NextPage, GetStaticProps } from "next";
import { getBlog } from "@src/lib/blog";
import { BlogContent } from "@src/types";
import Link from "next/link";
const BlogItems: NextPage<{ blogs: BlogContent[] }> = (props) => {
  return (
    <div>
      <ul>
        {props.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: {
    contents: BlogContent[];
  } = await getBlog();
  console.log(data);
  return {
    props: {
      blogs: data.contents,
    },
  };
};
export default BlogItems;
