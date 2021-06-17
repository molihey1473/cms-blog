import { BLOG_API, TAG_API, CATEGORY_API } from "@src/utils/blogInfo";
import { Console } from "console";
// microCMS API KEY
const key = {
  headers: {
    "X-API-KEY": process.env.API_KEY ?? "",
  },
};

//get data for [id].tsx 記事一覧data
export const getBlogs = async (id?: string) => {
  const url = id ? `${BLOG_API}blog/${id}` : `${BLOG_API}`;
  return await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);
};
// preview for [id].tsx
export const getPreview = async (id: string, draftKey?: string) => {
  const params = draftKey ? `?draftKey=${draftKey}` : "";
  return await fetch(`${BLOG_API}${id}${params}`, key)
    .then((res) => res.json())
    .catch((error) => null);
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
export const getCategory = async (name?: string) => {
  const nameSlug = name
    ? `?filters=name${encodeURIComponent(`[contains]${name}`)}`
    : "";
  const url = name ? `${CATEGORY_API}${nameSlug}` : `${CATEGORY_API}`;
  return await fetch(url, key)
    .then((res) => res.json())
    .catch((error) => null);
};
