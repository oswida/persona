import { it } from "node:test";
import { Show } from "solid-js";
import { CardData, themeVars } from "~/common";
import { Flex, Texte } from "~/components";
import { Drag } from "~/components/Drag";
import { CardObjectStyle } from "./styles.css";

export const CardObject = ({ card }: { card: CardData }) => {
  return (
    <Drag id={card.id}>
      <div class={CardObjectStyle}>
        <Flex dn="column">
          <Flex
            style={{
              "border-bottom": `solid 1px ${themeVars.color.accent}`,
              padding: "5px",
            }}
          >
            <Texte>{card.title}</Texte>
          </Flex>
          <Flex style={{ overflow: "auto" }}>
            <Texte>{card.content}</Texte>
          </Flex>
          <Show when={card.footer && card.footer.trim() !== ""}>
            <Flex
              style={{
                "border-top": `solid 1px ${themeVars.color.accent}`,
                padding: "5px",
              }}
            >
              <Texte>{card.title}</Texte>
            </Flex>
          </Show>
        </Flex>
      </div>
    </Drag>
  );
};
