import { Route, Routes } from "@solidjs/router";
import { Component, createEffect, ParentProps } from "solid-js";
import { appStyle } from "./app.css";
import { currentThemeClass } from "./common";
import { MainView } from "./routes/MainView";
import { Toaster } from "solid-toast";
import { ConnectView } from "./routes/ConnectView/ConnectView";
import { ConfirmDialog } from "./components/Dialog/ConfirmDialog";
import { Dynamic } from "solid-js/web";
import { StrInputDialog } from "./components";

const Main: Component<ParentProps> = ({ children }) => {
  createEffect(() => {
    const el = document.documentElement.classList.add(currentThemeClass());
  });

  return (
    <div>
      <div class={appStyle}>{children}</div>
      <Toaster />
      <Dynamic component={ConfirmDialog} />
      <Dynamic component={StrInputDialog} />
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
