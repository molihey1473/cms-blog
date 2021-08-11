import Parser from "rss-parser";
import fs from "fs-extra";
//  # import { member } from "@src/utils/member" だとError: Cannot find module '@src/utils/member'になる
import { member } from "../utils/member";
import { PostItem, FeedItem } from "../types";
export default {};
const parser = new Parser();
//let allPostItems: PostItem[] = [];
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
  fs.ensureDirSync(".contents");
  fs.writeJsonSync(".contents/posts.json", items);
})();
