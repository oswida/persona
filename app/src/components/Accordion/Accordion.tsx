import * as accordion from "@zag-js/accordion";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { Accessor, Component, createMemo, createUniqueId, For } from "solid-js";
import { currentFont } from "~/common";
import { ButtonStyle } from "../Button/styles.css";
import { AccordionItemStyle, AccordionRootStyle } from "./styles.css";

export type AccordionDesc = {
  title: any;
  value: string;
  content: any;
};

type Props = {
  items: Accessor<AccordionDesc[]>;
  onChange?: (details: { value: string | string[] | null }) => void;
};

export const Accordion: Component<Props> = ({ items, onChange }) => {
  const [state, send] = useMachine(
    accordion.machine({
      id: createUniqueId(),
      collapsible: true,
      multiple: false,
      onChange: onChange,
    })
  );

  const api = createMemo(() => accordion.connect(state, send, normalizeProps));

  return (
    <div class={AccordionRootStyle} {...api().rootProps}>
      <For each={items()}>
        {(item) => (
          <div
            class={AccordionItemStyle}
            {...api().getItemProps({ value: item.value })}
          >
            <div>
              <button
                style={{ padding: "5px 10px", width: "100%" }}
                class={ButtonStyle({
                  border: "standard",
                  selected: api().value == item.value,
                  font: currentFont(),
                })}
                {...api().getTriggerProps({ value: item.value })}
              >
                {item.title}
              </button>
            </div>
            <div {...api().getContentProps({ value: item.value })}>
              {item.content}
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
