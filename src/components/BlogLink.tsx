//import {NextPage} from 'next'
import { Blog } from "@src/types";
import Link from "next/link";
import styles from "@src/styles/components/BlogLink.module.scss";
export const BlogLink: React.FC<{ item: Blog }> = (props) => {
  const { id, title, body, publishedAt, category } = props.item;
  return (
    <li className={styles.blog_link}>
      <Link href={`blog/${id}`}>
        <a>{title}</a>
      </Link>
    </li>
  );
};
