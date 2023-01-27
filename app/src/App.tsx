import { Route, Routes } from "@solidjs/router";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Component, createEffect, ParentProps } from "solid-js";
import { appStyle } from "./app.css";
import { currentTheme, currentThemeClass, themeVars } from "./common";
import { MainView } from "./routes/MainView";
import toast, { Toaster } from "solid-toast";
import { ConnectView } from "./routes/ConnectView/ConnectView";
import { TplView } from "./views/TplView";

const Main: Component<ParentProps> = ({ children }) => {
  createEffect(() => {
    const el = document.documentElement.classList.add(currentThemeClass());
  });

  return (
    // <div class={currentThemeClass()}>
    <div>
      {/* <div class={appStyle} style={assignInlineVars(themeVars, currentTheme())}> */}
      <div class={appStyle}>{children}</div>
      <Toaster />
    </div>
  );
};

const App: Component = () => {
  return (
    <Main>
      <Routes>
        <Route path="/" component={MainView} />
        <Route path="/connect" component={ConnectView} />
      </Routes>
    </Main>
  );
};

export default App;
