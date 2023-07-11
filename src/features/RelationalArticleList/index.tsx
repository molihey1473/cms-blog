import { PageSEO } from "@src/components/PageSEO";

import { ArticleList } from "./components/ArticleList";
import { TagTitle } from "./components/TagTitle";
import { ListContainerView } from "./layouts/ListContainerView";
import { TitleContainerView } from "./layouts/TitleContainerView";
interface Props {
  name: string;
  path: string;
  articleList: {
    id: string;
    title: string;
    publishedAt: string;
    tags: { name: string }[];
  }[];
}
export const RelationalArticleListPage: React.FC<Props> = (props) => {
  const { name, path, articleList } = props;
  return (
    <>
      <PageSEO title={name} path={path} isSummaryLarge={false} />
      <TitleContainerView>
        <TagTitle title={name} />
      </TitleContainerView>
      <ListContainerView>
        {articleList.length !== 0 ? (
          <ArticleList articleListData={articleList} />
        ) : (
          <div>関連した記事がありません</div>
        )}
      </ListContainerView>
    </>
  );
};
