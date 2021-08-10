//import {NextPage} from 'next'
import { BlogItem, ArticleList } from "@src/types";
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
      <Link href={`/blog/${id}`}>
        <a className={styles.blog_link_content}>
          <div className={styles.blog_main_image}>
            <img
              src={meta?.image?.url || "/ogp/home-ogp.png"}
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
    </article>
  );
};
export const BlogList: React.FC<{ items: BlogItem[] }> = (props) => {
  return (
    <div className={styles.blog_list}>
      {props.items.map((data, i) => (
        <BlogLink key={`BlogLink-${i}`} item={data} />
      ))}
    </div>
  );
};

export const BlogFlatList: React.FC<{ items: BlogItem[] }> = (props) => {
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
  const { id, title, publishedAt, tags, meta } = props.item;
  return (
    <>
      <article className={styles.flat_link}>
        <Link href={`/blog/${id}`}>
          <a className={styles.flat_link_contents}>
            <div className={styles.flat_link_image_content}>
              <img src={meta?.image?.url || "/ogp/home-ogp.png"} alt={title} />
            </div>
            <div className={styles.flat_link_bio}>
              <time dateTime={publishedAt}>
                {dayjs(publishedAt).format("YYYY/MM/DD")}
              </time>
              <h3 className={styles.flat_link_title}>{title}</h3>
            </div>
          </a>
        </Link>
      </article>
    </>
  );
};
