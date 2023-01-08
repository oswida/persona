import { Route, Routes } from "@solidjs/router";
import type { Component, ParentProps } from "solid-js";
import { appStyle } from "./app.css";
import { themeClass } from "./common";
import { MainView } from "./routes/MainView";

const Main: Component<ParentProps> = ({ children }) => {
  return (
    <div class={themeClass}>
      <div class={appStyle}>{children}</div>
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
