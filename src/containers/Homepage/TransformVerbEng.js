import React from 'react';

const TransformVerbEng = (engAnswer, pronoun, tense) => {
  // present pefect: I have eaten, he has eaten, w
  // conditional perfect
  // future: will need
  // imperfect: I was eating, you were, he was, we were, you all were, they were

  const engPersonObj = {
    form1s: 'I',
    form2s: 'You',
    form3s: 'He/she',
    form1p: 'We',
    form2p: 'You all',
    form3p: 'They'
  };
  console.log(
    'TCL: TransformVerbEng -> engAnswer, pronoun',
    engAnswer,
    pronoun,
    tense
  );
  let engTranslation;
  const splitAnswer = engAnswer.replace(/,/g, '').split(' ');
  console.log('TCL: TransformVerbEng -> splitAnswer', splitAnswer);
  if (engPersonObj[pronoun] === 'He/she' && tense === 'Present') {
    return `${engPersonObj[pronoun]} ${splitAnswer[1]}s`;
  } else if (tense === 'Future') {
    return `${engPersonObj[pronoun]} ${splitAnswer[1]} ${splitAnswer[2]}`;
  } else if (
    tense === 'Imperfect' &&
    (engPersonObj[pronoun] === 'He/she' || engPersonObj[pronoun] === 'I')
  ) {
    return `${engPersonObj[pronoun]} ${splitAnswer[1]} ${splitAnswer[2]}`;
  } else {
    return `${engPersonObj[pronoun]} ${splitAnswer[1]}`;
  }
};

export default TransformVerbEng;
