import dayjs from "dayjs";

import { UpdateIcon, PublishDateIcon } from "@src/components/icons";

import {
  PreviewDate,
  PublishDate,
  ArticleDate,
  ArticleDate,
} from "@src/types/types";

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
          <PublishDateIcon />
          <time>{dayjs(publishedAt).format("YYYY/MM/DD")}</time>
        </span>
        {updatedAt && (
          <span className={styles.up_date}>
            <UpdateIcon />
            <time>{dayjs(updatedAt).format("YYYY/MM/DD")}更新</time>
          </span>
        )}
      </div>
    </>
  );
};
export const ArticleDate: React.FC<ArticleDate> = (props) => {
  const { createdAt, updatedAt, publishedAt, preview } = props;
  return (
    <>
      {preview ? (
        <div className={styles.date_container}>
          <span className={styles.create_date}>
            <time>作成日：{dayjs(createdAt).format("YYYY/MM/DD")}</time>
          </span>
          <span className={styles.up_date}>
            <time>更新日:{dayjs(updatedAt).format("YYYY/MM/DD")}</time>
          </span>
        </div>
      ) : (
        <div className={styles.date_container}>
          <span className={styles.pub_date}>
            <PublishDateIcon />
            <time>{dayjs(publishedAt).format("YYYY/MM/DD")}</time>
          </span>
          {updatedAt && (
            <span className={styles.up_date}>
              <UpdateIcon />
              <time>{dayjs(updatedAt).format("YYYY/MM/DD")}更新</time>
            </span>
          )}
        </div>
      )}
    </>
  );
};
