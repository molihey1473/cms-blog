import React, { useCallback, useState } from "react";

import { ArticleList } from "@src/components/ArticleList";
import { Profile } from "@src/components/cards/Profile";

import { ArticleItems } from "@src/types/types";

import { member } from "@src/utils/member";

import { RenderCategoryList, RenderTabName } from "./components/CategoryList";
import { PageTitle } from "./components/PageTitle";
import { ListContainerView } from "./layouts/ListContainerView";
export const Top: React.FC<{
  articleListData: ArticleItems[];
  pageWithCategory: boolean;
}> = ({ pageWithCategory }) => {
  //const { articleListData, pageWithCategory } = props;
  const [tabCategory, setTabCategory] = useState<string>("All");
  const handleCategory = useCallback((e) => {
    setTabCategory(e.currentTarget.textContent);
  }, []);
  return (
    <>
      <React.StrictMode>
        <Profile member={member} />
        <PageTitle title={"All"} />
        {pageWithCategory ? (
          <>
            <RenderCategoryList>
              <RenderTabName
                tabName={"All"}
                tabCategory={tabCategory}
                onClick={handleCategory}
              />
              <RenderTabName
                tabName={"Other"}
                tabCategory={tabCategory}
                onClick={handleCategory}
              />
            </RenderCategoryList>
            <ListContainerView>
              <ArticleList tagName={undefined} />
            </ListContainerView>
          </>
        ) : (
          <ListContainerView>{tabCategory}</ListContainerView>
        )}
      </React.StrictMode>
    </>
  );
};
