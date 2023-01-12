import { Dialog } from "@kobalte/core";
import { Accessor, Component, ParentComponent, Setter } from "solid-js";
import { currentStyle } from "~/common";
import { ButtonStyle } from "../ButtonCt/styles.css";
import {
  DialogCloseButtonStyle,
  DialogContentStyle,
  DialogOverlayStyle,
  DialogRootStyle,
} from "./styles.css";

type Props = {
  trigger: any;
  title?: string;
  open?: Accessor<boolean>;
  setOpen?: Setter<boolean>;
};

export const DialogCt: ParentComponent<Props> = ({
  trigger,
  title,
  open,
  setOpen,
  children,
}) => {
  return (
    <Dialog>
      <Dialog.Trigger class={ButtonStyle({})} style={currentStyle()}>
        {trigger}
      </Dialog.Trigger>

      <Dialog.Overlay class={DialogOverlayStyle} style={currentStyle()} />
      <div class={DialogRootStyle} style={currentStyle()}>
        <Dialog.Content class={DialogContentStyle} style={currentStyle()}>
          <div class="dialog__header">
            <Dialog.Title class="dialog__title">About Kobalte</Dialog.Title>
            <Dialog.CloseButton class={DialogCloseButtonStyle}>
              ×
            </Dialog.CloseButton>
          </div>
          <Dialog.Description class="dialog__description">
            {children}
          </Dialog.Description>
        </Dialog.Content>
      </div>
    </Dialog>
  );
};
