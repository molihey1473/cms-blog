import styles from "./ArticleTitle.module.scss";
export const ArticleTitle: React.FC<{ title: string }> = (props) => {
  return (
    <>
      <h1 className={styles.title}>{props.title}</h1>
    </>
  );
};
