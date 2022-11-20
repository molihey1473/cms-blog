import { Wrapper } from "@src/components/Wrapper";
export const ArticleMain: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <>
      <Wrapper> {props.children}</Wrapper>
    </>
  );
};
