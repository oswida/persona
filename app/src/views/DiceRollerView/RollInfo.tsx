import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { FaSolidDice } from "solid-icons/fa";
import { For } from "solid-js";
import { themeVars } from "~/common";
import { Flex, Texte } from "~/components";

export const RollInfo = ({ rolls }: { rolls: DiceRoll[] }) => {
 
  return (
    <Flex dn="column">
      <Flex
        center
        style={{
          "border-bottom": `solid 1px ${themeVars.color.backgroundSecondary}`,
        }}
      >
        <FaSolidDice />
        <Texte weight={700}>Dice roll</Texte>
      </Flex>
      <For each={rolls}>
        {(it) => (
          <Flex>
            <Texte color="secondary">{it.notation}:</Texte>
            <Texte>
              {" "}
              <b>{it.total}</b>
            </Texte>
            <Texte>{it.rolls.join(",")}</Texte>
          </Flex>
        )}
      </For>
    </Flex>
  );
};
