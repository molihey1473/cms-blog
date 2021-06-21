//import {NextPage} from 'next'
import { BlogItem, TagItems, ArticleList } from "@src/types";
import Link from "next/link";
import dayjs from "dayjs";
import styles from "@src/styles/components/BlogLink.module.scss";
interface Props {
  item: ArticleList;
}
export const BlogLink: React.FC<Props> = (props) => {
  const { id, title, publishedAt, tags, meta } = props.item;
  //console.log(meta.image);
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
      {/* <div className={styles.blog_tags}>
        {tags.map((item, i) => {
          if (item.name) {
            return (
              <Link
                key={`tags-${i}`}
                href={`/tags/${item.name.replace(/\./g, "").toLowerCase()}`}
              >
                <a className={styles.blog_tag_list}>{item.name}</a>
              </Link>
            );
          }
        })}
      </div> */}
    </article>
  );
};
export const BlogList: React.FC<{ items: Props[] }> = (props) => {
  return (
    <div>
      {props.items.map((data, i) => (
        <BlogLink key={`BlogLink-${i}`} item={data} />
      ))}
    </div>
  );
};
