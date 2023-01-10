import { Tabs } from "@kobalte/core";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { For } from "solid-js";
import { currentTheme, themeVars } from "~/common";
import { TabsRootStyle, TabsTriggerStyle } from "./styles.css";

export type TabsDesc = {
  label: string;
  value: any;
};

export const TabsCt = ({ items }: { items: TabsDesc[] }) => {
  return (
    <Tabs
      class={TabsRootStyle}
      style={assignInlineVars(themeVars, currentTheme())}
    >
      <Tabs.List>
        <For each={items}>
          {(it) => (
            <Tabs.Trigger value={it.label} class={TabsTriggerStyle}>
              {it.label}
            </Tabs.Trigger>
          )}
        </For>
        <Tabs.Indicator />
      </Tabs.List>
      <For each={items}>
        {(it) => <Tabs.Content value={it.label}>{it.value}</Tabs.Content>}
      </For>
    </Tabs>
  );
};
