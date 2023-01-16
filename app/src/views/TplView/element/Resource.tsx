import { Component, For, Show } from "solid-js";
import { Flex, Input, Texte } from "~/components";
import { TplElement, TplResource } from "~/templates/types";
import { TpleHelpStyle } from "../styles.css";
import { Mark } from "./Mark";

type Props = {
  element: TplElement;
  onClick?: (pos: number) => void;
};

export const Resource: Component<Props> = ({ element, onClick }) => {
  const res = element.content as TplResource;
  const items = [...Array(res.count).keys()];

  return (
    <Flex dn="column" center>
      <Show when={res.label && res.label !== ""}>
        <Texte style={{ "margin-bottom": "10px" }}>{res.label}</Texte>
      </Show>
      <Flex style={{ gap: !res.descriptions ? "10px" : undefined }}>
        <For each={items}>
          {(it) => (
            <Flex dn="column" center>
              <Mark
                decoration={res.decoration}
                onClick={() => {
                  if (onClick) onClick(it);
                }}
              />
              <Show when={res.descriptions}>
                <Input
                  underline
                  style={{ width: "1.5rem", "text-align": "center" }}
                  fontSize="small"
                />
              </Show>
            </Flex>
          )}
        </For>
      </Flex>
      <Show when={res.help}>
        <div class={TpleHelpStyle} style={{ "margin-top": "5px" }}>
          {res.help}
        </div>
      </Show>
    </Flex>
  );
};
