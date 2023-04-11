import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { FaSolidDice } from "solid-icons/fa";
import { Accessor, Component, For } from "solid-js";
import { themeVars } from "~/common";
import { Flex, Texte } from "~/components";

type Props = {
  rolls: Accessor<DiceRoll[]>;
}

export const RollInfo: Component<Props> = ({ rolls }) => {
  return (
    <Flex dn="column">
      <Flex
        center
        style={{
          "border-bottom": `solid 1px ${themeVars.color.accent}`,
          "padding-bottom": "10px",
        }}
      >
        <FaSolidDice />
        <Texte weight={700} color={themeVars.color.background}>
          Dice roll
        </Texte>
      </Flex>
      <For each={rolls()}>
        {(it) => (
          <Flex>
            <Texte themeColor="secondary">{it.notation}:</Texte>
            <Texte>{it.rolls.join(",")}</Texte>
            <Texte>⇒</Texte>
            <Texte weight={700}>{it.total}</Texte>
          </Flex>
        )}
      </For>
    </Flex>
  );
};
