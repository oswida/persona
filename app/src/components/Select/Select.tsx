import { Select as St } from "@kobalte/core";
import { FaSolidSort } from "solid-icons/fa";
import { Component, For, ParentProps } from "solid-js";
import { currentStyle } from "~/common";
import { SelectRootStyle, SelectTriggerStyle } from "./styles.css";

export type SelectItem = {
  key: string;
  value: string;
};

type Props = {
  items: SelectItem[];
  placeholder?: string;
};

export const Select: Component<Props> = ({ placeholder, items }) => {
  return (
    <St.Root>
      <St.Trigger class={SelectTriggerStyle} style={currentStyle()}>
        <St.Value placeholder={placeholder ? placeholder : "...select item"} />
        <St.Icon>
          <FaSolidSort />
        </St.Icon>
      </St.Trigger>
      {/* <St.Portal> */}
      <St.Content class={SelectRootStyle} style={currentStyle()}>
        <St.Listbox>
          <For each={items}>
            {(it) => <St.Item value={it.key}>{it.value}</St.Item>}
          </For>
        </St.Listbox>
      </St.Content>
      {/* </St.Portal> */}
    </St.Root>
  );
};
