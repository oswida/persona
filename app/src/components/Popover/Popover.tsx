import { Popover as Pop } from "@kobalte/core";
import { Accessor, Component, ParentProps, Setter, Show } from "solid-js";
import { currentStyle } from "~/common";
import { ButtonStyle } from "../Button/styles.css";
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

export const Popover: Component<Props & ParentProps> = ({
  children,
  trigger,
  title,
  open,
  setOpen,
}) => {
  const setState = (value: boolean) => {
    if (!setOpen) return;
    setOpen(value);
  };

  const toggleState = () => {
    if (!setOpen || !open) return;
    setOpen(!open());
  };

  return (
    <Pop.Root isOpen={open ? open() : undefined}>
      <Pop.Trigger
        class={ButtonStyle({})}
        style={currentStyle()}
        onPress={toggleState}
      >
        {trigger}
      </Pop.Trigger>
      {/* <Pop.Portal> */}
      <Pop.Content class={PopoverRootStyle} style={currentStyle()}>
        <Pop.Arrow style={currentStyle()} />

        <Show when={title !== undefined}>
          <Flex style={{ "justify-content": "space-between" }}>
            <Pop.Title class={PopoverTitleStyle}>{title}</Pop.Title>
            <Pop.CloseButton
              class={PopoverCloseButtonStyle}
              onPressChange={() => setState(false)}
            >
              ×
            </Pop.CloseButton>
          </Flex>
        </Show>

        <Pop.Description class={PopoverContentStyle}>
          {children}
        </Pop.Description>
      </Pop.Content>
      {/* </Pop.Portal> */}
    </Pop.Root>
  );
};
