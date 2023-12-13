import Link from "next/link";

import React from "react";

import dayjs from "dayjs";

import { JsonProps } from "@src/types/types";

import { getFilterList } from "@src/utils/helper";

import JsonData from "@.contents/posts.json";
import { TagList } from "@src/features/Top/components/TagList";

import styles from "./ArticleList.module.scss";
//interface JsonProps {
//  readonly isInternalLink: boolean;
//  readonly category: string;
//  readonly title: string;
//  readonly contentSnippet: string;
//  readonly link: string;
//  readonly date: string;
//  readonly dateMiliSeconds: number;
//  readonly tags: string[];
//}

//interface AllProps {
//  id: string;
//  title: string;
//  publishedAt: string;
//  tags: string[] | [];
//}

//interface OtherProps {
//  category: string;
//  title: string;
//  link: string;
//  isoDate?: string;
//}

export const ArticleList: React.FC<{ tagName: string | undefined }> = (
  props
) => {
  const { tagName } = props;
  const preData = JsonData as JsonProps[];
  const JsonListData = tagName ? getFilterList(tagName, preData) : preData;
  return (
    <>
      {JsonListData.length !== 0 && (
        <div className={styles.flat_list}>
          {JsonListData.map((listItem, i) => (
            <ArticleListItems key={`BlogFlat-${i}`} listItem={listItem} />
          ))}
        </div>
      )}
    </>
  );
};

export const ArticleListItems: React.FC<{
  listItem: JsonProps;
}> = (props) => {
  const { link, title, date, tags, isInternalLink } = props.listItem;
  return (
    <>
      <article className={styles.flat_link}>
        <time className={styles.flat_link_date} dateTime={date}>
          {dayjs(date).format("YYYY/MM/DD")}
        </time>
        {isInternalLink ? (
          <Link className={styles.flat_link_title} href={link}>
            {title}
          </Link>
        ) : (
          <a
            href={link}
            target="blank"
            rel="noreferrer noopener"
            className={styles.flat_link_title}
          >
            {title}
          </a>
        )}
        {tags.length !== 0 && <TagList tags={tags} />}
      </article>
    </>
  );
};
export const RSSArticleList: React.FC<{
  JsonListData: JsonProps[];
}> = (props) => {
  const { JsonListData } = props;
  return (
    <>
      <div className={styles.flat_list}>
        {JsonListData.map((listItem, i) => (
          <RSSArticleListItem key={`BlogFlat-${i}`} listItem={listItem} />
        ))}
      </div>
    </>
  );
};
export const RSSArticleListItem: React.FC<{ listItem: JsonProps }> = (
  props
) => {
  const { title, link, date } = props.listItem;
  return (
    <>
      <article className={styles.flat_link}>
        <time className={styles.flat_link_date} dateTime={date}>
          {dayjs(date).format("YYYY/MM/DD")}
        </time>
        <a
          className={styles.flat_link_title}
          href={link}
          target="_blank"
          rel="noreferrer noopener"
        >
          {title}
        </a>
      </article>
    </>
  );
};
