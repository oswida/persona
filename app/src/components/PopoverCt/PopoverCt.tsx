import { Popover } from "@kobalte/core";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Accessor, Component, ParentProps, Setter, Show } from "solid-js";
import { currentStyle, currentTheme, themeVars } from "~/common";
import { ButtonStyle } from "../ButtonCt/styles.css";
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
  open?: Accessor<boolean>;
  setOpen?: Setter<boolean>;
};

export const PopoverCt: Component<Props & ParentProps> = ({
  children,
  trigger,
  title,
  open,
  setOpen,
}) => {
  return (
    <Popover
      isOpen={open ? open() : undefined}
      onOpenChange={setOpen ? setOpen : undefined}
    >
      <Popover.Trigger class={ButtonStyle({})} style={currentStyle()}>
        {trigger}
      </Popover.Trigger>
      {/* <Popover.Portal> */}
      <Popover.Content class={PopoverRootStyle} style={currentStyle()}>
        <Popover.Arrow style={currentStyle()} />
        <Flex>
          <Show when={title !== undefined}>
            <Popover.Title class={PopoverTitleStyle}>{title}</Popover.Title>
          </Show>
          {/* <Popover.CloseButton class={PopoverCloseButtonStyle}>
            ×
          </Popover.CloseButton> */}
        </Flex>
        <Popover.Description class={PopoverContentStyle}>
          {children}
        </Popover.Description>
      </Popover.Content>
      {/* </Popover.Portal> */}
    </Popover>
  );
};
