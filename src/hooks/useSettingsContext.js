import { createContext, useContext } from 'react';

export const SettingsContext = createContext({
  spools: []
});

export const useSettingsContext = () => useContext(SettingsContext);
