import { useState } from "react";
import { PostItem } from "@src/types";
import { PostLink } from "@src/components/PostLink";
export const PostList: React.FC<{ items: PostItem[] }> = (props) => {
  const [postItemCount, setPostItemCount] = useState<number>(32);
  const totalItemCount = props.items?.length || 0;
  if (postItemCount) {
    return <div>記事はありません</div>;
  }
  return (
    <>
      <div></div>
    </>
  );
};
