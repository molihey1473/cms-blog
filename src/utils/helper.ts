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
