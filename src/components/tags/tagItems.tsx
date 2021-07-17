import Link from "next/link";
import twemoji from "twemoji";
import styles from "@src/styles/pages/blog/BlogContent.module.scss";
interface Props {
  id: string;
  name: string;
}
export const Tags: React.FC<{ tagLink: Props }> = (props) => {
  const { id, name } = props.tagLink;
  return (
    <>
      <Link href={`/tags/${name.replace(/\./g, "").toLowerCase()}`}>
        <a
          className={styles.blog_sidebar_topic_link}
          aria-label={props.tagLink.name}
        >
          {props.tagLink.name}
        </a>
      </Link>
    </>
  );
};
export const TaggedList: React.FC<{ tags: Props[] }> = (props) => {
  return (
    <>
      <div className={styles.taggedList_container}>
        <div className={styles.taggedItems_container}>
          <div dangerouslySetInnerHTML={{ __html: twemoji.parse("🏷") }} />
          <div>tag</div>
          {props.tags.map((tag, i) => (
            <TaggedItems key={`tag-${i}`} tagItem={tag} />
          ))}
        </div>
      </div>
    </>
  );
};
export const TaggedItems: React.FC<{ tagItem: Props }> = (props) => {
  const name = props.tagItem.name;
  return (
    <>
      <Link href={`/tags/${name.replace(/\./g, "").toLowerCase()}`}>
        <a className={styles.tagName}>{name}</a>
      </Link>
    </>
  );
};
