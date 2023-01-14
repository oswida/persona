import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { FaSolidDice } from "solid-icons/fa";
import {
  Component,
  createMemo,
  createSignal,
  For,
  Match,
  Switch,
} from "solid-js";
import {
  ChatEntry,
  chatList,
  prettyNow,
  rollMultiple,
  rollSingle,
  setChatList,
  setSelectedDicePool,
  settingsData,
} from "~/common";
import { Button, Flex, Input, Texte } from "~/components";
import { showError, showToast } from "~/components/Toast";
import { DiceSelector } from "./DiceSelector";
import { RollInfo } from "./RollInfo";
import { computedDicePool } from "./util";

export const DiceRollerView: Component = () => {
  const dicePool = ["d4", "d6", "d8", "d10"];
  const dicePool2 = ["d12", "d20", "d100", "dF"];
  let refCustom: HTMLInputElement;
  const [customEmpty, setCustomEmpty] = createSignal(true);

  const reset = () => {
    setSelectedDicePool({});
    refCustom.value = "";
    setCustomEmpty(refCustom.value.trim() == "");
  };

  const roll = () => {
    const pl = computedDicePool();
    let custom: string[] = [];
    if (refCustom.value.trim() !== "") {
      custom = [refCustom.value.trim()];
    }
    if (pl.length == 0 && custom.length == 0) return;

    try {
      let result: DiceRoll[] = [];
      if (pl.length == 1) {
        result = [rollSingle(pl[0])];
      } else if (custom.length == 1) {
        result = [rollSingle(custom[0])];
      } else {
        result = rollMultiple([...pl, ...custom]);
      }
      showToast(<RollInfo rolls={result} />);
      const newState = [
        ...chatList(),
        {
          etype: "roll",
          author: settingsData().ident.username,
          color: settingsData().ident.color,
          tstamp: prettyNow(),
          rolls: result,
        } as ChatEntry,
      ];
      setChatList(newState);
      //TODO send chat
    } catch (e: any) {
      showError("Bad dice specification");
    }
  };

  const poolSize = createMemo(() => {
    const pool = computedDicePool();
    return pool.length;
  });

  const checkCustomEmpty = () => {
    if (!customEmpty) return;
    setCustomEmpty(refCustom.value.trim() == "");
  };

  return (
    <Flex dn="column">
      <Flex style={{ gap: "10px" }}>
        <For each={dicePool}>{(it) => <DiceSelector dice={it} />}</For>
      </Flex>
      <Flex style={{ gap: "10px" }}>
        <For each={dicePool2}>{(it) => <DiceSelector dice={it} />}</For>
      </Flex>
      <Flex
        center
        style={{ gap: "20px", "margin-top": "15px", "margin-bottom": "5px" }}
      >
        <Input
          size="smaller"
          style={{ width: "4rem" }}
          ref={(e) => (refCustom = e)}
          onInput={checkCustomEmpty}
        ></Input>
        <Switch>
          <Match when={poolSize() == 0 && customEmpty()}>
            <Button disabled onClick={roll}>
              <FaSolidDice style={{ "margin-right": "10px" }} />
              <Texte color="background2">Roll</Texte>
            </Button>
          </Match>
          <Match when={poolSize() > 0 || !customEmpty()}>
            <Button onClick={roll}>
              <FaSolidDice style={{ "margin-right": "10px" }} />
              <Texte>Roll</Texte>
            </Button>
          </Match>
        </Switch>

        <Button onClick={reset}>
          <Texte>Reset</Texte>
        </Button>
      </Flex>
    </Flex>
  );
};
