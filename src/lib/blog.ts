// microCMS API KEY
const key = {
  headers: {
    "X-API-KEY": process.env.API_KEY ?? "",
  },
};
export const getBlog = async (id: string) => {
  return await fetch("https://roy1473.microcms.io/api/v1/blog", key)
    .then((res) => res.json())
    .catch(() => null);
};
export const getBlogContent = async (
  id: string,
  draftKey?: string | string[]
) => {
  const query = draftKey ? `?draftKey=${draftKey}` : "";
  return await fetch(
    `https://roy1473.microcms.io/api/v1/blog/${id}${draftKey}`,
    key
  )
    .then((res) => res.json())
    .catch((error) => null);
};
