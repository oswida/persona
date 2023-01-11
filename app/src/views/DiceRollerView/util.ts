import { createMemo } from "solid-js";
import { selectedDicePool } from "~/common";

export const computedDicePool = createMemo(() => {
  const pool = selectedDicePool();
  const dice: string[] = [];
  Object.keys(pool).forEach((key) => {
    const n = pool[key];
    if (n && n > 0) {
      dice.push(`${n}${key}`);
    }
  });
  return dice;
});
