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
import { Flex } from "../Flex";
import { Button } from "../Button";
import { Texte } from "../Texte";
import { Input } from "../Input";

export type StrInputState = {
  title: string;
  message: string;
  value: string;
  accept: (value: string) => void;
  open: boolean;
};

export const [strInputData, setStrInputData] = createSignal<StrInputState>({
  title: "",
  message: "",
  accept: (value: string) => {},
  open: false,
  value: "",
});

export const StrInputDialog = () => {
  let refInput: HTMLInputElement;

  const [state, send] = useMachine(
    dialog.machine({
      id: createUniqueId(),
      onClose: () => {
        setStrInputData((prev) => ({ ...prev, open: false }));
      },
    })
  );
  const api = createMemo(() => dialog.connect(state, send, normalizeProps));

  createEffect(() => {
    if (strInputData().open) api().open();
    else api().close();
  });

  const ok = () => {
    api().close();
    if (!refInput) return;
    strInputData().accept(refInput.value);
  };

  return (
    <Show when={api().isOpen}>
      <Portal mount={document.getElementById("main-div")!}>
        <div class={DialogOverlayStyle} {...api().backdropProps} />
        <div class={DialogContentStyle} {...api().containerProps}>
          <div {...api().contentProps}>
            <div class={DialogHeaderStyle}>
              <div {...api().titleProps}>{strInputData().title}</div>
              <button
                class={DialogCloseButtonStyle}
                {...api().closeTriggerProps}
              >
                ×
              </button>
            </div>
            <div {...api().descriptionProps} class={DialogDescStyle}>
              <Texte>{strInputData().message}</Texte>
              <Input ref={(e) => (refInput = e)} value={strInputData().value} />
              <Flex
                center
                style={{ padding: "5px", gap: "15px", "margin-top": "15px" }}
              >
                <Button onClick={() => api().close()}>Cancel</Button>
                <Button minWidth="4em" onClick={ok}>
                  Ok
                </Button>
              </Flex>
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
};
