import { Component } from "solid-js";
import { Tabs, TabsDesc } from "~/components";
import { Tpl } from "~/templates/types";
import { renderPage } from "./render";

type Props = {
  tpl: Tpl;
};

export const TplView: Component<Props> = ({ tpl }) => {
  const tabs: TabsDesc[] = tpl.pages.map((it) => ({
    key: it.id,
    label: it.title,
    value: renderPage(it),
  }));

  return <Tabs items={tabs} />;
};
