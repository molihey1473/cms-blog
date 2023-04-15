import Link from "next/link";

import React from "react";

import dayjs from "dayjs";

import { getArticlePath } from "@src/utils/helper";

import { TagList } from "@src/features/Top/components/TagList";
import styles from "@src/styles/pages/blog/BlogList.module.scss";

import PostListData from "../../.contents/posts.json";

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

interface RenderProps {
  readonly category: string;
  readonly title: string;
  readonly contentSnippet: string | null;
  readonly link: string;
  readonly date: string;
  readonly dateMiliSeconds: number;
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
          <PostArticleList postListData={PostListData} />
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
export const PostArticleList: React.FC<{
  postListData: OtherProps[];
}> = (props) => {
  const { postListData } = props;
  return (
    <>
      <div className={styles.flat_list}>
        {postListData.map((listItem, i) => (
          <PostListItems key={`BlogFlat-${i}`} listItem={listItem} />
        ))}
      </div>
    </>
  );
};
export const PostListItems: React.FC<{ listItem: OtherProps }> = (props) => {
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
export const RenderArticleList: React.FC<{
  tabName: string;
  renderList: RenderProps[];
}> = ({ tabName, renderList }) => {
  const listData = getList(tabName, renderList);
  return (
    <>
      <div className={styles.flat_list}>
        {listData.map((listItem, i) => (
          <RenderListItems key={`Rendet-List${i}`} renderListItems={listItem} />
        ))}
      </div>
    </>
  );
};
export const RenderListItems: React.FC<{ renderListItems: RenderProps }> = (
  props
) => {
  const { title, date, link } = props.renderListItems;
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
export function getList(tabName: string, renderList: RenderProps[]) {
  if (tabName !== "All") {
    const data = renderList.filter((list) => {
      return list.category === tabName;
    });
    return data;
  }
  return renderList;
}
