import Link from "next/link";

import React from "react";

import dayjs from "dayjs";

import { getArticlePath } from "@src/utils/helper";

import PostListData from "@.contents/posts.json";
import { TagList } from "@src/features/Top/components/TagList";

import styles from "./ArticleList.module.scss";

interface AllProps {
  id: string;
  title: string;
  publishedAt: string;
  tags: { name: string }[] | [];
}
interface OtherProps {
  category: string;
  title: string;
  link: string;
  isoDate?: string;
}

//export const BlogLink: React.FC<{ item: ArticleList }> = (props) => {
//  const { id, title, publishedAt } = props.item;
//  return (
//    <article className={styles.blog_link}>
//      <Link href={`/articles/${id}`}>
//        <a className={styles.blog_link_content}>
//          <div className={styles.blog_main_image}></div>
//          <div className={styles.blog_at}>
//            <time dateTime={publishedAt}>
//              {dayjs(publishedAt).format("YYYY/MM/DD")}
//            </time>
//          </div>
//          <div className={styles.blog_main_title}>
//            <h3 className={styles.blog_link_title}>{title}</h3>
//          </div>
//        </a>
//      </Link>
//    </article>
//  );
//};
//export const BlogList: React.FC<{ items: ArticleItems[] }> = (props) => {
//  return (
//    <div className={styles.blog_list}>
//      {props.items.map((data, i) => (
//        <BlogLink key={`BlogLink-${i}`} item={data} />
//      ))}
//    </div>
//  );
//};

export const ArticleList: React.FC<{ articleListData: AllProps[] | [] }> = (
  props
) => {
  const { articleListData } = props;
  return (
    <>
      <div className={styles.flat_list}>
        {articleListData.length !== 0 ? (
          articleListData.map((listItem, i) => (
            <ArticleListItems key={`BlogFlat-${i}`} listItem={listItem} />
          ))
        ) : (
          <RSSArticleList postListData={PostListData} />
        )}
      </div>
    </>
  );
};
export const ArticleListItems: React.FC<{
  listItem: AllProps;
}> = (props) => {
  const { id, title, publishedAt, tags } = props.listItem;
  return (
    <>
      <article className={styles.flat_link}>
        <time className={styles.flat_link_date} dateTime={publishedAt}>
          {dayjs(publishedAt).format("YYYY/MM/DD")}
        </time>
        <Link href={getArticlePath(id)} className={styles.flat_link_title}>
          {title}
        </Link>
        {tags.length !== 0 && <TagList tags={tags} />}
      </article>
    </>
  );
};
export const RSSArticleList: React.FC<{
  postListData: OtherProps[];
}> = (props) => {
  const { postListData } = props;
  return (
    <>
      <div className={styles.flat_list}>
        {postListData.map((listItem, i) => (
          <RSSArticleListItem key={`BlogFlat-${i}`} listItem={listItem} />
        ))}
      </div>
    </>
  );
};
export const RSSArticleListItem: React.FC<{ listItem: OtherProps }> = (
  props
) => {
  const { title, link, isoDate } = props.listItem;
  return (
    <>
      <article className={styles.flat_link}>
        <time className={styles.flat_link_date} dateTime={isoDate}>
          {dayjs(isoDate).format("YYYY/MM/DD")}
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
