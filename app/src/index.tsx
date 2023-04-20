/* @refresh reload */
import { appSettings } from "./common";
import { createI18nContext, I18nContext } from "@solid-primitives/i18n";
import { hashIntegration, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import App from "./App";
import {
  appSessions,
  extractQueryParam,
  netConnect,
  setCurrentFont,
  setCurrentTheme,
  updateStoreSize,
} from "./common";
import { messages_en } from "./locales/en/en";
import { messages_pl } from "./locales/pl/pl";


const dictionaries = {
  en: messages_en,
  pl: messages_pl,
};

let lang = "en";
setCurrentTheme(appSettings().app.theme!);
setCurrentFont(appSettings().app.font!);
updateStoreSize();
if (appSettings().app.lang) {
  lang = appSettings().app.lang;
}
const langparam = extractQueryParam("lang");
if (langparam && langparam != "") {
  lang = langparam;
}

const langContext = createI18nContext(dictionaries, lang);


if (appSessions().current !== "") {
  netConnect();
}

render(
  () => (
    <I18nContext.Provider value={langContext}>
      <Router source={hashIntegration()}>
        <App />
      </Router>
    </I18nContext.Provider>
  ),
  document.getElementById("root") as HTMLElement
);
