import { Popover as Pop } from "@kobalte/core";
import { Accessor, Component, ParentProps, Setter, Show } from "solid-js";
import { currentStyle } from "~/common";
import { ButtonStyle } from "../Button/styles.css";
import { Flex } from "../Flex";
import {
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

export const Popover: Component<Props & ParentProps> = ({
  children,
  trigger,
  title,
  open,
  setOpen,
}) => {
  return (
    <Pop
      isOpen={open ? open() : undefined}
      onOpenChange={setOpen ? setOpen : undefined}
    >
      <Pop.Trigger class={ButtonStyle({})} style={currentStyle()}>
        {trigger}
      </Pop.Trigger>
      {/* <Popover.Portal> */}
      <Pop.Content class={PopoverRootStyle} style={currentStyle()}>
        <Pop.Arrow style={currentStyle()} />
        <Flex>
          <Show when={title !== undefined}>
            <Pop.Title class={PopoverTitleStyle}>{title}</Pop.Title>
          </Show>
          {/* <Popover.CloseButton class={PopoverCloseButtonStyle}>
            ×
          </Popover.CloseButton> */}
        </Flex>
        <Pop.Description class={PopoverContentStyle}>
          {children}
        </Pop.Description>
      </Pop.Content>
      {/* </Popover.Portal> */}
    </Pop>
  );
};
