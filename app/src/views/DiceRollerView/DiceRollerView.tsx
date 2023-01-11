import { FaSolidDice } from "solid-icons/fa";
import { Component, For } from "solid-js";
import { rollMultiple, rollSingle, setSelectedDicePool } from "~/common";
import { ButtonCt, Flex, Texte } from "~/components";
import { DiceSelector } from "./DiceSelector";
import { computedDicePool } from "./util";

export const DiceRollerView: Component = () => {
  const pool = ["d4", "d6", "d8", "d10"];
  const pool2 = ["d12", "d20", "d100", "dF"];

  const reset = () => {
    setSelectedDicePool({});
  };

  const roll = () => {
    const pool = computedDicePool();
    if (pool.length == 0) return;
    let result = [];
    if (pool.length == 1) {
      result = [rollSingle(pool[0])];
    } else {
      result = rollMultiple(pool);
    }
    console.log(
      "roll",
      result.map((it) => it.total)
    );
  };

  return (
    <Flex dn="column">
      <Flex style={{ gap: "10px" }}>
        <For each={pool}>{(it) => <DiceSelector dice={it} />}</For>
      </Flex>
      <Flex style={{ gap: "10px" }}>
        <For each={pool2}>{(it) => <DiceSelector dice={it} />}</For>
      </Flex>
      <Flex
        center
        style={{ gap: "20px", "margin-top": "15px", "margin-bottom": "5px" }}
      >
        <ButtonCt onClick={roll}>
          <FaSolidDice style={{ "margin-right": "10px" }} />
          <Texte>Roll</Texte>
        </ButtonCt>
        <ButtonCt onClick={reset}>
          <Texte>Reset</Texte>
        </ButtonCt>
      </Flex>
    </Flex>
  );
};
