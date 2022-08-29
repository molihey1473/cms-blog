export function getArticlePath(id: string) {
  return `/articles/${id}`;
}
export function getTagPath(tag: string) {
  const name = tag?.toLowerCase();
  return `/tags/${name}`;
}
