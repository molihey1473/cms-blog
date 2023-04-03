import dayjs from "dayjs";

import { UpdateIcon, PublishDateIcon } from "@src/components/icons";

import styles from "./ArticleDate.module.scss";
export interface Props {
  readonly preview: boolean;
  readonly createdAt: string;
  readonly publishedAt: string;
  readonly updatedAt: string;
}

export const ArticleDate: React.FC<Props> = (props) => {
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
