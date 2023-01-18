import * as dialog from "@zag-js/dialog";
import { Portal } from "solid-js/web";
import { useMachine, normalizeProps } from "@zag-js/solid";
import {
  Component,
  createMemo,
  createUniqueId,
  ParentProps,
  Show,
} from "solid-js";
import { ButtonStyle } from "../Button/styles.css";
import { currentStyle } from "~/common";
import {
  DialogCloseButtonStyle,
  DialogContentStyle,
  DialogHeaderStyle,
  DialogOverlayStyle,
} from "./styles.css";
import { DialogCloseButton } from "@kobalte/core/dist/types/dialog/dialog-close-button";
import { Flex } from "../Flex";

type Props = {
  trigger: any;
  title?: string;
};

export const Dialog: Component<Props & ParentProps> = ({
  children,
  trigger,
  title,
}) => {
  const [state, send] = useMachine(dialog.machine({ id: createUniqueId() }));

  const api = createMemo(() => dialog.connect(state, send, normalizeProps));

  return (
    <>
      <button
        class={ButtonStyle({})}
        style={currentStyle()}
        {...api().triggerProps}
      >
        {trigger}
      </button>
      <Show when={api().isOpen}>
        <Portal mount={document.getElementById("main-div")!}>
          <div class={DialogOverlayStyle} {...api().backdropProps} />
          <div class={DialogContentStyle} {...api().containerProps}>
            <div {...api().contentProps}>
              <div class={DialogHeaderStyle}>
                <div {...api().titleProps}>{title}</div>
                <button
                  class={DialogCloseButtonStyle}
                  {...api().closeTriggerProps}
                >
                  ×
                </button>
              </div>
              <div {...api().descriptionProps}>{children}</div>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
};
