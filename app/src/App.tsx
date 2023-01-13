import { Route, Routes } from "@solidjs/router";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import type { Component, ParentProps } from "solid-js";
import { appStyle } from "./app.css";
import { currentTheme, currentThemeClass, themeVars } from "./common";
import { MainView } from "./routes/MainView";
import toast, { Toaster } from "solid-toast";

const Main: Component<ParentProps> = ({ children }) => {
  return (
    <div class={currentThemeClass()}>
      <div class={appStyle} style={assignInlineVars(themeVars, currentTheme())}>
        {children}
      </div>
      <Toaster />
    </div>
  );
};

const App: Component = () => {
  return (
    <Main>
      <Routes>
        <Route path="/" component={MainView} />
      </Routes>
    </Main>
  );
};

export default App;