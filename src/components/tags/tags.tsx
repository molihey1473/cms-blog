import Link from "next/link";
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
