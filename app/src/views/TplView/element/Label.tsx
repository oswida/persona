import { Component, Show } from "solid-js";
import { Flex, Texte } from "~/components";
import { TplElement, TplLabel } from "~/templates/types";
import { Mark } from "./Mark";

type Props = {
  element: TplElement;
  checked?: boolean;
  onClick?: () => void;
};

export const Label: Component<Props> = ({ element, onClick, checked }) => {
  const el = element.content as TplLabel;

  return (
    <Flex style={{ "justify-content": "space-between", padding: "5px" }}>
      <Texte>{el.value}</Texte>
      <Show when={el.marked}>
        <Mark decoration={"circle"} checked={checked} onClick={onClick} />
      </Show>
    </Flex>
  );
};
