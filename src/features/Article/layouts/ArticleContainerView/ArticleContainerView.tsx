import styles from "./ArticleContainerView.module.scss";
export const ArticleContainerView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <article className={styles.article_container}>{children}</article>
    </>
  );
};
