import { createMemo, createSignal } from "solid-js";
import { appAssets, currentSession } from "~/common";
import { WhiteboardView } from "../WhiteboardView/WhiteboardView";
import { TableStyle } from "./styles.css";

export const TableView = () => {
  const bkg = createMemo(() => {
    const session = currentSession();
    if (!session || !session.backgroundImg || session.backgroundImg.trim() === "") return "";
    return appAssets()[session.backgroundImg].uri;
  });
  return (
    <div
      class={TableStyle}
      style={{
        "background-image": `url("${bkg()}")`,
      }}
    >
      {/* <WhiteboardView /> */}
    </div>
  );
};
