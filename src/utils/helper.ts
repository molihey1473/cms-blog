export const getArticlePath = (id: string) => {
  return `/articles/${id}`;
};
export const getTagPath = (tag: string) => {
  const name = tag.toLowerCase();
  return `/tags/${name}`;
};
