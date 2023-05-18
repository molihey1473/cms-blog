import Link from "next/link";

import dayjs from "dayjs";

import { isInsidePath } from "@src/utils/helper";

import styles from "./ArticleList.module.scss";
interface RenderProps {
  readonly category: string;
  readonly title: string;
  readonly contentSnippet: string | null;
  readonly link: string;
  readonly date: string;
  readonly dateMiliSeconds: number;
}
export const ArticleList: React.FC<{
  tabName: string;
  renderList: RenderProps[];
}> = ({ tabName, renderList }) => {
  const listData = getList(tabName, renderList);
  return (
    <>
      <div className={styles.flat_list}>
        {listData.map((listItem, i) => (
          <ArticleListItems
            key={`Rendet-List${i}`}
            renderListItems={listItem}
          />
        ))}
      </div>
    </>
  );
};
export const ArticleListItems: React.FC<{ renderListItems: RenderProps }> = (
  props
) => {
  const { title, date, link } = props.renderListItems;
  return (
    <>
      <article className={styles.flat_link}>
        <time className={styles.flat_link_date} dateTime={date}>
          {dayjs(date).format("YYYY/MM/DD")}
        </time>
        {isInsidePath(link) ? (
          <Link className={styles.flat_link_title} href={link}>
            {title}
          </Link>
        ) : (
          <a
            className={styles.flat_link_title}
            href={link}
            target="_blank"
            rel="noreferrer noopener"
          >
            {title}
          </a>
        )}
      </article>
    </>
  );
};
export function getList(tabName: string, renderList: RenderProps[]) {
  if (tabName !== "All") {
    const data = renderList.filter((list) => {
      return list.category === tabName;
    });
    return data;
  }
  return renderList;
}
