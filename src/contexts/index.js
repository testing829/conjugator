import React, { createContext, useState } from 'react';

import useArrUpdate from '../hooks/useArrUpdate';
import useSubjUpdate from '../hooks/useSubjUpdate';
import useToggleState from '../hooks/useToggle';

export const Context = createContext();

export function Provider(props) {
  const [advanced, setAdvanced] = useState(false);
  const [beginner, setBeginner] = useState(true);
  const [difficulty, setDifficulty] = useState(0);
  const [intermediate, setIntermediate] = useState(false);
  const [latam, toggleLatam] = useToggleState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [present, setPresent] = useState(true);
  const [pret, setPret] = useState(true);

  const [subjArr, changeSubj] = useSubjUpdate();
  const [tenseArr, updateTense] = useArrUpdate();

  return (
    <Context.Provider
      value={{
        advanced,
        beginner,
        changeSubj,
        difficulty,
        intermediate,
        latam,
        loggedIn,
        present,
        pret,
        setAdvanced,
        setBeginner,
        setDifficulty,
        setIntermediate,
        setLoggedIn,
        setPresent,
        setPret,
        subjArr,
        tenseArr,
        toggleLatam,
        updateTense
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
