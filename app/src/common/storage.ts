import { v4 as uuidv4 } from "uuid";
import { setCharsheetData } from "~/common";
import {
  setCardsData,
  setSessionData,
  setSettingsData,
  setStorageSize,
} from "./state";
import { CardData, emptySettings, Settings } from "./types";
import { compressData, decompressData } from "./util";

export const personaSettingsKey = "persona-settings";
export const personaCardsKey = "persona-cards";
export const personaRollsKey = "persona-rolls";
export const personaSessionsKey = "persona-sessions";
export const personaCharsheetKey = "persona-charsheets";

export const saveSettings = (value: Settings) => {
  localStorage.setItem(personaSettingsKey, compressData(value));
  updateStoreSize();
};

export const loadSettings = () => {
  const sdata = localStorage.getItem(personaSettingsKey);
  if (!sdata) {
    const sd = emptySettings(true);
    localStorage.setItem(personaSettingsKey, compressData(sd));
    setSettingsData(sd);
    saveSettings(sd);
    return sd;
  } else {
    const dd = decompressData(sdata) as Settings;
    console.log(dd.app);
    if (!dd.app.lang) dd.app.lang = "en";
    if (!dd.app.theme) dd.app.theme = "darksand";
    if (!dd.app.font) dd.app.font = "Lato";
    if (!dd.ident.color) dd.ident.color = "#ffffff";
    if (dd.ident.browserID.trim() == "") {
      dd.ident.browserID = uuidv4();
      saveSettings(dd);
    }
    setSettingsData(dd);
    return dd;
  }
};

export const loadCards = () => {
  const sdata = localStorage.getItem(personaCardsKey);
  if (!sdata) {
    setCardsData({});
    saveGenericData(personaCardsKey, {});
    return;
  }
  const dd = decompressData(sdata) as Record<string, CardData>;
  setCardsData(dd);
};

export const saveGenericData = (key: string, data: any) => {
  const toSave = compressData(data);

  localStorage.setItem(key, toSave);
  updateStoreSize();
};

export const loadRolls = (appData: any) => {
  const data = localStorage.getItem(personaRollsKey);
  if (!data) return;
  const dd = decompressData(data);
  appData.setRollHistory(dd);
};

export const loadSessions = () => {
  const data = localStorage.getItem(personaSessionsKey);
  if (!data) return;
  const dd = decompressData(data);
  setSessionData(dd);
};

export const loadCharsheets = () => {
  const data = localStorage.getItem(personaCharsheetKey);
  if (!data) return;
  const dd = decompressData(data);
  setCharsheetData(dd);
};

export const updateStoreSize = () => {
  let size = 0;
  const keys = [
    personaSettingsKey,
    personaRollsKey,
    personaCardsKey,
    personaSessionsKey,
    personaCharsheetKey,
  ];
  keys.forEach((k) => {
    const data = localStorage.getItem(k);
    size += data ? data.length : 0;
  });
  setStorageSize(size);
  return size;
};
