import {
  FaSolidIdCard,
} from "solid-icons/fa";
import { createSignal, Show } from "solid-js";
import Div100vh from "solidjs-div-100vh";
import {
  currentFont,
  themeVars,
} from "~/common";
import { Button, Flex, Texte } from "~/components";
import { CardSlider } from "~/views/CardView/CardSlider";
import { TableView } from "~/views/TableView";
import { MainContentStyle, MainStyle } from "./styles.css";
import { RightView } from "~/views/RightView";
import { LeftView } from "~/views/LeftView";
import { Whiteboard } from "~/views/WhiteboardView";

export const MainView = () => {
  const [sco, setSco] = createSignal(false);
  return (
    <Div100vh
      class={MainStyle({
        font: currentFont(),
      })}
      id="main-div"
    >
      <div class={MainContentStyle} id="main-content">
        <LeftView />
        <Whiteboard />
        <RightView />
      </div>
    </Div100vh>
  );
};
