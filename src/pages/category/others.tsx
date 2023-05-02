import { NextPage } from "next";

import { PageSEO } from "@src/components/PageSEO";

import { Top } from "@src/features/Top";
import { CategoryList } from "@src/features/Top/components/CategoryList";
import { PageView } from "@src/layouts/PageView";
import { PageWrapper } from "@src/layouts/PageWrapper";

const Page: NextPage = () => {
  return (
    <>
      <PageSEO
        title={"molihey"}
        path={"/category/others"}
        isSummaryLarge={true}
      />
      <PageView>
        <PageWrapper>
          <Top articleListData={[]} pageWithCategory={true} />
        </PageWrapper>
      </PageView>
      <CategoryList />
    </>
  );
};
export default Page;
