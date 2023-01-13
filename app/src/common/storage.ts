import { v4 as uuidv4 } from "uuid";
import { setSettingsData, setStorageSize } from "./state";
import { emptySettings, Settings } from "./types";
import { compressData, decompressData } from "./util";

export const personaSettingsKey = "persona-settings";
export const personaRollsKey = "persona-rolls";

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
    if (!dd.app.lang) dd.app.lang = "en";
    if (!dd.ident.color) dd.ident.color = "#ffffff";
    if (dd.ident.browserID.trim() == "") {
      dd.ident.browserID = uuidv4();
      saveSettings(dd);
    }
    setSettingsData(dd);
    return dd;
  }
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

export const updateStoreSize = () => {
  let size = 0;
  const keys = [personaSettingsKey, personaRollsKey];
  keys.forEach((k) => {
    const data = localStorage.getItem(k);
    size += data ? data.length : 0;
  });
  setStorageSize(size);
  return size;
};