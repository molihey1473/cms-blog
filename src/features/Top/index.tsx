import React from "react";

import { ArticleList } from "@src/components/ArticleList";
import { PageSEO } from "@src/components/PageSEO";

import { member } from "@src/utils/member";

import { PageView } from "@src/layouts/PageView";
import { PageWrapper } from "@src/layouts/PageWrapper";

//import { RenderCategoryList, RenderTabName } from "./components/CategoryList";
//import { PageTitle } from "./components/PageTitle";
import { Profile } from "./components/Profile";
import { ListContainerView } from "./layouts/ListContainerView";
//
//export const Top: React.FC<{
//  pageWithCategory: boolean;
//}> = ({ pageWithCategory }) => {
//  const { pageWithCategory } = props;
//  const [tabCategory, setTabCategory] = useState<string>("All");
//  const handleCategory = useCallback((e) => {
//    setTabCategory(e.currentTarget.textContent);
//  }, []);
//  return (
//    <>
//      <React.StrictMode>
//        <Profile member={member} />
//        <PageTitle title={"All"} />
//        {pageWithCategory ? (
//          <>
//            <RenderCategoryList>
//              <RenderTabName
//                tabName={"All"}
//                tabCategory={tabCategory}
//                onClick={handleCategory}
//              />
//              <RenderTabName
//                tabName={"Other"}
//                tabCategory={tabCategory}
//                onClick={handleCategory}
//              />
//            </RenderCategoryList>
//            <ListContainerView>
//              <ArticleList tagName={undefined} />
//            </ListContainerView>
//          </>
//        ) : (
//          <ListContainerView>{tabCategory}</ListContainerView>
//        )}
//      </React.StrictMode>
//    </>
//  );
//};
//
export const TopPage: React.FC = () => {
  return (
    <>
      <PageSEO title={"MoliHey"} isSummaryLarge={false} />
      <PageView>
        <PageWrapper>
          <Profile member={member} />
          <ListContainerView>
            <ArticleList tagName={undefined} />
          </ListContainerView>
        </PageWrapper>
      </PageView>
    </>
  );
};
