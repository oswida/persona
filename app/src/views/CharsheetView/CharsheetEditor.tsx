import { Template, Viewer } from "@pdfme/ui";
import { Accessor, Component, createEffect, createMemo } from "solid-js";
import { CharsheetData, csTemplateList } from "~/common";
import { CsEditStyle } from "./styles.css";

type Props = {
  cs: Accessor<CharsheetData | null | undefined>;
};

export const CharsheetEditor: Component<Props> = ({ cs }) => {
  const name = createMemo(() => {
    return cs()?.name;
  });

  createEffect(() => {
    const domContainer = document.getElementById("pdf-container")!;
    const c = cs();
    if (!domContainer || !c) return;
    const tpl = csTemplateList()[c.templateId];
    if (!tpl) return;
    const template: Template = {
      basePdf: tpl.file,
      schemas: tpl.schemas,
    };
    const inputs = [{}];
    const viewer = new Viewer({ options: {}, domContainer, template, inputs });
  });

  return (
    <div class={CsEditStyle}>
      <div id="pdf-container" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};
