export interface Member {
  name: string;
  avatar: string;
  source: string[];
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
