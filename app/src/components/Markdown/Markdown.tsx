import { createEffect, JSX } from "solid-js";

import { marked } from "marked";
import { markedEmoji } from "marked-emoji";
import { markedForms } from "marked-forms";
import { allEmojis } from "./emoji";

const options = {
  emojis: allEmojis,
  unicode: true,
};

marked.use(markedEmoji(options));

export const Markdown = ({
  content,
  style,
}: {
  content: string;
  style?: string | JSX.CSSProperties | undefined;
}) => {
  let refContent: HTMLDivElement;

  createEffect(() => {
    if (!refContent) return;
    refContent.innerHTML = marked.parse(content);
  });

  return <div ref={(e) => (refContent = e)} style={style}></div>;
};
