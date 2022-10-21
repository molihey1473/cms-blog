import styles from "@src/styles/pages/blog/BlogList.module.scss";

export const TagTitle: React.FC<{ title: string }> = (props) => {
  return (
    <div className={styles.tag_name_container}>
      <h1 className={styles.tag_name}>{`#${props.title}`}</h1>
    </div>
  );
};
