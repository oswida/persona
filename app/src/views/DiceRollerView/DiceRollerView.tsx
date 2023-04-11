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
  appSettings,
  ChatEntry,
  chatList,
  DiceType,
  lastRoll,
  mqttClient,
  netPublish,
  prettyNow,
  rollMultiple,
  rollSingle,
  SerializedRoll,
  setChatList,
  setLastRoll,
  setSelectedDicePool,
  topicChat,
} from "~/common";
import { Button, Flex, Input, Texte } from "~/components";
import { showError, showToast } from "~/components/Toast";
import { DiceSelector } from "./DiceSelector";
import { RollInfo } from "./RollInfo";
import { computedDicePool } from "./util";
import { diceSelectorCtrlRowStyle, diceSelectorResultStyle, diceSelectorRootStyle } from "./styles.css";
import { Dynamic } from "solid-js/web";

export const DiceRollerView: Component = () => {
  const dicePool: DiceType[] = ["d4", "d6", "d8", "d10"];
  const dicePool2: DiceType[] = ["d12", "d20", "d100", "dF"];
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
      showToast(<RollInfo rolls={() => result} />);
      setLastRoll(result);
      const entry = {
        etype: "roll",
        author: appSettings().ident.username,
        color: appSettings().ident.color,
        tstamp: prettyNow(),
        rolls: result.map(
          (it) =>
          ({
            maxTotal: it.maxTotal,
            minTotal: it.minTotal,
            notation: it.notation,
            output: it.output,
            total: it.total,
            rolls: it.rolls.map((r) => r.toString()),
          } as SerializedRoll)
        ),
      } as ChatEntry;
      const newState = [...chatList(), entry];
      setChatList(newState);
      const cl = mqttClient();
      if (!cl) return;
      netPublish(topicChat, entry);
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
    <div class={diceSelectorRootStyle}>
      <Texte size="bigger">Dice</Texte>
      <Flex style={{ gap: "10px" }}>
        <For each={dicePool}>{(it) => <DiceSelector dice={it} />}</For>
      </Flex>
      <Flex style={{ gap: "10px" }}>
        <For each={dicePool2}>{(it) => <DiceSelector dice={it} />}</For>
      </Flex>
      <div class={diceSelectorCtrlRowStyle}>
        <Input
          fontSize="smaller"
          style={{ width: "6rem" }}
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
      </div>
      <div class={diceSelectorResultStyle}>
        <Dynamic component={RollInfo} rolls={lastRoll} />
      </div>
    </div>
  );
};
