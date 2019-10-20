import React, { createContext, useState } from 'react';

import useArrUpdate from '../hooks/useArrUpdate';
import useSubjUpdate from '../hooks/useSubjUpdate';

export const SettingsContext = createContext();

export function SettingsProvider(props) {
  const [advanced, setAdvanced] = useState(false);
  const [beginner, setBeginner] = useState(true);
  const [difficulty, setDifficulty] = useState(0);
  const [intermediate, setIntermediate] = useState(false);
  const [present, setPresent] = useState(true);
  const [pret, setPret] = useState(true);

  const [subjArr, changeSubj] = useSubjUpdate();
  console.log('TCL: SettingsProvider -> subjArr', subjArr);
  const [tenseArr, updateTense] = useArrUpdate();
  console.log('TCL: SettingsProvider -> tenseArr', tenseArr);

  return (
    <SettingsContext.Provider
      value={{
        advanced,
        beginner,
        changeSubj,
        difficulty,
        intermediate,
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
        updateTense
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}
