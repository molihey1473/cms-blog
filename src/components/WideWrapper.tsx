import styles from "@src/styles/components/WideWrapper.module.scss";
export const WideWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={styles.layout}>{props.children}</div>;
};
