import PropTypes from 'prop-types';
import { useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { SettingsContext } from 'hooks/useSettingsContext';

export default function SettingsProvider({ children }) {
  const [spools, setSpools] = useLocalStorageState('spools', {
    defaultValue: []
  });
  const [filamentDiameter, setFilamentDiameter] = useLocalStorageState(
    'filamentDiameter',
    { defaultValue: 1.75 }
  );

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
        filamentDiameter,
        setFilamentDiameter,
        spools,
        findSpool,
        addSpool,
        updateSpool,
        removeSpool
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired
};
