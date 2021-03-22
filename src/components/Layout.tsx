import styles from "@src/styles/components/Layout.module.scss";
export const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={styles.layout}>{props.children}</div>;
};
