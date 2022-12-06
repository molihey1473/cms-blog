import styles from "@src/styles/components/articles/header/ArticleHeader.module.scss";
export const ArticleTitle: React.FC<{ title: string }> = (props) => {
  return (
    <>
      <h1 className={styles.title}>{props.title}</h1>
    </>
  );
};
