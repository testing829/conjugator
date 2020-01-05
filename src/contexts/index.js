import React, { createContext, useState } from 'react';

import useArrUpdate from '../hooks/useArrUpdate';
import useSubjUpdate from '../hooks/useSubjUpdate';

export const Context = createContext();

export function Provider(props) {
  const [difficulty, setDifficulty] = useState(0);
  const [frenchDifficulty, setFrenchDifficulty] = useState(0);
  const [gotSettingData, setGotSettingData] = useState(false);
  const [latam, setLatam] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [subjArr, changeSubj, setSubjArr] = useSubjUpdate();
  const [tenseArr, updateTense, setArr] = useArrUpdate();

  const [subjFrenchArr, changeFrenchSubj, setFrenchSubjArr] = useSubjUpdate();
  const [tenseFrenchArr, updateFrenchTense, setFrenchArr] = useArrUpdate();

  return (
    <Context.Provider
      value={{
        changeFrenchSubj,
        changeSubj,
        difficulty,
        frenchDifficulty,
        gotSettingData,
        latam,
        loggedIn,
        setArr,
        setDifficulty,
        setFrenchArr,
        setFrenchDifficulty,
        setFrenchSubjArr,
        setGotSettingData,
        setLatam,
        setLoggedIn,
        setSubjArr,
        subjArr,
        subjFrenchArr,
        tenseArr,
        tenseFrenchArr,
        updateFrenchTense,
        updateTense
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
