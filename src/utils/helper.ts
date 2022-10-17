export function getArticlePath(id: string) {
  return `/articles/${id}`;
}
export function getTagPath(tag: string) {
  const name = tag?.toLowerCase();
  return `/tags/${name}`;
}

export function isDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`expected 'val' to be defined, but but val was ${val} `);
  }
}
export function getShareUrlPath(id: string, title: string) {
  return `http://twitter.com/share?url=https://blog-sage-nine.vercel.app/articles/${id}&text=${encodeURIComponent(
    title
  )}`;
}
