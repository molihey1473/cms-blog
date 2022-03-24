import dayjs from "dayjs";

import { PreviewDate, PublishDate } from "@src/types/types";

import styles from "@src/styles/components/articles/header/ArticleHeader.module.scss";

export const PreDate: React.FC<PreviewDate> = (props) => {
  const { createdAt, updatedAt } = props;
  return (
    <>
      <div className={styles.date_container}>
        <span className={styles.create_date}>
          <time>作成日：{dayjs(createdAt).format("YYYY/MM/DD")}</time>
        </span>
        <span className={styles.up_date}>
          <time>更新日:{dayjs(updatedAt).format("YYYY/MM/DD")}</time>
        </span>
      </div>
    </>
  );
};
export const PubDate: React.FC<PublishDate> = (props) => {
  const { publishedAt, updatedAt } = props;
  return (
    <>
      <div className={styles.date_container}>
        <span className={styles.pub_date}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
          </svg>
          <time>{dayjs(publishedAt).format("YYYY/MM/DD")}</time>
        </span>
        {updatedAt && (
          <span className={styles.up_date}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
              <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
            </svg>
            <time>{dayjs(updatedAt).format("YYYY/MM/DD")}更新</time>
          </span>
        )}
      </div>
    </>
  );
};
