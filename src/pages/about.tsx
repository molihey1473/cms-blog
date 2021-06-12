import Link from "next/link";
import { NextPage } from "next";
import { BlogSEO } from "@src/components/BlogSEO";
import { Nav } from "@src/components/Navigation";

const About: NextPage = () => {
  return (
    <>
      <BlogSEO title="About" path="/about" />
      <Nav />
      <h1>about</h1>
      <Link href="/">
        <a>back to home</a>
      </Link>
    </>
  );
};
export default About;
