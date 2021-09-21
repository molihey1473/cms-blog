import styles from "@src/styles/components/articles/ArticleBody.module.scss";
export const ArticleBody: React.FC<{ body: string }> = (props) => {
  return (
    <>
      <div
        className={styles.blog_content_body}
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
    </>
  );
};
