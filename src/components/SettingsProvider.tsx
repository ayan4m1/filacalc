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
    (id: string) => spools.find((spool) => spool.id === id),
    [spools]
  );
  const addSpool = useCallback(
    (spool: Spool) => setSpools((spools) => [...spools, spool]),
    [setSpools]
  );
  const updateSpool = useCallback(
    (spool: Spool) =>
      setSpools((spools) => {
        const newSpools = [...spools];

        newSpools.splice(
          spools.findIndex((innerSpool) => innerSpool.id === spool.id),
          1,
          spool
        );

        return newSpools;
      }),
    [setSpools]
  );
  const removeSpool = useCallback(
    (spool: Spool) =>
      setSpools((spools) => {
        const newSpools = [...spools];

        newSpools.splice(
          spools.findIndex((innerSpool) => innerSpool.id === spool.id),
          1
        );

        return newSpools;
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
