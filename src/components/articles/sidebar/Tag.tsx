import Link from "next/link";
import styles from "@src/styles/components/articles/Tag.module.scss";

interface Props {
  id: string;
  name: string;
}
export const SidebarTagItem: React.FC<{ tagItem: Props }> = (props) => {
  const { id, name } = props.tagItem;
  return (
    <>
      <Link href={`/tags/${name.replace(/\./g, "").toLowerCase()}`}>
        <a className={styles.blog_sidebar_topic_link} aria-label={name}>
          {name}
        </a>
      </Link>
    </>
  );
};
export const SidebarTagList: React.FC<{ tags: Props[] }> = (props) => {
  const { tags } = props;
  return (
    <>
      <div className={styles.blog_sidebar_tags}>
        <div className={styles.blog_sidebar_topic_title}>Tags</div>
        <div className={styles.blog_sidebar_topic_links}>
          {tags.map((item, i) => (
            <SidebarTagItem key={`SidebarTagItem-${i}`} tagItem={item} />
          ))}
        </div>
      </div>
    </>
  );
};
