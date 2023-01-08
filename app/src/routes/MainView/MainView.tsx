import { CharEditor } from "~/views/CharEditor";
import { sample } from "~/views/CharEditor/sample";
import { MainStyle } from "./styles.css";

export const MainView = () => {
  return (
    <div class={MainStyle}>
      <CharEditor data={{}} schema={sample} />
    </div>
  );
};
