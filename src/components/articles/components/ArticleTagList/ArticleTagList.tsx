import Link from "next/link";

import styles from "./ArticleTagList.module.scss";

interface Props {
  id: string;
  name: string;
}
export const Tags: React.FC<{ tagLink: Props }> = (props) => {
  const { name } = props.tagLink;
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

//記事内tags component
export const ArticleTagList: React.FC<{ tags: Props[] | [] }> = (props) => {
  console.log(typeof props.tags);
  console.log(props.tags);
  return (
    <>
      {props.tags.length !== 0 && (
        <div className={styles.taggedList_container}>
          <div className={styles.taggedItems_container}>
            <div className={styles.tag_list_emoji}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
                <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586l7 7L13.586 9l-7-7H2v4.586z" />
              </svg>
            </div>
            {props.tags.map((tag, i) => (
              <ArticleTagItems key={`tag-${i}`} tagItem={tag} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export const ArticleTagItems: React.FC<{ tagItem: Props }> = (props) => {
  const name = props.tagItem.name;
  return (
    <>
      <Link href={`/tags/${name.replace(/\./g, "").toLowerCase()}`}>
        <a className={styles.tagName}>{`#${name}`}</a>
      </Link>
    </>
  );
};
