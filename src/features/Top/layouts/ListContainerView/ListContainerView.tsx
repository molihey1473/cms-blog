import styles from "./ListContainerView.module.scss";
export const ListContainerView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <div className={styles.list_container}>{children}</div>
    </>
  );
};
