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
export interface Blog {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  category?: string;
}
