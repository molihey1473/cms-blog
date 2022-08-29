interface Draft {
  draftKey: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isDraft(arg: any): arg is Draft {
  if (!arg?.draftKey) {
    return false;
  }
  return typeof arg?.draftKey === "string";
}
