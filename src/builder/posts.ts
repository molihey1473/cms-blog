import Parser from "rss-parser";
import fs from "fs-extra";
import { member } from "@src/utils/member";

import { Member, PostItem, FeedItem } from "@src/types";
const parser = new Parser();
let allPostItem: PostItem[] = [];
async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url);
  if (!feed?.items?.length) return [];
  return feed.items
    .map(({ title, link, contentSnippet, isoDate }) => {
      console.log(contentSnippet);
      return {
        title,
        contentSnippet: contentSnippet?.replace(/\n/g, ""),
        link,
        isoDate,
        dateMileSeconds: isoDate ? new Date(isoDate).getTime() : 0,
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
  const items = await getFeedItemsFromSources(member.sources);
  if (!items) return [];
  items.sort((a, b) => {
    return b.dateMiliSeconds - a.dateMiliSeconds;
  });
  fs.ensureDirSync(".contents");
  fs.writeJsonSync("contents/posts.json", items);
})();
