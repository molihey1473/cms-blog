import { ArticleItems, ArticleList } from "@src/types";
import Link from "next/link";
import dayjs from "dayjs";
import styles from "@src/styles/pages/blog/BlogList.module.scss";

//interface Props {
//  item: ArticleList;
//}
export const BlogLink: React.FC<{ item: ArticleList }> = (props) => {
  const { id, title, publishedAt, tags, meta } = props.item;
  return (
    <article className={styles.blog_link}>
      <Link href={`/articles/${id}`}>
        <a className={styles.blog_link_content}>
          <div className={styles.blog_main_image}></div>
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
    </article>
  );
};
export const BlogList: React.FC<{ items: ArticleItems[] }> = (props) => {
  return (
    <div className={styles.blog_list}>
      {props.items.map((data, i) => (
        <BlogLink key={`BlogLink-${i}`} item={data} />
      ))}
    </div>
  );
};

export const BlogFlatList: React.FC<{
  items: ArticleItems[];
}> = (props) => {
  return (
    <>
      <div className={styles.flat_list}>
        {props.items.map((data, i) => (
          <BlogFlatItem key={`BlogFlat-${i}`} item={data} />
        ))}
      </div>
    </>
  );
};
export const BlogFlatItem: React.FC<{ item: ArticleList }> = (props) => {
  const { id, title, publishedAt, tags } = props.item;
  return (
    <>
      <article className={styles.flat_link}>
        <time className={styles.flat_link_date} dateTime={publishedAt}>
          {dayjs(publishedAt).format("YYYY/MM/DD")}
        </time>
        <Link href={`/articles/${id}`}>
          <a className={styles.flat_link_title}>{title}</a>
        </Link>
        <div className={styles.flat_link_tags}>
          {tags.map((item, i) => (
            <Link key={i} href={`/tags/${item.name.toLowerCase()}`}>
              <a className={styles.flat_items_tags}>{item.name}</a>
            </Link>
          ))}
        </div>
      </article>
    </>
  );
};
