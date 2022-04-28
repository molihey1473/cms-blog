import { ensureDirSync, writeJsonSync } from "fs-extra";
import Parser from "rss-parser";

import { FeedItem } from "@src/types/types";

import { member } from "@src/utils/member";

//  # import { member } from "@src/utils/member" だとError: Cannot find module '@src/utils/member'になる
//export default {};
const parser = new Parser();
async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url);
  if (!feed?.items?.length) return [];
  return feed.items
    .map(({ title, link, contentSnippet, isoDate }) => {
      return {
        title,
        contentSnippet: contentSnippet?.replace(/\n/g, ""),
        link,
        isoDate,
        dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
      };
    })
    .filter(({ title, link }) => title && link) as FeedItem[];
}
async function getFeedItemsFromSources(sources: undefined | string[]) {
  if (!sources?.length) return [];
  let feedItems: FeedItem[] = [];
  for (const url of sources) {
    const items = await fetchFeedItems(url);
    if (items) feedItems = [...feedItems, ...items];
  }
  return feedItems;
}
(async function () {
  const items = (await getFeedItemsFromSources(member.sources)) ?? [];
  items.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);
  ensureDirSync(".contents");
  writeJsonSync(".contents/posts.json", items);
})();
