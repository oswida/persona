import {
  setStorageSize,
} from "./state";
import { AssetType, CardData, emptySessions, emptySettings, SessionSettings, Settings, StorageItemType } from "./types";
import { compressData, decompressData } from "./util";
import { createLocalStorage } from "@solid-primitives/storage";


export const personaSettingsKey = "settings";
export const personaCardsKey = "cards";
export const personaSessionsKey = "sessions";
export const personaAssetsKey = "assets";

export const [appStore, setAppStore, { remove, clear, toJSON }] = createLocalStorage({
  prefix: 'persona',
  serializer: (value: StorageItemType, key: string) => { return compressData(value); },
  deserializer: (value: string, key: string) => {
    switch (key) {
      case "settings": return decompressData(value) as Settings;
      case "session": return decompressData(value) as SessionSettings;
      case "cards": return decompressData(value) as Record<string, CardData>;
      case "assets": return decompressData(value) as Record<string, AssetType>;
      default: return decompressData(value) as string;
    }
  }
});

export const saveToStorage = (key: string, data: any) => {
  setAppStore(key, data);
  updateStoreSize();
};

export const updateStoreSize = () => {
  let size = 0;
  const keys = [
    personaSettingsKey,
    personaCardsKey,
    personaSessionsKey,
    personaAssetsKey
  ];
  keys.forEach((k) => {
    const data = localStorage.getItem(`persona.${k}`);
    size += data ? data.length : 0;
  });
  setStorageSize(size);
  return size;
};

export const appSessions = () => {
  let sessions = appStore.sessions as SessionSettings;
  if (!sessions) {
    sessions = emptySessions();
    setAppStore(personaSessionsKey, sessions);
  }
  return sessions;
};

export const appSettings = () => {
  let settings = appStore.settings as Settings;
  if (!settings) {
    settings = emptySettings(true);
    setAppStore(personaSettingsKey, settings);
  }
  return settings;
};

export const appCards = () => {
  let cards = appStore.cards as Record<string, CardData>;
  if (!cards) {
    cards = {};
    setAppStore(personaCardsKey, cards);
  }
  return cards;
};

export const appAssets = () => {
  let assets = appStore.assets as Record<string, AssetType>;
  if (!assets) {
    assets = {};
    setAppStore(personaAssetsKey, assets);
  }
  return assets;
};









