import { Component, For, Show } from "solid-js";
import { Flex, Tabs, TabsDesc } from "~/components";
import { Tpl, TplElement, TplPage } from "~/templates/types";
import { makePage } from "./helper";

type Props = {
  tpl: Tpl;
};

export const TplView: Component<Props> = ({ tpl }) => {
  const tabs: TabsDesc[] = tpl.pages.map((it) => ({
    key: it.id,
    label: it.title,
    value: makePage(it),
  }));

  return <Tabs items={tabs} />;
};
