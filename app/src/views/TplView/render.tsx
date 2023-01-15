import { For, Show } from "solid-js";
import { currentStyle } from "~/common";
import { Flex } from "~/components";
import {
  TplElement,
  TplNumeric,
  TplNumericWithMax,
  TplPage,
} from "~/templates/types";
import {
  TpleHeaderStyle,
  TpleHelpStyle,
  TpleSectionStyle,
  TplNumericStyle,
  TplPageStyle,
  TplSlashStyle,
  TplTextStyle,
} from "./styles.css";

export const renderPage = (page: TplPage) => {
  return (
    <div class={TplPageStyle} style={currentStyle()}>
      <Flex dn="column">
        <For each={page.sections}>
          {(s) => (
            <Flex dn="column">
              <Show when={s.title !== undefined}>
                <div class={TpleSectionStyle}>{s.title}</div>
              </Show>
              <For each={s.rows}>
                {(r) => (
                  <Flex>
                    <For each={r.columns}>
                      {(c) => (
                        <Flex
                          dn="column"
                          style={{ width: c.size ? c.size : undefined }}
                        >
                          <For each={c.elements}>{(e) => renderElement(e)}</For>
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

const renderElement = (e: TplElement) => {
  switch (e.etype) {
    case "text":
      return <div class={TplTextStyle}>{e.content as string}</div>;
    case "help":
      return <div class={TpleHelpStyle}>{e.content as string}</div>;
    case "header":
      return <div class={TpleHeaderStyle}>{e.content as string}</div>;
    case "numeric": {
      const n = e.content as TplNumeric;
      return (
        <input
          id={e.id}
          title={e.tip}
          type="number"
          class={TplNumericStyle({ decoration: n.decoration })}
          value={n.value}
        />
      );
    }
    case "numeric_with_max": {
      const n = e.content as TplNumericWithMax;
      return (
        <Flex>
          <input
            id={e.id}
            title={e.tip}
            type="number"
            class={TplNumericStyle({ decoration: n.decoration })}
            value={n.value}
          />
          <div class={TplSlashStyle}></div>
          <input
            id={`${e.id}-max`}
            title={e.tip}
            type="number"
            class={TplNumericStyle({ decoration: n.decoration })}
            value={n.max}
          />
        </Flex>
      );
    }
  }
  return <div></div>;
};
