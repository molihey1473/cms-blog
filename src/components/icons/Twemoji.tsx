import { parse } from "twemoji-parser";

import React from "react";

export const TwemojiP: React.FC<{ emoji: string }> = (props) => {
  const { emoji } = props;
  const parseEmoji = parse(emoji);

  console.log(parseEmoji);
  return (
    <>
      <img src={parseEmoji[0].url} />
    </>
  );
};
