import { Grammar, highlight, languages } from "prismjs";

import { ArticleItems } from "@src/types/types";

import { BLOG_API, TAG_API, CATEGORY_API } from "@src/utils/blogInfo";

// microCMS API KEY
const key = {
  headers: {
    "X-API-KEY": process.env.API_KEY ?? "",
  },
};

//get data for [id].tsx 記事一覧data
export const getBlogs = async (
  path?: string
): Promise<{ contents: ArticleItems[] }> => {
  //const url = path ? `${BLOG_API}blog/${path}` : `${BLOG_API}`;
  const allArticle = await fetch(BLOG_API, key)
    .then((res) => res.json())
    .catch((error) => console.error("通信失敗", error));
  return path ? await getSortedData(path, allArticle) : allArticle;
};
export const getSortedData = async (
  path: string,
  allArticle: { contents: ArticleItems[] }
) => {
  return allArticle.contents.filter((items): boolean => {
    return items.category.name[0] === path;
  });
};
// preview for [id].tsx
export const getPreview = async (
  id: string,
  draftKey: string
): Promise<ArticleItems> => {
  const params = draftKey ? `?draftKey=${draftKey}` : "";
  const articleData = await fetch(`${BLOG_API}${id}${params}`, key)
    .then((res) => res.json())
    .catch((error) => console.error("エラーが発生", error));
  //const body = fixArticle(articleData.body);
  //getCodeHighlight(articleData.body);
  const highlightBody = hArticle(articleData.body);
  articleData.body = highlightBody;
  return articleData;
  //return articleData;
};

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
  type: "ok";
  //markdown: string;
  language: string;
  code: string;
};
type TestB = {
  type: "no";
  markdown: string;
};
type reduceBody = TestA | TestB;
//export const fixArticle = (body: reduceBody[]): { body: string } => {
//  for (const value of body) {
//    if (value.type === "ok") {
//      const gura = languages[value.lang];
//      if (gura) {
//        const codeHtml = highlight(value.code, gura, value.lang);
//        value.markdown = `<div className="blog_content_body">${
//          value.markdown
//        }<div className="code-container"><pre className=${`language-${value.lang}`}><code className=${`language-${value.lang}`}>${codeHtml}</code></pre></div></div>`;
//      }
//    } else {
//      value.markdown = `<div className="blog_content_body">${value.markdown}</div>`;
//    }
//  }
//  return { body: body[0]?.markdown };
//};
export const hArticle = (body: reduceBody[]): string => {
  const articleData = body.reduce<string>((sum: string, item: reduceBody) => {
    if (typeof item.code !== "string" && typeof item.language !== "string") {
      console.log("コードなし");
      return sum + item.markdown;
    } else {
      const codeLang = languages[item.language];
      if (codeLang && item.code) {
        const hCode = highlightCode(item.code, codeLang, item.language);
        console.log("ハイライト");
        return sum + hCode;
      }
    }
    console.log(sum);
    return sum + "失敗";
  }, "");

  return articleData;
};
export const highlightCode = (
  code: string,
  grammar: Grammar,
  lang: string
): string => {
  const codeWithStyle = highlight(code, grammar, lang);
  const markdown = `<div className="code-container"><pre className=${`language-${lang}`}><code className=${`language-${lang}`}>${codeWithStyle}</code></pre></div>`;
  //console.log(markdown);
  return markdown;
};

//get data for [name].tsx (getCategoryとほぼ同一メソッドなので修正検討中)
export const getTags = async <T>(name?: string): Promise<T> => {
  if (typeof name === "string") {
    const nameSlug = `?filters=name${encodeURIComponent(`[contains]${name}`)}`;
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
};
// get data for /category/[name].tsx (getTagとほぼ同一メソッドなので修正検討中)
export const getCategory = async (): Promise<string[]> => {
  const path = CATEGORY_API;
  const data = await fetch(path, key)
    .then((res) => res.json())
    .catch((error) => console.error("エラーが発生", error));
  return data.contents.map((item: { name: string[] }) => {
    return `/category/${item.name[0]}`;
  });
};
