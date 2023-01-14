import { Component, ParentProps } from "solid-js";
import { currentStyle } from "~/common";
import { ButtonStyle } from "../Button/styles.css";
import { Texte } from "../Texte";
import { BadgeStyle } from "./styles.css";

export const Badge: Component<ParentProps> = ({ children }) => {
  return (
    <div class={ButtonStyle({ size: "small" })} style={currentStyle()}>
      {children}
    </div>
  );
};
