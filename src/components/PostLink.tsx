import { PostItem } from "@src/types";
import styles from "@src/styles/components/PostLink.module.scss";
export const PostLink: React.FC<{ item: PostItem }> = (props) => {
  const { title, contentSnippet, link, isoDate, dateMiliSeconds } = props.item;
  return (
    <article className={styles.post_link}>
      <h1>{title}</h1>
    </article>
  );
};
