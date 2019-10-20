import React, { createContext, useState } from 'react';

import useArrUpdate from '../hooks/useArrUpdate';
import useSubjUpdate from '../hooks/useSubjUpdate';
import useToggleState from '../hooks/useToggle';

export const SettingsContext = createContext();

export function SettingsProvider(props) {
  const [advanced, setAdvanced] = useState(false);
  const [beginner, setBeginner] = useState(true);
  const [difficulty, setDifficulty] = useState(0);
  const [intermediate, setIntermediate] = useState(false);
  const [latam, toggleLatam] = useToggleState(true);
  const [present, setPresent] = useState(true);
  const [pret, setPret] = useState(true);

  const [subjArr, changeSubj] = useSubjUpdate();
  const [tenseArr, updateTense] = useArrUpdate();

  return (
    <SettingsContext.Provider
      value={{
        advanced,
        beginner,
        changeSubj,
        difficulty,
        intermediate,
        latam,
        present,
        pret,
        setAdvanced,
        setBeginner,
        setDifficulty,
        setIntermediate,
        setPresent,
        setPret,
        subjArr,
        tenseArr,
        toggleLatam,
        updateTense
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}
