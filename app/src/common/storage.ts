import { v4 as uuidv4 } from "uuid";
import { setSessionData, setStorageSize } from "./state";
import { emptySessionInfo, SessionInfo } from "./types";
import { compressData, decompressData } from "./util";

export const personaSessionKey = "persona-session";
export const personaRollsKey = "persona-rolls";

export const saveSessionData = (value: SessionInfo) => {
  localStorage.setItem(personaSessionKey, compressData(value));
  updateStoreSize();
};

export const loadSessionData = () => {
  const sdata = localStorage.getItem(personaSessionKey);
  if (!sdata) {
    const sd = emptySessionInfo(true);
    localStorage.setItem(personaSessionKey, compressData(sd));
    setSessionData(sd);
    saveSessionData(sd);
    return sd;
  } else {
    const dd = decompressData(sdata) as SessionInfo;
    if (!dd.lang) dd.lang = "en";
    if (!dd.color) dd.color = "#ffffff";
    if (dd.browserID.trim() == "") {
      dd.browserID = uuidv4();
      saveSessionData(dd);
    }
    setSessionData(dd);
    return dd;
  }
};

export const saveGenericData = (key: string, data: any) => {
  const toSave = compressData(data);
  console.log("saving", toSave.toString().length, "bytes", toSave);

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
  const keys = [personaSessionKey, personaRollsKey];
  keys.forEach((k) => {
    const data = localStorage.getItem(k);
    size += data ? data.length : 0;
  });
  setStorageSize(size);
  return size;
};
