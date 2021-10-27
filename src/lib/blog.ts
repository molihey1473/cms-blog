import { BLOG_API, TAG_API, CATEGORY_API } from "@src/utils/blogInfo";
import { ArticleItems, ArticleBodyItems } from "@src//types";
import { highlight, languages } from "prismjs";
import { ArticleBody } from "@src/components/articles/ArticleBody";
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
    .catch(() => null);
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
  draftKey?: string
): Promise<ArticleItems> => {
  const params = draftKey ? `?draftKey=${draftKey}` : "";
  const articleData = await fetch(`${BLOG_API}${id}${params}`, key)
    .then((res) => res.json())
    .catch((error) => null);
  getCodeHighlight(articleData.body);
  return articleData;
};

//記事内ソースコートをハイライト処理
export const getCodeHighlight = (body: ArticleBodyItems[]) => {
  for (const bodyItem of body) {
    if (bodyItem.code !== null) {
      bodyItem.code = highlight(
        bodyItem.code,
        languages[bodyItem.language],
        bodyItem.language
      );
    } else {
      return body;
    }
  }
};

//get data for [name].tsx (getCategoryとほぼ同一メソッドなので修正検討中)
export const getTags = async (name?: string) => {
  const nameSlug = name
    ? `?filters=name${encodeURIComponent(`[contains]${name}`)}`
    : "";
  const url = name ? `${TAG_API}${nameSlug}` : `${TAG_API}`;
  return await fetch(url, key)
    .then((res) => res.json())
    .catch((error) => null);
};
// get data for /category/[name].tsx (getTagとほぼ同一メソッドなので修正検討中)
export const getCategory = async (): Promise<string[]> => {
  const path = CATEGORY_API;
  const data = await fetch(path, key)
    .then((res) => res.json())
    .catch((error) => null);
  return data.contents.map((item, i) => {
    return `/category/${item.name[0]}`;
  });
};
