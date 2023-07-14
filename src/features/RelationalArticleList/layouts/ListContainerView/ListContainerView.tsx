import styles from "./ListContainerView.module.scss";
export const ListContainerView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <div className={styles.flat_list}>{children}</div>
    </>
  );
};
