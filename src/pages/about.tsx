import Link from "next/link";
import { NextPage } from "next";
import { BlogSEO } from "@src/components/BlogSEO";
import { CategoryList } from "@src/components/CategoryList";
import { Wrapper } from "@src/components/Wrapper";

const About: NextPage = () => {
  return (
    <>
      <BlogSEO title="About" path="/about" />
      <Wrapper>
        <CategoryList />
        <h1>about</h1>
        <Link href="/">
          <a>back to home</a>
        </Link>
      </Wrapper>
    </>
  );
};
export default About;
