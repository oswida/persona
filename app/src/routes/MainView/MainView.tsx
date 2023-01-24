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
import toast from "solid-toast";
import Div100vh from "solidjs-div-100vh";
import {
  currentStyle,
  currentTheme,
  darkThemeClass,
  darkThemeVars,
  lightThemeClass,
  lightThemeVars,
  mqttConnectionStatus,
  saveSettings,
  setCurrentTheme,
  setCurrentThemeClass,
  setSettingsData,
  settingsData,
} from "~/common";
import { mqttClientLink, mqttDisconnect } from "~/common/mqtt";
import {
  Accordion,
  Button,
  Dialog,
  Flex,
  Popover,
  Select,
  Texte,
} from "~/components";
import { ButtonStyle } from "~/components/Button/styles.css";
import { CardList } from "~/views/CardView";
import { CardEditor } from "~/views/CardView/CardEditor";
import { ChatView } from "~/views/ChatView";
import { DiceRollerView } from "~/views/DiceRollerView";
import { SessionView } from "~/views/SessionView";
import { SettingsView } from "~/views/SettingsView";
import { MainContentStyle, MainStyle, TopBarStyle } from "./styles.css";

export const MainView = () => {
  const [so, setSo] = createSignal(false);
  const [sd, setSd] = createSignal(false);
  const [sc, setSc] = createSignal(false);
  const [ss, setSs] = createSignal(false);

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
    const newSettings = { ...settingsData() };
    newSettings.app.sessions.current = "";
    newSettings.app.sessions.hosting = false;
    setSettingsData(newSettings);
    saveSettings(newSettings);
    mqttDisconnect();
  };

  return (
    <Div100vh class={MainStyle} style={currentStyle()} id="main-div">
      <Flex dn="column">
        <div class={TopBarStyle} style={currentStyle()}>
          <Flex>
            <Popover persistent trigger={<FaSolidDice />}>
              <DiceRollerView />
            </Popover>
          </Flex>
          <Flex>
            <Popover title="Cards" persistent trigger={<FaSolidIdCard />}>
              <CardEditor />
            </Popover>
          </Flex>
          <Flex vcenter>
            <Show when={mqttConnectionStatus()}>
              <FaSolidNetworkWired />
            </Show>
            <Dialog title="Session management" trigger={<FaSolidGamepad />}>
              <SessionView />
            </Dialog>
            <Show
              when={
                settingsData().app.sessions.current != "" &&
                settingsData().app.sessions.hosting
              }
            >
              <Texte size="small">
                Hosting:{" "}
                {
                  settingsData().app.sessions.hosted[
                    settingsData().app.sessions.current
                  ].name
                }
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
            <Show
              when={
                settingsData().app.sessions.current != "" &&
                !settingsData().app.sessions.hosting
              }
            >
              <Texte size="small">
                Connected to:{" "}
                {
                  settingsData().app.sessions.client[
                    settingsData().app.sessions.current
                  ].name
                }
              </Texte>
              <Button onClick={stopSession} title="Stop Disconnect">
                <FaSolidStop />
              </Button>
            </Show>
          </Flex>
          <Flex>
            <Popover persistent trigger={<FaSolidMessage />}>
              <ChatView />
            </Popover>
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
        <div class={MainContentStyle}>
          <Flex>
            <CardList />
          </Flex>
          {/* <TplView tpl={SampleTpl} /> */}
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
