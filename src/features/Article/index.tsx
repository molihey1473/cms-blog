import { ArticleAsideProfile } from "./components/ArticleAsideProfile";
import { ArticleBody } from "./components/ArticleBody";
import { ArticleClearPreviewMode } from "./components/ArticleClearPreviewMode";
import { ArticleDate } from "./components/ArticleDate";
import { ArticleShareButton } from "./components/ArticleShareButton";
import { ArticleTagList } from "./components/ArticleTagList";
import { ArticleTitle } from "./components/ArticleTitle";
import { ArticleAsideView } from "./layouts/ArticleAsideView";
import { ArticleContainerView } from "./layouts/ArticleContainerView";
import { ArticleHeaderView } from "./layouts/ArticleHeaderView";
import { ArticleMainView } from "./layouts/ArticleMainView";
interface Props {
  readonly preview: boolean;
  articleData: {
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly publishedAt: string;
    readonly category: { name: string[] };
    readonly createdAt: string;
    readonly updatedAt: string | undefined;
    readonly tags: { name: string; id: string }[] | [];
  };
}
export const ArticlePage: React.FC<Props> = (props) => {
  const { title, publishedAt, createdAt, updatedAt, tags, id, body } =
    props.articleData;
  const { preview } = props;
  return (
    <ArticleContainerView>
      <ArticleHeaderView>
        <ArticleClearPreviewMode preview={preview} />
        <ArticleDate
          preview={preview}
          createdAt={createdAt}
          updatedAt={updatedAt}
          publishedAt={publishedAt}
        />
        <ArticleTitle title={title} />
        <ArticleTagList tags={tags} />
      </ArticleHeaderView>
      <ArticleMainView>
        <ArticleBody articleBody={body} />
        <ArticleShareButton title={title} id={id} />
        <ArticleAsideView>
          <ArticleAsideProfile />
        </ArticleAsideView>
      </ArticleMainView>
    </ArticleContainerView>
  );
};
