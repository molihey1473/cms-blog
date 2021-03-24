import Link from "next/link";
import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <h1>about</h1>
      <Link href="/">
        <a>back to home</a>
      </Link>
    </>
  );
};
export default About;
