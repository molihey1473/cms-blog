import { useState } from "react";
import { PostItem } from "@src/types";
//import { PostLink } from "@src/components/PostLink";
import dayjs from "dayjs";
import styles from "@src/styles/components/PostList.module.scss";
interface Props {
  items: PostItem[];
}
export const PostLink: React.FC<{ item: PostItem }> = (props) => {
  const { title, link, isoDate } = props.item;
  return (
    <article className={styles.post_link}>
      <a className={styles.post_link_content} href={link}>
        <img src="/icon/qiita.png" width="30" height="30" alt="qiita" />
        <div className={styles.post_link_details}>
          <h2 className={styles.post_link_title}>{title}</h2>
          <time className={styles.post_link_at} dateTime={isoDate}>
            {dayjs(isoDate).format("YYYY-MM-DD")}
          </time>
        </div>
      </a>
    </article>
  );
};

export const PostList: React.FC<{ items: PostItem[] }> = (props) => {
  const [postItemCount, setPostItemCount] = useState<number>(32);
  const totalItemCount = props.items?.length || 0;
  if (!totalItemCount) {
    return <div>記事はありません</div>;
  }
  return (
    <>
      <div className={styles.post_list}>
        {props.items.slice(0, postItemCount).map((item, i) => (
          <PostLink key={`post-item-${i}`} item={item} />
        ))}
      </div>
    </>
  );
};
