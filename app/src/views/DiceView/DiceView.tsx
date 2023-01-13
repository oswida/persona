import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { useI18n } from "@solid-primitives/i18n";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { FaSolidTrashCan } from "solid-icons/fa";
import { Component, For } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import {
  currentTheme,
  personaRollsKey,
  prettyNow,
  rollHistory,
  RollInfo,
  rollSingle,
  saveGenericData,
  selectedDice,
  setRollHistory,
  settingsData,
  themeVars,
} from "~/common";
import { Button, Flex, Input, Texte } from "~/components";
import { DiceRollButton } from "./DiceRollButton";
import {
  DiceViewRootStyle,
  RollHistoryStyle,
  RollInfoStyle,
} from "./styles.css";

export const DiceView: Component = () => {
  const [t] = useI18n();

  let commentRef: HTMLInputElement;
  let done = false;
  let outputRef: HTMLDivElement;

  const randomizeText = (
    roll: DiceRoll,
    username: string,
    comment: string,
    color: string,
    cb: () => void
  ) => {
    const theLetters = "0123456789#%&^+=-";
    const speed = 10 / roll.rolls.length;
    const increment = 3;

    const rollData = roll.toString().replace("d", t("dice_letter"));
    const ctnt = rollData;
    let clen = ctnt.length;
    let si = 0;
    let stri = 0;
    let block = "";
    let fixed = "";

    if (!outputRef) return;

    const nextFrame = (pos: number) => {
      if (!outputRef) return;
      for (let i = 0; i < clen - stri; i++) {
        var num = Math.floor(theLetters.length * Math.random());
        var letter = theLetters.charAt(num);
        block = block + letter;
      }
      if (si == increment - 1) {
        stri++;
      }
      if (si == increment) {
        fixed = fixed + ctnt.charAt(stri - 1);
        si = 0;
      }
      outputRef.innerHTML = fixed + block;
      block = "";

      if (outputRef.innerHTML == ctnt && !done) {
        done = true;
        const newEntry: RollInfo = {
          id: uuidv4(),
          user: username,
          time: prettyNow(),
          data: rollData,
          comment: comment,
          color: color,
        };
        const newState = [newEntry, ...rollHistory()];
        setRollHistory(newState);
        saveGenericData(personaRollsKey, newState);
        cb();
        // const client = apd.mqttClient();
        // if (!client) return;
        // mqttPublish(sessionData().browserID, client, mqttTopic(topicRoll), [
        //   newEntry,
        // ]);
      }
    };

    (function rustle(i) {
      setTimeout(function () {
        if (--i) {
          rustle(i);
        }
        nextFrame(i);
        si = si + 1;
      }, speed);
    })(clen * increment + 1);
  };

  const roll = () => {
    const r = rollSingle(selectedDice());
    done = false;
    const sd = settingsData();
    if (!sd || !commentRef) return;
    randomizeText(
      r,
      sd.username,
      commentRef.value,
      sd.color ? sd.color : "#fff",
      () => {
        if (!commentRef) return;
        commentRef.value = "";
      }
    );
  };

  const clearRolls = () => {
    setRollHistory([]);
    saveGenericData(personaRollsKey, []);
  };

  return (
    <div
      class={DiceViewRootStyle}
      style={assignInlineVars(themeVars, currentTheme())}
    >
      <div class={RollInfoStyle}>
        <Flex dn="column">
          <Button size="big" border="underline" onClick={roll}>
            {t("Roll")}
            <span style={{ "font-weight": "bold", "margin-left": "0.5em" }}>
              {selectedDice().replace("d", t("dice_letter"))}
            </span>
          </Button>
          <Input
            title={t("Input_comment")}
            ref={(el) => (commentRef = el)}
            placeholder={`${t("Comment")}...`}
            small
          />
          <Texte
            ref={(el) => (outputRef = el)}
            color="secondary"
            style={{ overflow: "hidden", "text-align": "center" }}
          ></Texte>
        </Flex>
      </div>
      <Flex style={{ position: "relative" }}>
        <DiceRollButton />
        <FaSolidTrashCan
          style={{
            bottom: "0px",
            right: "0px",
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={clearRolls}
        />
      </Flex>
      <div class={RollHistoryStyle}>
        <For each={rollHistory()}>
          {(entry) => (
            <Flex title={`${entry.time} ${entry.comment}`}>
              <Texte style={{ color: entry.color }}>{entry.user}</Texte>
              <Texte>{entry.data}</Texte>
            </Flex>
          )}
        </For>
      </div>
    </div>
  );
};
