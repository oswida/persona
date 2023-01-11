import { FaSolidMoon, FaSolidSun } from "solid-icons/fa";
import { Match, Switch } from "solid-js";
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
import { ButtonCt } from "~/components";
import { MainStyle, TopBarStyle } from "./styles.css";

export const MainView = () => {
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
        <ButtonCt onClick={switchTheme}>
          <Switch>
            <Match when={currentTheme() == darkThemeVars}>
              <FaSolidSun />
            </Match>
            <Match when={currentTheme() == lightThemeVars}>
              <FaSolidMoon />
            </Match>
          </Switch>
        </ButtonCt>
      </div>
    </Div100vh>
  );
};
