import { BLOG_API, TAG_API } from "@src/utils/blogInfo";
// microCMS API KEY
const key = {
  headers: {
    "X-API-KEY": process.env.API_KEY ?? "",
  },
};

//get data for [id].tsx
export const getBlog = async (id?: string) => {
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

//get data for [name].tsx
export const getTags = async (id?: string, name?: string) => {
  const url = id ? `${TAG_API}${id}` : `${TAG_API}`;
  return await fetch(url, key)
    .then((res) => res.json())
    .catch((error) => null);
};
