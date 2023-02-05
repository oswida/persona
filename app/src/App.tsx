import { Route, Routes } from "@solidjs/router";
import { Component, createEffect, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Toaster } from "solid-toast";
import { ConfirmDialog } from "~/components";
import { appStyle } from "./app.css";
import { darksandThemeClass } from "./common";
import { StrInputDialog } from "./components";
import { ConnectView } from "./routes/ConnectView/ConnectView";
import { MainView } from "./routes/MainView";

const Main: ({ children }: { children: any }) => JSX.Element = ({
  children,
}) => {
  createEffect(() => {
    document.documentElement.classList.add(darksandThemeClass);
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
