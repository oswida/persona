import {
  FaSolidDice,
  FaSolidGamepad,
  FaSolidGears,
  FaSolidMessage,
  FaSolidMoon,
  FaSolidNetworkWired,
  FaSolidStop,
  FaSolidSun,
} from "solid-icons/fa";
import { createSignal, Match, Show, Switch } from "solid-js";
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
import { mqttDisconnect } from "~/common/mqtt";
import { Button, Dialog, Flex, Popover, Select, Texte } from "~/components";
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
          <Flex vcenter>
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
              <Button onClick={stopSession}>
                <FaSolidStop />
              </Button>
            </Show>
          </Flex>
          <Flex>
            <Show when={mqttConnectionStatus()}>
              <FaSolidNetworkWired color="green" />
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
          <Flex style={{ "margin-top": "60px" }} dn="column">
            <Select
              options={() => {
                return [
                  { label: "A", value: "A" },
                  { label: "Bsdsd", value: "sdsds" },
                ];
              }}
              label="Session"
            />
            {/* <TplView tpl={SampleTpl} /> */}
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
