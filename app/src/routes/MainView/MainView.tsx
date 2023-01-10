import Div100vh from "solidjs-div-100vh";
import { Flex, TabsCt, TabsDesc } from "~/components";
import { DiceView } from "~/views/DiceView";
import { WhiteboardView } from "~/views/WhiteboardView/WhiteboardView";
import { MainStyle } from "./styles.css";

export const MainView = () => {
  const views: TabsDesc[] = [
    {
      label: "Draw",
      value: <WhiteboardView />,
    },
  ];
  return (
    <Div100vh class={MainStyle}>
      <Flex dn="row" style={{ width: "100%", height: "100%" }}>
        <DiceView />
        <TabsCt items={views}></TabsCt>
      </Flex>
    </Div100vh>
  );
};
