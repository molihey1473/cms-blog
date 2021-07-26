import styles from "@src/styles/pages/blog/BlogContent.module.scss";
export const ArticleSidebar: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <>
      <aside className={styles.container}>
        <div className={styles.contents}>{props.children}</div>
      </aside>
    </>
  );
};
