import { createSignal } from "solid-js";
import { currentSession, settingsData } from "~/common";
import { WhiteboardView } from "../WhiteboardView/WhiteboardView";
import { TableStyle } from "./styles.css";

export const TableView = () => {
  return (
    <div
      class={TableStyle}
      style={{
        "background-image": `url("${currentSession()?.backgroundImg}")`,
      }}
    >
      {/* <WhiteboardView /> */}
    </div>
  );
};
