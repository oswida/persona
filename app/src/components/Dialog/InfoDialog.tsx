import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  Show,
} from "solid-js";
import { Portal } from "solid-js/web";
import {
  DialogCloseButtonStyle,
  DialogContentStyle,
  DialogDescStyle,
  DialogHeaderStyle,
  DialogOverlayStyle,
} from "./styles.css";
import * as dialog from "@zag-js/dialog";
import { Markdown } from "../Markdown";

export type InfoState = {
  title: string;
  content: string;
  isOpen: boolean;
  width?: string;
};

export const [infoData, setInfoData] = createSignal<InfoState>({
  title: "",
  content: "",
  isOpen: false,
});

export const InfoDialog = () => {
  const [state, send] = useMachine(
    dialog.machine({
      id: createUniqueId(),
      onClose: () => {
        setInfoData((prev) => ({ ...prev, isOpen: false }));
      },
    })
  );
  const api = createMemo(() => dialog.connect(state, send, normalizeProps));

  createEffect(() => {
    if (infoData().isOpen) api().open();
    else api().close();
  });

  return (
    <Show when={api().isOpen}>
      <Portal mount={document.getElementById("main-div")!}>
        <div class={DialogOverlayStyle} {...api().backdropProps} />
        <div class={DialogContentStyle} {...api().containerProps}>
          <div {...api().contentProps}>
            <div class={DialogHeaderStyle}>
              <div {...api().titleProps}>{infoData().title}</div>
              <button
                class={DialogCloseButtonStyle}
                {...api().closeTriggerProps}
              >
                ×
              </button>
            </div>
            <div
              {...api().descriptionProps}
              class={DialogDescStyle}
              style={{ width: infoData().width }}
            >
              <Markdown content={infoData().content} />
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
};
