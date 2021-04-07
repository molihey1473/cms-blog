//import {NextPage} from 'next'
import { BlogItem } from "@src/types";
import Link from "next/link";
import dayjs from "dayjs";
import styles from "@src/styles/components/BlogLink.module.scss";
export const BlogLink: React.FC<{ item: BlogItem }> = (props) => {
  const { id, title, publishedAt, category } = props.item;
  return (
    <li className={styles.blog_link}>
      <Link href={`blog/${id}`}>
        <a>
          <time dateTime={publishedAt}>
            {dayjs(publishedAt).format("YYYY/MM/DD")}
          </time>
          <h2 className={styles.blog_link_title}>{title}</h2>
          <div className={styles.blog_tags}>
            <span className={styles.blog_tag}>{category}</span>
          </div>
        </a>
      </Link>
    </li>
  );
};
