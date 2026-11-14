import { createContext, useContext } from 'react';

import { SettingsContext as SettingsContextType } from '../types';

export const SettingsContext = createContext<SettingsContextType>({
  spools: [],
  filamentDiameter: 1.75,
  setFilamentDiameter: () => {},
  findSpool: () => {
    return undefined;
  },
  addSpool: () => {},
  updateSpool: () => {},
  removeSpool: () => {},
  setSpools: () => {}
});

export const useSettingsContext = () => useContext(SettingsContext);
