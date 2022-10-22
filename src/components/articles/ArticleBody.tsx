import parse from "html-react-parser";
export const FixArticleBody: React.FC<{ articleBody: string }> = (props) => {
  const { articleBody } = props;
  return (
    <>
      <div className="blog_content_body">{parse(articleBody)}</div>
    </>
  );
};
