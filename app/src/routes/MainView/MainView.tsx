import {
  FaSolidDice,
  FaSolidGears,
  FaSolidMoon,
  FaSolidSun,
} from "solid-icons/fa";
import { createSignal, Match, Switch } from "solid-js";
import Div100vh from "solidjs-div-100vh";
import {
  currentStyle,
  currentTheme,
  darkThemeClass,
  darkThemeVars,
  lightThemeClass,
  lightThemeVars,
  setCurrentTheme,
  setCurrentThemeClass,
} from "~/common";
import { Button, Dialog, Flex, Popover } from "~/components";
import { DiceRollerView } from "~/views/DiceRollerView";
import { SettingsView } from "~/views/SettingsView";
import { MainStyle, TopBarStyle } from "./styles.css";

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

  return (
    <Div100vh class={MainStyle} style={currentStyle()}>
      <div class={TopBarStyle} style={currentStyle()}>
        <Flex>
          <Popover trigger={<FaSolidDice />}>
            <DiceRollerView />
          </Popover>
        </Flex>
        <Flex>
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
          <Dialog
            trigger={<FaSolidGears />}
            title="Settings"
            open={so}
            setOpen={setSo}
          >
            <SettingsView setOpen={setSo} />
          </Dialog>
        </Flex>
      </div>
    </Div100vh>
  );
};