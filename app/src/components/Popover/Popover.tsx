import * as popover from "@zag-js/popover";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Component,
  createMemo,
  createUniqueId,
  ParentProps,
  Show,
} from "solid-js";
import { Portal } from "solid-js/web";
import { currentStyle } from "~/common";
import { ButtonStyle } from "../Button/styles.css";
import { Flex } from "../Flex";
import {
  PopoverCloseButtonStyle,
  PopoverContentStyle,
  PopoverRootStyle,
  PopoverTitleStyle,
} from "./styles.css";

type Props = {
  trigger: any;
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
}) => {
  const [state, send] = useMachine(
    popover.machine({
      id: createUniqueId(),
      closeOnInteractOutside: !persistent,
    })
  );

  const api = createMemo(() => popover.connect(state, send, normalizeProps));

  return (
    <div class={PopoverRootStyle} style={currentStyle()}>
      <button class={ButtonStyle({})} {...api().triggerProps}>
        {trigger}
      </button>

      <div
        class={PopoverContentStyle}
        style={currentStyle()}
        {...api().positionerProps}
      >
        <div {...api().contentProps}>
          <Show when={hasClose !== undefined}>
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
      </div>
    </div>
  );
};
