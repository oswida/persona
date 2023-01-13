import { Tabs as Ts } from "@kobalte/core";
import { For } from "solid-js";
import { currentStyle } from "~/common";
import { TabsRootStyle, TabsTriggerStyle } from "./styles.css";

export type TabsDesc = {
  label: string;
  key: string;
  value: any;
};

export const Tabs = ({ items }: { items: TabsDesc[] }) => {
  return (
    <Ts class={TabsRootStyle} style={currentStyle()}>
      <Ts.List>
        <For each={items}>
          {(it) => (
            <Ts.Trigger
              value={it.key}
              class={TabsTriggerStyle}
              style={currentStyle()}
            >
              {it.label}
            </Ts.Trigger>
          )}
        </For>
        <Ts.Indicator />
      </Ts.List>
      <For each={items}>
        {(it) => (
          <Ts.Content style={currentStyle()} value={it.key}>
            {it.value}
          </Ts.Content>
        )}
      </For>
    </Ts>
  );
};
