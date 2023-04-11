import { Route, Routes } from "@solidjs/router";
import { Component, createEffect, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Toaster } from "solid-toast";
import { ConfirmDialog } from "~/components";
import { appStyle } from "./app.css";
import {
  currentFont,
  currentTheme,
  themeMap,
} from "./common";
import { StrInputDialog } from "./components";
import { InfoDialog } from "./components/Dialog/InfoDialog";
import { ConnectView } from "./routes/ConnectView/ConnectView";
import { MainView } from "./routes/MainView";

const Main: ({ children }: { children: any }) => JSX.Element = ({
  children,
}) => {
  createEffect(() => {
    document.documentElement.classList.add(themeMap[currentTheme()]);
  });

  return (
    <div>
      <div class={appStyle({ font: currentFont() })}>{children}</div>
      <Toaster />
      <Dynamic component={ConfirmDialog} />
      <Dynamic component={StrInputDialog} />
      <Dynamic component={InfoDialog} />
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
