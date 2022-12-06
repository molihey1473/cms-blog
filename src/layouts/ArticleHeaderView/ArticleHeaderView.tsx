export const ArticleHeaderView: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <>
      <header>{props.children}</header>
    </>
  );
};
