export interface Member {
  name: string;
  avatar: string;
  sources: string[];
  twitterName: string;
  githubName: string;
  bio: string;
}
export interface PostItem {
  authorName: string;
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMiliSeconds: number;
}
export interface FeedItem {
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMiliSeconds?: number;
}
// /blog/[id].tsx 記事データ
// tags:TagItemsだとcomponents内で反応しないため。tags:TagItems -> tags?: { name: string; id: string }[];に変更
export interface BlogItem {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: { name: string; id: string }[];
  //tags?: TagItems;
}
// 記事内関連記事リンク
export interface TagItems {
  tags: { name: string; id: string }[];
}
//　/tags/[id].tsx
export interface TaggedBlogs {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
  name?: string;
  content: TaggedList[];
}
export interface TaggedList {
  id: string;
  title: string;
  publishedAt: string;
}
