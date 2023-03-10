import { For, Show } from "solid-js";
import { Flex } from "~/components";
import { TplElement, TplPage } from "~/templates/types";
import { Img } from "./element/Img";
import { Label } from "./element/Label";
import { Numeric } from "./element/Numeric";
import { Resource } from "./element/Resource";
import { Table } from "./element/Table";
import { Text } from "./element/Text";
import {
  TpleHeaderStyle,
  TpleHelpStyle,
  TpleSectionStyle,
  TplPageStyle,
} from "./styles.css";

export const renderPage = (page: TplPage) => {
  return (
    <div class={TplPageStyle}>
      <Flex dn="column" style={{ gap: "5px" }}>
        <For each={page.sections}>
          {(s) => (
            <Flex dn="column">
              <Show when={s.title !== undefined && s.title.trim() != ""}>
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
    case "label":
      return <Label element={e} />;
    case "help":
      return <div class={TpleHelpStyle}>{e.content as string}</div>;
    case "header":
      return <div class={TpleHeaderStyle}>{e.content as string}</div>;
    case "numeric":
    case "numeric_with_max": {
      return <Numeric element={e} />;
    }
    case "text":
      return <Text element={e} />;
    case "resource":
      return <Resource element={e} />;
    case "table":
      return <Table element={e} />;
    case "image":
      return <Img element={e} />;
  }
  return <div></div>;
};
