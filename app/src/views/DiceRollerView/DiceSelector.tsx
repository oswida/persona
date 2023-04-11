import { createMemo, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  DiceType,
  selectedDicePool,
  setSelectedDicePool,
} from "~/common";
import { Texte } from "~/components";
import { DiceSelectorControl, DiceSelectorStyle } from "./styles.css";

export const DiceSelector = ({ dice }: { dice: DiceType }) => {
  const addToPool = () => {
    let c = selectedDicePool()[dice];
    if (!c) c = 0;
    c++;
    const newState = { ...selectedDicePool() };
    newState[dice] = c;
    setSelectedDicePool(newState);
  };

  const val = createMemo(() => {
    const pool = selectedDicePool();
    return pool[dice] ? pool[dice] : 0;
  });

  return (
    <div class={DiceSelectorStyle} onClick={addToPool}>
      <Texte>{dice}</Texte>
      <Show when={val() > 0}>
        <Dynamic component="div" class={DiceSelectorControl}>
          {val()}
        </Dynamic>
      </Show>
    </div>
  );
};
