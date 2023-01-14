/* @refresh reload */
import { createI18nContext, I18nContext } from "@solid-primitives/i18n";
import { hashIntegration, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import App from "./App";
import {
  extractQueryParam,
  loadSettings,
  settingsData,
  updateStoreSize,
} from "./common";
import { mqttConnect } from "./common/mqtt";
import { messages_en } from "./locales/en/en";
import { messages_pl } from "./locales/pl/pl";

const dictionaries = {
  en: messages_en,
  pl: messages_pl,
};

let lang = "en";
const sdata = loadSettings();

updateStoreSize();
if (sdata.app.lang) {
  lang = sdata.app.lang;
}
const langparam = extractQueryParam("lang");
if (langparam && langparam != "") {
  lang = langparam;
}

const langContext = createI18nContext(dictionaries, lang);

if (settingsData().comms.type == "mqtt") {
  mqttConnect();
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
