import { Component, Show } from "solid-js";
import { Flex, Texte } from "~/components";
import { TplElement, TplNumeric, TplNumericWithMax } from "~/templates/types";
import { TpleHelpStyle } from "../styles.css";
import { TplNumericStyle, TplSlashStyle } from "./styles.css";

type Props = {
  element: TplElement;
};

export const Numeric: Component<Props> = ({ element }) => {
  const el = element.content as TplNumeric;
  const mel = element.content as TplNumericWithMax;
  return (
    <Flex center>
      <Show when={element.etype == "numeric"}>
        <Flex dn="column">
          <Flex center>
            <input
              id={element.id}
              title={element.tip}
              type="number"
              class={TplNumericStyle({ decoration: el.decoration })}
            />
            <Show when={el.label}>
              <Texte style={{ "margin-left": "10px" }}>{el.label}</Texte>
            </Show>
          </Flex>
          <Show when={el.help}>
            <div class={TpleHelpStyle} style={{ "align-self": "flex-start" }}>
              {el.help}
            </div>
          </Show>
        </Flex>
      </Show>
      <Show when={element.etype == "numeric_with_max"}>
        <Flex dn="column" center>
          <Show when={mel.label}>
            <Texte style={{ "margin-bottom": "5px" }}>{el.label}</Texte>
          </Show>
          <Flex>
            <input
              id={element.id}
              title={element.tip}
              type="number"
              class={TplNumericStyle({ decoration: mel.decoration })}
            />
            <div class={TplSlashStyle}></div>
            <input
              id={`${element.id}-max`}
              title={element.tip}
              type="number"
              class={TplNumericStyle({ decoration: mel.decoration })}
              value={mel.max}
            />
          </Flex>
          <Show when={el.help}>
            <div class={TpleHelpStyle} style={{ "align-self": "flex-start" }}>
              {el.help}
            </div>
          </Show>
        </Flex>
      </Show>
    </Flex>
  );
};
