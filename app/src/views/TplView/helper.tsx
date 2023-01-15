import { For, Show } from "solid-js";
import { currentStyle } from "~/common";
import { Flex, Texte } from "~/components";
import { TplElement, TplPage } from "~/templates/types";
import { TpleHeaderStyle, TpleHelpStyle, TplPageStyle } from "./styles.css";

export const makePage = (page: TplPage) => {
  return (
    <div class={TplPageStyle} style={currentStyle()}>
      <Flex dn="column">
        <For each={page.sections}>
          {(s) => (
            <Flex dn="column">
              <Show when={s.showTitle}>{s.title}</Show>
              <For each={s.rows}>
                {(r) => (
                  <Flex>
                    <For each={r.columns}>
                      {(c) => (
                        <Flex
                          dn="column"
                          style={{ width: c.size ? c.size : undefined }}
                        >
                          <For each={c.elements}>{(e) => makeElement(e)}</For>
                        </Flex>
                      )}
                    </For>
                  </Flex>
                )}
              </For>
            </Flex>
          )}
        </For>
      </Flex>
    </div>
  );
};

const makeElement = (e: TplElement) => {
  switch (e.etype) {
    case "text":
      return <Texte>{e.content}</Texte>;
    case "help":
      return <div class={TpleHelpStyle}>{e.content}</div>;
    case "header":
      return <div class={TpleHeaderStyle}>{e.content}</div>;
  }
  return <div></div>;
};
