import { Component, Show, VoidProps } from "solid-js";
import { Flex, Texte } from "~/components";
import { TplElement, TplText } from "~/templates/types";
import { Mark } from "./Mark";

type Props = {
  element: TplElement;
  checked?: boolean;
  onClick?: () => void;
};

export const TextEl: Component<Props> = ({ element, onClick, checked }) => {
  const el = element.content as TplText;

  return (
    <Flex style={{ "justify-content": "space-between", padding: "5px" }}>
      <Texte>{el.value}</Texte>
      <Show when={el.marked}>
        <Mark decoration={"circle"} checked={checked} onClick={onClick} />
      </Show>
    </Flex>
  );
};
