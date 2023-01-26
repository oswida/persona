import { setElementVars } from "@vanilla-extract/dynamic";
import * as popover from "@zag-js/popover";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Component,
  createEffect,
  createMemo,
  createUniqueId,
  ParentProps,
  Show,
} from "solid-js";
import { Dynamic, Portal } from "solid-js/web";
import { currentStyle, currentTheme, themeVars } from "~/common";
import { ButtonStyle } from "../Button/styles.css";
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

      <div id="pop-content" {...api().positionerProps}>
        <Show when={api().isOpen}>
          <div
            {...api().contentProps}
            class={PopoverContentStyle}
            style={currentStyle()}
          >
            <Show when={hasClose !== undefined || title}>
              <div class={PopoverTitleStyle} style={currentStyle()}>
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
