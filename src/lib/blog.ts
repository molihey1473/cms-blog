// microCMS API KEY
const key = {
  headers: {
    "X-API-KEY": process.env.API_KEY ?? "",
  },
};
export const getBlog = async () => {
  return await fetch("https://roy1473.microcms.io/api/v1/blog", key)
    .then((res) => res.json())
    .catch(() => null);
};
export const getBlogContent = () => {};
