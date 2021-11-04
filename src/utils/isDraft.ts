interface Draft {
  draftKey: string;
}
export const isDraft = (arg: any): arg is Draft => {
  if (!arg?.draftkey) {
    return false;
  }
  return typeof arg?.draftKey === "string";
};
