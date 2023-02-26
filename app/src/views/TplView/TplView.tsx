import { Template, Viewer } from "@pdfme/ui";
import { Component, createEffect } from "solid-js";
import { TabDesc, Tabs } from "~/components";
import { Tpl } from "~/templates/types";
import { renderPage } from "./render";

type Props = {
  tpl: Tpl;
};

export const TplView: Component<Props> = ({ tpl }) => {
  createEffect(() => {
    const domContainer = document.getElementById("pdf-container")!;
    if (!domContainer) return;
    const template: Template = {
      basePdf: "cs/wfrp-pl.pdf",
      schemas: [],
    };
    const inputs = [{}];
    const viewer = new Viewer({ options: {}, domContainer, template, inputs });
  });

  return <div id="pdf-container"></div>;
};
