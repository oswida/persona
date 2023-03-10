import * as popover from "@zag-js/popover";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Accessor,
  Component,
  createMemo,
  createUniqueId,
  ParentProps,
  Show,
} from "solid-js";
import { ButtonStyle } from "../Button/styles.css";
import {
  PopoverCloseButtonStyle,
  PopoverContentStyle,
  PopoverRootStyle,
  PopoverTitleStyle,
} from "./styles.css";

type Props = {
  trigger: any;
  triggerShape?: "icon" | "standard";
  title?: string;
  hasClose?: boolean;
  persistent?: boolean;
};

export const Popover: Component<Props & ParentProps> = ({
  trigger,
  children,
  title,
  hasClose,
  persistent,
  triggerShape,
}) => {
  const [state, send] = useMachine(
    popover.machine({
      id: createUniqueId(),
      closeOnInteractOutside: !persistent,
    })
  );

  const api = createMemo(() => popover.connect(state, send, normalizeProps));

  return (
    <div>
      <button
        class={ButtonStyle({
          selected: api().isOpen,
          shape: triggerShape,
        })}
        {...api().triggerProps}
      >
        {trigger}
      </button>

      <div id="pop-content" {...api().positionerProps} class={PopoverRootStyle}>
        <Show when={api().isOpen}>
          <div {...api().contentProps} class={PopoverContentStyle}>
            <Show when={hasClose !== undefined || title}>
              <div class={PopoverTitleStyle}>
                <div {...api().titleProps}>{title}</div>
                <button
                  class={PopoverCloseButtonStyle}
                  {...api().closeTriggerProps}
                >
                  ×
                </button>
              </div>
            </Show>
            <div {...api().descriptionProps}>{children}</div>
          </div>
        </Show>
      </div>
    </div>
  );
};
