import { ReactNode, useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { SettingsContext } from '../hooks/useSettingsContext';
import { Spool } from '../types';

interface IProps {
  children: ReactNode;
}

export default function SettingsProvider({ children }: IProps) {
  const [filamentDiameter, setFilamentDiameter] = useLocalStorageState(
    'filamentDiameter',
    {
      defaultValue: 1.75
    }
  );
  const [spools, setSpools] = useLocalStorageState<Spool[]>('spools', {
    defaultValue: []
  });

  const findSpool = useCallback(
    (id) => spools.find((spool) => spool.id === id),
    [spools]
  );
  const addSpool = useCallback(
    (spool) => setSpools((spoolz) => [...spoolz, spool]),
    [setSpools]
  );
  const updateSpool = useCallback(
    (spool) =>
      setSpools((spoolz) => {
        spoolz.splice(
          spoolz.findIndex((innerSpool) => innerSpool.id === spool.id),
          1,
          spool
        );

        return spoolz;
      }),
    [setSpools]
  );
  const removeSpool = useCallback(
    (spool) =>
      setSpools((spoolz) => {
        spoolz.splice(
          spoolz.findIndex((innerSpool) => innerSpool.id === spool.id),
          1
        );

        return spoolz;
      }),
    [setSpools]
  );

  return (
    <SettingsContext.Provider
      value={{
        spools,
        findSpool,
        addSpool,
        updateSpool,
        removeSpool,
        setSpools,
        filamentDiameter,
        setFilamentDiameter
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
