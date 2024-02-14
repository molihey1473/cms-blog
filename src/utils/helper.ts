import { FeedItem } from "@src/types/types";

import { config } from "blog.config";
export function getArticlePath(id: string) {
  return `/articles/${id}`;
}
export function getTagPath(tag: string) {
  const name = tag?.toLowerCase().replace(/\./g, "");
  return `/tags/${name}`;
}

export function isDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`expected 'val' to be defined, but but val was ${val} `);
  }
}
export function getShareUrlPath(id: string, title: string) {
  return `http://twitter.com/share?url=${
    config.siteRoot
  }/articles/${id}&text=${encodeURIComponent(title)}`;
}
export function isInsidePath(link: string) {
  return link.startsWith("/articles/");
}
export function getFilterList<T extends FeedItem>(
  name: string,
  list: T[]
): T[] {
  const tagName = name;
  const arrayList = list.filter((item) => {
    return item.tags.some((tag) => tag.toLowerCase() === tagName);
  });
  return arrayList;
}
