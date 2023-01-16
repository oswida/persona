import { Component, Show } from "solid-js";
import { TplMarkStyle } from "./styles.css";

type Props = {
  decoration: "circle" | "square" | "star";
  checked?: boolean;
  onClick?: () => void;
};

export const Mark: Component<Props> = ({ checked, decoration, onClick }) => {
  return (
    <div
      onClick={onClick}
      class={TplMarkStyle({
        decoration: decoration,
        checked: checked,
      })}
    >
      {" "}
    </div>
  );
};
