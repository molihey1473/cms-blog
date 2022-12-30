import styles from "./ArticleAsideView.module.scss";
export const ArticleAsideView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <div className={styles.author_info}>{children}</div>
    </>
  );
};
