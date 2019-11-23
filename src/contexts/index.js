import React, { createContext, useState } from 'react';

import useArrUpdate from '../hooks/useArrUpdate';
import useSubjUpdate from '../hooks/useSubjUpdate';

export const Context = createContext();

export function Provider(props) {
  console.log('IN CONTEXT');
  const [difficulty, setDifficulty] = useState(0);
  const [latam, setLatam] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [subjArr, changeSubj] = useSubjUpdate();
  const [tenseArr, updateTense] = useArrUpdate();

  return (
    <Context.Provider
      value={{
        changeSubj,
        difficulty,
        latam,
        loggedIn,
        setDifficulty,
        setLatam,
        setLoggedIn,
        subjArr,
        tenseArr,
        updateTense
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
