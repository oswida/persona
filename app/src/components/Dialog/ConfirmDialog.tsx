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
  DialogHeaderStyle,
  DialogOverlayStyle,
} from "./styles.css";
import * as dialog from "@zag-js/dialog";
import { Flex } from "../Flex";
import { Button } from "../Button";
import { Texte } from "../Texte";

export type ConfirmState = {
  title: string;
  message: string;
  accept: () => void;
  open: boolean;
};

export const [confirmData, setConfirmData] = createSignal<ConfirmState>({
  title: "",
  message: "",
  accept: () => {},
  open: false,
});

export const ConfirmDialog = () => {
  const [state, send] = useMachine(
    dialog.machine({
      id: createUniqueId(),
      onClose: () => {
        setConfirmData((prev) => ({ ...prev, open: false }));
      },
    })
  );
  const api = createMemo(() => dialog.connect(state, send, normalizeProps));

  createEffect(() => {
    if (confirmData().open) api().open();
    else api().close();
  });

  return (
    <Show when={api().isOpen}>
      <Portal mount={document.getElementById("main-div")!}>
        <div class={DialogOverlayStyle} {...api().backdropProps} />
        <div class={DialogContentStyle} {...api().containerProps}>
          <div {...api().contentProps}>
            <div class={DialogHeaderStyle}>
              <div {...api().titleProps}>{confirmData().title}</div>
              <button
                class={DialogCloseButtonStyle}
                {...api().closeTriggerProps}
              >
                ×
              </button>
            </div>
            <div {...api().descriptionProps}>
              <Texte>{confirmData().message}</Texte>
              <Flex
                center
                style={{ padding: "5px", gap: "15px", "margin-top": "15px" }}
              >
                <Button onClick={() => api().close()}>No</Button>
                <Button
                  onClick={() => {
                    api().close();
                    confirmData().accept();
                  }}
                >
                  Yes
                </Button>
              </Flex>
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
};
