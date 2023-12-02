import { ArticleList } from "@src/components/ArticleList";
import { PageSEO } from "@src/components/PageSEO";

import { PageView } from "@src/layouts/PageView";
import { PageWrapper } from "@src/layouts/PageWrapper";

import { TagTitle } from "./components/TagTitle";
import { ListContainerView } from "./layouts/ListContainerView";
import { TitleContainerView } from "./layouts/TitleContainerView";
//interface Props {
//  name: string;
//  path: string;
//  articleList: {
//    id: string;
//    title: string;
//    publishedAt: string;
//    tags: { name: string }[];
//  }[];
//}
export const RelationalArticleListPage: React.FC<{
  name: string;
  path: string;
}> = (props) => {
  const { name, path } = props;
  return (
    <>
      <PageSEO title={name} path={path} isSummaryLarge={false} />
      <PageView>
        <PageWrapper>
          <TitleContainerView>
            <TagTitle title={name} />
          </TitleContainerView>
          <ListContainerView>
            <ArticleList tagName={name} />
          </ListContainerView>
        </PageWrapper>
      </PageView>
    </>
  );
};
