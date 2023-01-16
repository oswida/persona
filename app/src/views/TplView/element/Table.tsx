import { Component, For, Show } from "solid-js";
import { themeVars } from "~/common";
import { Flex, Input, Texte } from "~/components";
import { TplElement, TplTable } from "~/templates/types";
import { TpleHelpStyle } from "../styles.css";

type Props = {
  element: TplElement;
};

export const Table: Component<Props> = ({ element }) => {
  const tb = element.content as TplTable;
  const rows = [...Array(tb.rowCount).keys()];
  const cols = [...Array(tb.colCount).keys()];
  const cw = 100 / tb.colCount;
  return (
    <Flex dn="column" center style={{ padding: "5px" }}>
      <Show when={tb.label}>
        <Texte style={{ "margin-bottom": "10px" }}>{tb.label}</Texte>
      </Show>
      <Flex center style={{ width: "100%" }}>
        <For each={cols}>
          {(it, idx) => (
            <Flex dn="column" center style={{ "max-width": `${cw}%` }}>
              <Show when={tb.headers}>
                <Texte
                  weight={700}
                  style={{
                    padding: "5px",
                    "background-color": themeVars.color.backgroundSecondary,
                    width: "90%",
                    "text-align": "center",
                  }}
                >
                  {tb.headers![idx()]}
                </Texte>
              </Show>
              <For each={rows}>
                {(r, ridx) => (
                  <Input
                    size={tb.inputSize}
                    underline
                    fontSize="smaller"
                    style={{ "text-align": "center" }}
                  />
                )}
              </For>
            </Flex>
          )}
        </For>
      </Flex>
      <Show when={tb.help}>
        <div class={TpleHelpStyle} style={{ "align-self": "flex-start" }}>
          {tb.help}
        </div>
      </Show>
    </Flex>
  );
};
