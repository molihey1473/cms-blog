import Link from "next/link";

import dayjs from "dayjs";

import { TaggedList } from "@src/types/types";

import styles from "@src/styles/components/BlogLink.module.scss";

export const TagList: React.FC<{ taggedList: TaggedList }> = (props) => {
  const { id, title, publishedAt } = props.taggedList;
  return (
    <li className={styles.blog_link}>
      <Link href={`/blog/${id}`} className={styles.blog_link_content}>
        <time className={publishedAt}>
          {dayjs(publishedAt).format("YYYY/MM/DD")}
        </time>
        <h2 className={styles.blog_link_title}>{title}</h2>
      </Link>
    </li>
  );
};
