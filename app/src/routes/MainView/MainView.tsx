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
  FaSolidStop,
  FaSolidSun,
} from "solid-icons/fa";
import { createSignal, Match, Show, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
import toast from "solid-toast";
import Div100vh from "solidjs-div-100vh";
import {
  cardsVisible,
  chatVisible,
  currentStyle,
  currentTheme,
  darkThemeClass,
  darkThemeVars,
  lightThemeClass,
  lightThemeVars,
  mqttConnectionStatus,
  personaSessionsKey,
  saveGenericData,
  sessionData,
  setCardsVisible,
  setChatVisible,
  setCurrentTheme,
  setCurrentThemeClass,
  setSessionData,
  storageSize,
} from "~/common";
import { mqttClientLink, mqttDisconnect } from "~/common/mqtt";
import { Button, Dialog, Flex, Popover, Texte } from "~/components";
import { ButtonStyle } from "~/components/Button/styles.css";
import { CardList } from "~/views/CardView";

import { ChatView } from "~/views/ChatView";
import { DiceRollerView } from "~/views/DiceRollerView";
import { SessionView } from "~/views/SessionView";
import { SettingsView } from "~/views/SettingsView";
import { TableView } from "~/views/TableView";
import { MainContentStyle, MainStyle, TopBarStyle } from "./styles.css";

export const MainView = () => {
  const [so, setSo] = createSignal(false);

  const switchTheme = () => {
    if (currentTheme() == darkThemeVars) {
      setCurrentTheme(lightThemeVars);
      setCurrentThemeClass(lightThemeClass);
    } else {
      setCurrentTheme(darkThemeVars);
      setCurrentThemeClass(darkThemeClass);
    }
  };

  const stopSession = () => {
    const newSettings = { ...sessionData() };
    newSettings.current = "";
    newSettings.hosting = false;
    setSessionData(newSettings);
    saveGenericData(personaSessionsKey, newSettings);
    mqttDisconnect();
  };

  return (
    <Div100vh class={MainStyle} id="main-div" style={currentStyle()}>
      <Flex dn="column">
        <div class={TopBarStyle}>
          <Flex>
            <Button onClick={() => setCardsVisible(!cardsVisible())}>
              <FaSolidIdCard />
            </Button>
          </Flex>
          <Flex>
            <Popover persistent trigger={<FaSolidDice />}>
              <DiceRollerView />
            </Popover>
          </Flex>

          <Flex vcenter>
            <Show when={mqttConnectionStatus()}>
              <FaSolidNetworkWired />
            </Show>
            <Dialog title="Session management" trigger={<FaSolidGamepad />}>
              <SessionView />
            </Dialog>
            <Show when={sessionData().current != "" && sessionData().hosting}>
              <Texte size="small">
                Hosting: {sessionData().hosted[sessionData().current].name}
              </Texte>
              <Button onClick={stopSession} title="Stop hosting">
                <FaSolidStop />
              </Button>
              <CopyToClipboard
                text={mqttClientLink()}
                onCopy={() => toast("Session link copied to clipboard")}
                eventTrigger="onClick"
              >
                <div title="Copy session link" class={ButtonStyle({})}>
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
          <Flex>
            <Dynamic component={Texte} size="small">
              {storageSize() / 1000} KB
            </Dynamic>
            <Button onClick={() => setChatVisible(!chatVisible())}>
              <FaSolidMessage />
            </Button>
            <Button onClick={switchTheme}>
              <Switch>
                <Match when={currentTheme() == darkThemeVars}>
                  <FaSolidSun />
                </Match>
                <Match when={currentTheme() == lightThemeVars}>
                  <FaSolidMoon />
                </Match>
              </Switch>
            </Button>
            <Dialog trigger={<FaSolidGears />} title="Settings">
              <SettingsView setOpen={setSo} />
            </Dialog>
          </Flex>
        </div>
        <div class={MainContentStyle} id="main-content">
          <Flex>
            <Show when={cardsVisible()}>
              <CardList />
            </Show>
            <TableView />
            <Show when={chatVisible()}>
              <ChatView />
            </Show>
          </Flex>
        </div>
        {/* <div class={FooterStyle}>
          <Flex>
            <Popover trigger={<FaSolidDice />} open={sd} setOpen={setSd}>
              <DiceRollerView />
            </Popover>
          </Flex>
        </div> */}
      </Flex>
    </Div100vh>
  );
};
