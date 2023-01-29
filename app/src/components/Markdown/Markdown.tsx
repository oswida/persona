import { Accessor, createEffect, JSX } from "solid-js";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";
import { gfmTable } from "micromark-extension-gfm-table";

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
    refContent.innerHTML = micromark(content, {
      extensions: [gfm(), gfmTable],
      htmlExtensions: [gfmHtml(), gfmTable],
    });
  });

  return <div ref={(e) => (refContent = e)} style={style}></div>;
};
