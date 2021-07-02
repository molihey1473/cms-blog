import { NextPage } from "next";
import posts from ".contents/posts.json";
import { WideWrapper } from "@src/components/WideWrapper";
import { CategoryList } from "@src/components/CategoryList";

import { PostList } from "@src/components/PostList";
const Page: NextPage = () => {
  return (
    <>
      <WideWrapper>
        <div>otherのpage</div>
      </WideWrapper>
      <WideWrapper>
        <CategoryList />
      </WideWrapper>

      <WideWrapper>
        <PostList items={posts} />
      </WideWrapper>
    </>
  );
};
export default Page;
