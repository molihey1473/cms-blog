import { parse } from "twemoji-parser";

import React from "react";

export const TwemojiP: React.FC<{ emoji: { url: string }[] }> = (props) => {
  const { emoji } = props;
  const parseEmoji = parse(emoji);

  console.log(parseEmoji);
  return (
    <>
      <img src={emoji[0].url} />
    </>
  );
};
