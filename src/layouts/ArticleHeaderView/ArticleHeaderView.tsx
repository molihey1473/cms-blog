import { Wrapper } from "@src/components/Wrapper";
export const ArticleHeaderView: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <>
      <header>
        <Wrapper>{props.children}</Wrapper>
      </header>
    </>
  );
};
