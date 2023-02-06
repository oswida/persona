import { CopyToClipboard } from "solid-copy-to-clipboard";
import {
  FaSolidClipboard,
  FaSolidDice,
  FaSolidGamepad,
  FaSolidGears,
  FaSolidIdCard,
  FaSolidMessage,
  FaSolidMoon,
  FaSolidNetworkWired,
  FaSolidPalette,
  FaSolidStop,
  FaSolidSun,
  FaSolidUser,
} from "solid-icons/fa";
import { createSignal, Match, Show, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
import toast from "solid-toast";
import Div100vh from "solidjs-div-100vh";
import {
  cardsVisible,
  charsheetVisible,
  chatVisible,
  currentFont,
  currentTheme,
  currentThemeIdx,
  mqttConnectionStatus,
  netDisconnect,
  netSessionLink,
  personaSessionsKey,
  saveGenericData,
  sessionData,
  setCardsVisible,
  setCharsheetVisible,
  setChatVisible,
  setCurrentTheme,
  setSessionData,
  storageSize,
  themeList,
  themeMap,
} from "~/common";
import {
  Button,
  Dialog,
  Flex,
  Popover,
  Select,
  SelectOption,
  Texte,
} from "~/components";
import { ButtonStyle } from "~/components/Button/styles.css";
import { CardList } from "~/views/CardView";
import { CharsheetView } from "~/views/CharsheetView";

import { ChatView } from "~/views/ChatView";
import { DiceRollerView } from "~/views/DiceRollerView";
import { SessionView } from "~/views/SessionView";
import { SettingsView } from "~/views/SettingsView";
import { TableView } from "~/views/TableView";
import { MainContentStyle, MainStyle, TopBarStyle } from "./styles.css";

export const MainView = () => {
  const [so, setSo] = createSignal(false);
  const [settApi, setSettApi] = createSignal<any>();

  const stopSession = () => {
    const newSettings = { ...sessionData() };
    newSettings.current = "";
    newSettings.hosting = false;
    setSessionData(newSettings);
    saveGenericData(personaSessionsKey, newSettings);
    netDisconnect();
  };

  return (
    <Div100vh
      class={MainStyle({
        font: currentFont(),
      })}
      id="main-div"
    >
      <Flex dn="column">
        <div class={TopBarStyle}>
          <Flex>
            <Button
              onClick={() => setCardsVisible(!cardsVisible())}
              selected={cardsVisible}
              shape="icon"
            >
              <FaSolidIdCard />
            </Button>
            <Button
              onClick={() => setCharsheetVisible(!charsheetVisible())}
              selected={charsheetVisible}
              shape="icon"
            >
              <FaSolidUser />
            </Button>
          </Flex>
          <Flex>
            <Popover persistent trigger={<FaSolidDice />} triggerShape="icon">
              <DiceRollerView />
            </Popover>
          </Flex>

          <Flex vcenter>
            <Show when={mqttConnectionStatus()}>
              <FaSolidNetworkWired />
            </Show>
            <Dialog
              title="Session management"
              trigger={<FaSolidGamepad />}
              triggerShape="icon"
            >
              <SessionView />
            </Dialog>
            <Show when={sessionData().current != "" && sessionData().hosting}>
              <Texte size="middle">
                Hosting: {sessionData().hosted[sessionData().current].name}
              </Texte>
              <Button onClick={stopSession} title="Stop hosting" shape="icon">
                <FaSolidStop />
              </Button>
              <CopyToClipboard
                text={netSessionLink()}
                onCopy={() => toast("Session link copied to clipboard")}
                eventTrigger="onClick"
              >
                <div
                  title="Copy session link"
                  class={ButtonStyle({ shape: "icon" })}
                >
                  <FaSolidClipboard />
                </div>
              </CopyToClipboard>
            </Show>
            <Show when={sessionData().current != "" && !sessionData().hosting}>
              <Texte size="small">
                Connected to: {sessionData().client[sessionData().current].name}
              </Texte>
              <Button onClick={stopSession} title="Stop Disconnect">
                <FaSolidStop />
              </Button>
            </Show>
          </Flex>
          <Flex vcenter>
            <Dynamic component={Texte} size="small">
              {storageSize() / 1000} KB
            </Dynamic>
            <Button
              onClick={() => setChatVisible(!chatVisible())}
              selected={chatVisible}
              shape="icon"
            >
              <FaSolidMessage />
            </Button>

            <Dialog
              trigger={<FaSolidGears />}
              triggerShape="icon"
              title="Settings"
              passApi={setSettApi}
            >
              <SettingsView api={settApi} />
            </Dialog>
          </Flex>
        </div>
        <div class={MainContentStyle} id="main-content">
          <Flex>
            <Show when={cardsVisible()}>
              <CardList />
            </Show>
            <Show when={charsheetVisible()}>
              <CharsheetView />
            </Show>
            <TableView />
            <Show when={chatVisible()}>
              <ChatView />
            </Show>
          </Flex>
        </div>
      </Flex>
    </Div100vh>
  );
};
