import styles from "@src/styles/components/Wrapper.module.scss";
export const Wrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={styles.layout}>{props.children}</div>;
};
