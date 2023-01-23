import styles from "./Wrapper.module.scss";

//ページ共通Warpper
export const PageWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={styles.default}>{props.children}</div>;
};
