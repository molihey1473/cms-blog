import { Grammar, highlight, languages } from "prismjs";
import Parser from "rss-parser";

import { ArticleItems, FeedItem } from "@src/types/types";

import { BLOG_API, TAG_API, CATEGORY_API } from "@src/utils/blogInfo";
import { isDefined } from "@src/utils/helper";

//fetchデータ型
interface fetchData {
  title: string;
  id: string;
  publishedAt: string;
  updatedAt: string;
  tags: { name: string }[];
}
// microCMS API KEY
const key = {
  headers: {
    "X-MICROCMS-API-KEY": process.env.API_KEY ?? "",
  },
};
const parser = new Parser();
// RSSから記事データ取得
export async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url);
  if (!feed?.items?.length) return [];
  return feed.items
    .map(({ title, link, contentSnippet, isoDate }) => {
      return {
        isInternalLink: false,
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
//microCMSから取得したデータを形成
export async function fetchArticleDataFromMicroCMS(): Promise<FeedItem[]> {
  const data = await fetchFromMicroCMS();
  if (!data?.length) return [];
  return data.map(({ title, id, publishedAt, updatedAt, tags }) => {
    const tagList = tags?.map((item) => item.name);
    return {
      isInternalLink: true,
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
//microCMSからデータ取得
export async function fetchFromMicroCMS(): Promise<fetchData[]> {
  const data = await fetch(BLOG_API, key)
    .then((res) => res.json())
    .catch((error) => console.log("通信失敗", error));
  const resultData = data.contents as fetchData[];
  return resultData || [];
}

//get data for [id].tsx 記事一覧data
export async function getAllArticles(
  path?: string
): Promise<{ contents: ArticleItems[] }> {
  //const url = path ? `${BLOG_API}blog/${path}` : `${BLOG_API}`;
  const allArticle = await fetch(BLOG_API, key)
    .then((res) => res.json())
    .catch((error) => console.error("通信失敗", error));
  return path ? await getSortedData(path, allArticle) : allArticle;
}
export const getSortedData = async (
  path: string,
  allArticle: { contents: ArticleItems[] }
) => {
  return allArticle.contents.filter((items): boolean => {
    return items.category.name[0] === path;
  });
};
// preview for [id].tsx
export async function getArticleContent(
  id: string,
  draftKey: string | undefined
): Promise<ArticleItems> {
  const params = draftKey ? `?draftKey=${draftKey}` : "";
  const articleData = await fetch(`${BLOG_API}${id}${params}`, key)
    .then((res) => res.json())
    .catch((error) => console.error("エラーが発生", error));
  console.log("getarticleVontent", articleData.body);
  const highlightBody = hArticle(articleData.body);
  articleData.body = highlightBody;
  return articleData;
}

//記事内ソースコートをハイライト処理
//export const getCodeHighlight = (body: ArticleBodyItems[]) => {
//  for (const bodyItem of body) {
//    if (!bodyItem?.code) {
//      bodyItem.code = highlight(
//        bodyItem.code,
//        languages[bodyItem.lang],
//        bodyItem.lang
//      );
//      console.log(bodyItem.code);
//    }
//  }
//};
type TestA = {
  fieldId: "codeContent";
  language: string;
  code: string;
};
type TestB = {
  fieldId: "markContent";
  markdown: string;
};
type articleBody = TestA | TestB;
//export const addHighlight = (body: articleBody[]): void => {
//  for await (const value of body) {
//    if (value.fieldId === "codeContent") {
//      const gura = languages[value.lang];
//      if (gura && value.fieldId === "codeContent") {
//        const codeHtml = highlight(value.code, gura, value.lang);
//        value.markdown = `<div className="blog_content_body">${
//          value.markdown
//        }<div className="code-container"><pre className=${`language-${value.lang}`}><code className=${`language-${value.lang}`}>${codeHtml}</code></pre></div></div>`;
//      }
//      value.markdown = `<div className="blog_content_body">${value.markdown}</div>`;
//    }
//    //return { body: body[0]?.markdown };
//  }
//};

export function hArticle(body: articleBody[]): string {
  const articleData = body?.reduce((sum: string, item: articleBody) => {
    if (item.fieldId === "codeContent") {
      const codeLang = languages[item.language];
      isDefined(codeLang);
      const hCode = highlightCode(item.code, codeLang, item.language);
      return sum + hCode;
    } else {
      return sum + item.markdown;
    }
    //if (item.fieldId === "markContent") {
    //  return sum + item.markdown;
    //} else {
    //  const codeLang = languages[item.language];
    //  console.log(codeLang);
    //  if (codeLang && item.code) {
    //    const hCode = highlightCode(item.code, codeLang, item.language);
    //    console.log("ハイライト");
    //    return sum + hCode;
    //  }
    //  return sum;
    //}
  }, "");
  return articleData;
}
export function highlightCode(
  code: string,
  grammar: Grammar,
  lang: string
): string {
  const codeWithStyle = highlight(code, grammar, lang);
  const markdown = `<div className="code-container"><pre className=${`language-${lang}`}><code className=${`language-${lang}`}>${codeWithStyle}</code></pre></div>`;
  //console.log(markdown);
  return markdown;
}

//get data for [name].tsx (getCategoryとほぼ同一メソッドなので修正検討中)
export async function getTags<T>(name?: string): Promise<T> {
  if (name) {
    const nameSlug = `?depth=2&filters=name${encodeURIComponent(
      `[contains]${name}`
    )}`;
    const url = `${TAG_API}${nameSlug}`;
    const preData = await fetch(url, key)
      .then((res) => res.json())
      .catch((error) => console.error("エラーが発生", error));
    return preData.contents[0]?.content;
  } else {
    return await fetch(TAG_API, key)
      .then((res) => res.json())
      .catch((error) => console.error("エラーが発生", error));
  }
}
// get data for /category/[name].tsx (getTagとほぼ同一メソッドなので修正検討中)
export async function getCategory(): Promise<string[]> {
  const path = CATEGORY_API;
  const data = await fetch(path, key)
    .then((res) => res.json())
    .catch((error) => console.error("エラーが発生", error));
  return data.contents.map((item: { name: string[] }) => {
    return `/category/${item.name[0]}`;
  });
}
export async function getFilterArticleList(
  tagName: string,
  articleLists: FeedItem[]
) {
  const filterList = articleLists.filter((list) => {
    if (list.tags.length === 0) return;
    return list.tags.some((item) => item.toLowerCase() === tagName);
  });
  return filterList;
}
