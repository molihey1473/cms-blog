import styles from "./TagTitle.module.scss";

export const TagTitle: React.FC<{ title: string }> = (props) => {
  return (
    <div className={styles.tag_name_container}>
      <h1 className={styles.tag_name}>{`#${props.title}`}</h1>
    </div>
  );
};
