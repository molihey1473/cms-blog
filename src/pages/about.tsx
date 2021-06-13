import Link from "next/link";
import { NextPage } from "next";
import { BlogSEO } from "@src/components/BlogSEO";
import { CategoryList } from "@src/components/CategoryList";

const About: NextPage = () => {
  return (
    <>
      <BlogSEO title="About" path="/about" />
      <CategoryList />
      <h1>about</h1>
      <Link href="/">
        <a>back to home</a>
      </Link>
    </>
  );
};
export default About;
