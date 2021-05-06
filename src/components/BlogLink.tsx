//import {NextPage} from 'next'
import { BlogItem, TagItems } from "@src/types";
import Link from "next/link";
import dayjs from "dayjs";
import styles from "@src/styles/components/BlogLink.module.scss";
interface Props {
  item: BlogItem;
}
export const BlogLink: React.FC<Props> = (props) => {
  const { id, title, publishedAt, tags } = props.item;
  return (
    <article className={styles.blog_link}>
      <Link href={`/blog/${id}`}>
        <a className={styles.blog_link_content}>
          <div className={styles.blog_main_image}>
            <img
              src="https://images.microcms-assets.io/assets/f94653ed008f4b178eaa8ae1659f31fe/7af338a3f4da4d6398ddc5ec8105b6a0/morihey2.png"
              alt="profileCard"
            />
          </div>
          <div className={styles.blog_at}>
            <time dateTime={publishedAt}>
              {dayjs(publishedAt).format("YYYY/MM/DD")}
            </time>
          </div>
          <div className={styles.blog_main_title}>
            <h3 className={styles.blog_link_title}>{title}</h3>
          </div>
        </a>
      </Link>
      <div className={styles.blog_tags}>
        {tags.map((item, i) => (
          <Link key={`tags-${i}`} href={`/tags/${item.name.toLowerCase()}`}>
            <a className={styles.blog_tag_list}>{item.name}</a>
          </Link>
        ))}
      </div>
    </article>
  );
};
