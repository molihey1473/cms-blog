import styles from "@src/styles/components/articles/sidebar/ArticleSidebar.module.scss";
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
