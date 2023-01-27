import * as dialog from "@zag-js/dialog";
import { Portal } from "solid-js/web";
import { useMachine, normalizeProps } from "@zag-js/solid";
import {
  Accessor,
  Component,
  createMemo,
  createUniqueId,
  JSX,
  ParentProps,
  Show,
} from "solid-js";
import { ButtonStyle } from "../Button/styles.css";
import {
  DialogCloseButtonStyle,
  DialogContentStyle,
  DialogHeaderStyle,
  DialogOverlayStyle,
} from "./styles.css";

type Props = {
  trigger: any;
  title?: string;
  passApi?: (api: any) => void;
};

export const Dialog: Component<Props & ParentProps> = ({
  children,
  trigger,
  title,
  passApi,
}) => {
  const [state, send] = useMachine(dialog.machine({ id: createUniqueId() }));

  const api = createMemo(() => dialog.connect(state, send, normalizeProps));
  if (passApi) passApi(api);

  return (
    <>
      <button class={ButtonStyle({})} {...api().triggerProps}>
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
