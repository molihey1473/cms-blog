export interface Member {
  name: string;
  avatar: string;
  sources: string[];
  twitterName: string;
  githubName: string;
  bio: string;
}
export interface PostItem {
  authorName?: string;
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
export interface ArticleItems {
  id: string;
  title: string;
  //body: ArticleBodyItems[];
  body: string;
  publishedAt: string;
  category: { name: string[] };
  createdAt?: string;
  updatedAt?: string;
  tags?: { name: string; id: string }[] | undefined;
  //tags?: TagItems[];
  meta?: { image: { url: string } } | null;
}
export interface ArticleBodyItems {
  markdown: string;
  language: string | undefined;
  code: string | undefined;
}
/* カテゴリー分けされた記事一覧*/
//export interface SortedArticleList {
//  id: string;
//  title: string;
//  publishedAt: string;
//  category: { name: string[] };
//  tags: string[];
//}

//タグ付けされたページ getStaticPaths at /tags/[name].tsx
export interface Taglinks {
  contents: { name: string }[];
}
// 記事内関連記事リンク
export interface TagItems {
  name: string;
  id: string;
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
/* 記事一覧Article List */
export interface ArticleList {
  id: string;
  title: string;
  publishedAt: string;
  tags?: { name: string }[];
  meta?: { image: { url: string } } | null;
}

/* 記事投稿日 */
export interface PublishDate {
  publishedAt: string;
  updatedAt: string;
}
/* 記事投稿前プレビュー*/
export interface PreviewDate {
  createdAt: string;
  updatedAt: string | undefined;
}
