import { useState } from 'react';

export default function useArrUpdate(val) {
  const [arr, setArr] = useState(['Present', 'Preterite']);

  const changeSubj = val => {
    if (arr.includes(val)) {
      setArr(
        arr.filter(word => {
          return word !== val;
        })
      );
    } else {
      setArr([...arr, val]);
    }
  };
  return [arr, changeSubj, setArr];
}
