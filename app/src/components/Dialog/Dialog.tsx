import { Dialog as Dlg } from "@kobalte/core";
import { Accessor, ParentComponent, Setter } from "solid-js";
import { currentStyle } from "~/common";
import { ButtonStyle } from "../Button/styles.css";
import {
  DialogCloseButtonStyle,
  DialogContentStyle,
  DialogDescStyle,
  DialogHeaderStyle,
  DialogOverlayStyle,
  DialogRootStyle,
} from "./styles.css";

type Props = {
  trigger: any;
  title?: string;
  open?: Accessor<boolean>;
  setOpen?: Setter<boolean>;
};

export const Dialog: ParentComponent<Props> = ({
  trigger,
  title,
  open,
  setOpen,
  children,
}) => {
  return (
    <Dlg
      isOpen={open ? open() : undefined}
      onOpenChange={setOpen ? setOpen : undefined}
    >
      <Dlg.Trigger class={ButtonStyle({})} style={currentStyle()}>
        {trigger}
      </Dlg.Trigger>

      <Dlg.Overlay class={DialogOverlayStyle} style={currentStyle()} />
      <div class={DialogRootStyle} style={currentStyle()}>
        <Dlg.Content class={DialogContentStyle} style={currentStyle()}>
          <div class={DialogHeaderStyle}>
            <div>{title}</div>
            <Dlg.CloseButton class={DialogCloseButtonStyle}>×</Dlg.CloseButton>
          </div>
          <Dlg.Description class={DialogDescStyle}>{children}</Dlg.Description>
        </Dlg.Content>
      </div>
    </Dlg>
  );
};
