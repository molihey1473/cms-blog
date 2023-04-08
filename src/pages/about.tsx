import { NextPage } from "next";

import Link from "next/link";

import { PageSEO } from "@src/components/PageSEO";

import { PageWrapper } from "@src/layouts/PageWrapper";

const About: NextPage = () => {
  return (
    <>
      <PageSEO title="About" path="/about" isSummaryLarge={true} />
      <PageWrapper>
        <h1>about</h1>
        <Link href="/">back to home</Link>
      </PageWrapper>
    </>
  );
};
export default About;
