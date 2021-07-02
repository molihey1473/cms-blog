import styles from "@src/styles/components/Wrapper.module.scss";
export const Wrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};
export const WideWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={styles.wide_wrapper}>{props.children}</div>;
};
