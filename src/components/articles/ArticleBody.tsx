import parse from "html-react-parser";
//import { highlight, languages } from "prismjs";
//
//import { ArticleBodyItems } from "@src/types/types";

//export const ArticleBody: React.FC<{ articleBody: ArticleBodyItems[] }> = (
//  props
//) => {
//  const { articleBody } = props;
//  return (
//    <>
//      {articleBody.map((item, i) => {
//        const { markdown, language, code } = item;
//        return (
//          <div key={`body-content-${i}`} className="blog_content_body">
//            {parse(markdown)}
//            {code && (
//              <div className="code-container">
//                <pre className={`language-${language}`}>
//                  <code className={`language-${language}`}>{parse(code)}</code>
//                </pre>
//              </div>
//            )}
//          </div>
//        );
//      })}
//    </>
//  );
//};

export const FixArticleBody: React.FC<{ articleBody: string }> = (props) => {
  const { articleBody } = props;
  return (
    <>
      <div className="blog_content_body">{parse(articleBody)}</div>
    </>
  );
};
