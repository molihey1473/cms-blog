export const ArticleHeader: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <>
      <header>{props.children}</header>
    </>
  );
};
