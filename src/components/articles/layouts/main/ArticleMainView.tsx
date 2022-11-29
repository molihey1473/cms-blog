import { Wrapper } from "@src/components/Wrapper";
export const ArticleMainView: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <>
      <Wrapper> {props.children}</Wrapper>
    </>
  );
};
