import { Component, Show } from "solid-js";
import { Flex, Texte } from "~/components";
import { TplElement, TplImg } from "~/templates/types";

type Props = {
  element: TplElement;
};

export const Img: Component<Props> = ({ element }) => {
  const el = element.content as TplImg;
  return (
    <Flex dn="column">
      <img src={el.url} style={{ width: el.width, height: el.height }} />
      <Show when={el.label}>
        <Texte style={{ "margin-top": "10px" }}>{el.label}</Texte>
      </Show>
    </Flex>
  );
};
