import styles from "./TitleContainerView.module.scss";
export const TitleContainerView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <div className={styles.tag_name_container}>{children}</div>
    </>
  );
};
