import styles from "@src/styles/components/articles/ArticleBody.module.scss";
import parse from "html-react-parser";
//import "@src/styles/codetheme.scss";
import { ArticleBodyItems } from "@src/types";
interface Props {
  markdown: string | undefined;
  language: string;
  code: string;
}
//export const ArticleBody: React.FC<{ body: ArticleBodyItems[] }> = (props) => {
//  return (
//    <>
//      <div
//        className={styles.blog_content_body}
//        dangerouslySetInnerHTML={{ __html: props.body }}
//      />
//    </>
//  );
//};
export const ArticleBody: React.FC<{ articleBody: ArticleBodyItems[] }> = (
  props
) => {
  const { articleBody } = props;
  return (
    <>
      {articleBody.map((item, i) => {
        const { markdown, language, code } = item;
        return (
          <>
            {item && (
              <div key={`記事セクション-${i}`} className="blog_content_body">
                {parse(markdown)}
                <div className="code-container">
                  <pre
                    key={`記事セクション-${i}`}
                    className={`language-${language}`}
                  >
                    <code
                      key={`記事セクション-${i}`}
                      className={`language-${language}`}
                    >
                      {parse(code)}
                    </code>
                  </pre>
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );
};
