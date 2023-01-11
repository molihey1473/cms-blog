export const ArticleHeaderView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <header>{children}</header>
    </>
  );
};
