import { createMemo, createSignal } from "solid-js";
import { appAssets, currentSession } from "~/common";
import { WhiteboardView } from "../WhiteboardView/WhiteboardView";
import { TableStyle } from "./styles.css";
import { Whiteboard } from "../WhiteboardView";

export const TableView = () => {

  return (
    <div
      class={TableStyle}
    // style={{
    //   "background-image": `url("${bkg()}")`,
    // }}
    >
      <Whiteboard />
    </div>
  );
};
