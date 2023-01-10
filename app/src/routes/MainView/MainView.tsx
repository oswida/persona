import { FaSolidPalette } from "solid-icons/fa";
import { Flex, Popover, Tabs, TabsDesc } from "~/components";
import { CharEditor } from "~/views/CharEditor";
import { sample } from "~/views/CharEditor/sample";
import { DiceView } from "~/views/DiceView";
import { WhiteboardView } from "~/views/WhiteboardView/WhiteboardView";
import { MainStyle } from "./styles.css";

export const MainView = () => {
  const views: TabsDesc[] = [
    {
      value: "charview",
      label: "Characters",
      content: <CharEditor schema={sample} data={{}} />,
    },
    {
      value: "drawview",
      label: "Draw",
      content: <WhiteboardView />,
    },
  ];
  return (
    <div class={MainStyle}>
      <Flex type="row">
        <DiceView />
        <Tabs items={views}></Tabs>
      </Flex>
    </div>
  );
};
