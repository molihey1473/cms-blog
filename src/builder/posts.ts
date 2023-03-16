import { ensureDirSync, writeJsonSync } from "fs-extra";
import fetch from "node-fetch";
import Parser from "rss-parser";

import { FeedItem } from "@src/types/types";

import { BLOG_API } from "@src/utils/blogInfo";
import { member } from "@src/utils/member";

import { scriptENV } from "@.env.config";

//  # import { member } from "@src/utils/member" だとError: Cannot find module '@src/utils/member'になる
//export default {};
interface fetchData {
  title: string;
  id: string;
  publishedAt: string;
  updatedAt: string;
  tags: { name: string }[];
}

const parser = new Parser();
export async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url);
  if (!feed?.items?.length) return [];
  return feed.items
    .map(({ title, link, contentSnippet, isoDate }) => {
      return {
        category: "Other",
        title,
        contentSnippet: contentSnippet?.replace(/\n/g, ""),
        link,
        date: isoDate,
        dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
        tags: [],
      };
    })
    .filter(({ title, link }) => title && link) as FeedItem[];
}
export async function getFeedItemsFromSources(
  sources: undefined | readonly string[]
) {
  if (!sources?.length) return [];
  let feedItems: FeedItem[] = [];
  const data = await fetchArticleDataFromMicroCMS();
  for (const url of sources) {
    const items = await fetchFeedItems(url);
    if (items) feedItems = [...feedItems, ...items];
  }
  return [...feedItems, ...data];
}
export async function fetchArticleDataFromMicroCMS(): Promise<FeedItem[]> {
  const data = await fetchFromMicroCMS();
  if (!data?.length) return [];
  return data.map(({ title, id, publishedAt, updatedAt, tags }) => {
    const tagList = tags?.map((item) => item.name);
    return {
      category: "MicroCMSArticle",
      title,
      contentSnippet: null,
      link: `/articles/${id}`,
      date: updatedAt || publishedAt,
      dateMiliSeconds: publishedAt ? new Date(publishedAt).getTime() : 0,
      tags: tagList,
    };
  });
}
export async function fetchFromMicroCMS(): Promise<fetchData[]> {
  const data = await fetch(BLOG_API, scriptENV)
    .then((res) => res.json())
    .catch((error) => console.log("通信失敗", error));
  const resultData = data.contents as fetchData[];
  return resultData || [];
}
(async function () {
  const items = await getFeedItemsFromSources(member.sources);
  items.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);
  ensureDirSync(".contents");
  writeJsonSync(".contents/posts.json", items);
})();
