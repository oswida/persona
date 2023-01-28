import { Component } from "solid-js";
import { TabDesc, Tabs } from "~/components";
import { Tpl } from "~/templates/types";
import { renderPage } from "./render";

type Props = {
  tpl: Tpl;
};

export const TplView: Component<Props> = ({ tpl }) => {
  const tabs: TabDesc[] = tpl.pages.map((it) => ({
    value: it.id,
    label: it.title,
    content: renderPage(it),
  }));

  return <Tabs items={tabs} />;
};
