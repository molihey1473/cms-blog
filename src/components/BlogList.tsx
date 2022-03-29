import Link from "next/link";

import dayjs from "dayjs";

import { ArticleItems, ArticleList } from "@src/types/types";

import { getArticlePath, getTagPath } from "@src/utils/helper";

import styles from "@src/styles/pages/blog/BlogList.module.scss";

export const BlogLink: React.FC<{ item: ArticleList }> = (props) => {
  const { id, title, publishedAt } = props.item;
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
  items: ArticleList[];
}> = (props) => {
  return (
    <>
      <div className={styles.flat_list}>
        {props.items.map((data, i) => (
          <BlogFlatItem
            key={`BlogFlat-${i}`}
            item={data}
            isTagIncluded={true}
          />
        ))}
      </div>
    </>
  );
};
export const BlogFlatItem: React.FC<{
  item: ArticleList;
  isTagIncluded: boolean;
}> = (props) => {
  const { id, title, publishedAt, tags } = props.item;
  const isTagIncluded = props.isTagIncluded;
  return (
    <>
      <article className={styles.flat_link}>
        <time className={styles.flat_link_date} dateTime={publishedAt}>
          {dayjs(publishedAt).format("YYYY/MM/DD")}
        </time>
        <Link href={getArticlePath(id)}>
          <a className={styles.flat_link_title}>{title}</a>
        </Link>
        {isTagIncluded && (
          <div className={styles.flat_link_tags}>
            {tags.map((item, i) => (
              <Link key={i} href={getTagPath(item.name)}>
                <a className={styles.flat_items_tags}>{item.name}</a>
              </Link>
            ))}
          </div>
        )}
      </article>
    </>
  );
};
