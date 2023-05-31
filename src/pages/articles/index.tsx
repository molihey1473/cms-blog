import { GetStaticProps, NextPage } from "next";

import { getAllArticles } from "@src/lib/blog";

import { ArticleItems } from "@src/types/types";

import { CategoryList } from "@src/features/Top/components/CategoryList";
import { PageView } from "@src/layouts/PageView";
import { PageWrapper } from "@src/layouts/PageWrapper";

interface Props {
  blogs: ArticleItems[];
}
const page: NextPage<Props> = () => {
  return (
    <>
      <main>
        <PageView>
          <PageWrapper>
            <CategoryList />
          </PageWrapper>
        </PageView>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: {
    contents: ArticleItems[];
  } = await getAllArticles();
  return {
    props: {
      blogs: data.contents,
    },
  };
};
export default page;
