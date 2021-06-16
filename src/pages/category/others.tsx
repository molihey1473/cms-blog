import { NextPage } from "next";
import posts from ".contents/posts.json";
import { Wrapper } from "@src/components/Wrapper";
import { PostList } from "@src/components/PostList";
const Page: NextPage = () => {
  return (
    <>
      <Wrapper>
        <div>otherのpage</div>
      </Wrapper>
      <Wrapper>
        <PostList items={posts} />
      </Wrapper>
    </>
  );
};
export default Page;
