import styles from "./PageTitle.module.scss";
export const PageTitle: React.FC<{ title: string }> = (props) => {
  return <h2 className={styles.page_content_title}>{props.title}</h2>;
};
