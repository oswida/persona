import * as tabs from "@zag-js/tabs";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Component,
  createMemo,
  createUniqueId,
  For,
  JSX,
  ParentProps,
} from "solid-js";
import {
  TabsContentStyle,
  TabsRootStyle,
  TabsTriggerGroupStyle,
  TabsTriggerStyle,
} from "./styles.css";
import { currentFont } from "~/common";

export type TabDesc = {
  value: string;
  label: string;
  content: any;
};

type Props = {
  items: TabDesc[];
  vertical?: boolean;
  style?: string | JSX.CSSProperties | undefined;
  value?: string;
};

export const Tabs: Component<Props & ParentProps> = ({
  children,
  items,
  style,
  value,
  vertical
}) => {
  const [state, send] = useMachine(
    tabs.machine({ id: createUniqueId(), value: value, orientation: vertical ? "vertical" : undefined })
  );

  const api = createMemo(() => tabs.connect(state, send, normalizeProps));

  return (
    <div class={TabsRootStyle} {...api().rootProps} style={style}>
      <div class={TabsTriggerGroupStyle} {...api().tablistProps}>
        <For each={items}>
          {(item) => (
            <button
              class={TabsTriggerStyle({ font: currentFont() })}
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
