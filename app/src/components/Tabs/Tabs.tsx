import * as tabs from "@zag-js/tabs";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Component,
  createMemo,
  createUniqueId,
  For,
  ParentProps,
} from "solid-js";
import {
  TabsContentStyle,
  TabsRootStyle,
  TabsTriggerGroupStyle,
  TabsTriggerStyle,
} from "./styles.css";
import { currentStyle } from "~/common";

export type TabDesc = {
  value: string;
  label: string;
  content: any;
};

type Props = {
  items: TabDesc[];
};

export const Tabs: Component<Props & ParentProps> = ({ children, items }) => {
  const [state, send] = useMachine(tabs.machine({ id: createUniqueId() }));

  const api = createMemo(() => tabs.connect(state, send, normalizeProps));

  return (
    <div class={TabsRootStyle} style={currentStyle()} {...api().rootProps}>
      <div class={TabsTriggerGroupStyle} {...api().tablistProps}>
        <For each={items}>
          {(item) => (
            <button
              class={TabsTriggerStyle}
              {...api().getTriggerProps({ value: item.value })}
            >
              {item.label}
            </button>
          )}
        </For>
      </div>
      <For each={items}>
        {(item) => (
          <div
            class={TabsContentStyle}
            {...api().getContentProps({ value: item.value })}
          >
            {item.content}
          </div>
        )}
      </For>
    </div>
  );
};
