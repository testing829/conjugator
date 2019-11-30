import React from 'react';

const TransformVerbEng = ({ classes, verb }) => {
  if (!verb.infinitive) return null;
  console.log('TCL: TransformVerbEng -> verb', verb);
  const {
    englishAnswer,
    infinitive,
    moodEnglish,
    pronoun,
    tenseEnglish
  } = verb;
  // present pefect: I have eaten, he has eaten, w
  // conditional perfect
  // future: will need
  // imperfect: I was eating, you were, he was, we were, you all were, they were

  // imperfect subj: I was translated

  const engPersonObj = {
    form1s: 'I',
    form2s: 'You',
    form3s: 'He/she',
    form1p: 'We',
    form2p: 'You all',
    form3p: 'They'
  };

  const splitAnswer = englishAnswer.replace(/,/g, '').split(' ');

  const answerPreComma = englishAnswer.split(',')[0];
  console.log('TCL: TransformVerbEng -> answerPreComma', answerPreComma);
  const temp = answerPreComma.split(' ');
  temp.shift();
  const cleanedAnswer = temp.join(' ');
  console.log('TCL: TransformVerbEng -> CLEANED', cleanedAnswer);

  if (engPersonObj[pronoun] === 'He/she' && tenseEnglish === 'Present') {
    return `${engPersonObj[pronoun]} ${cleanedAnswer}s`;
  }
  if (
    tenseEnglish === 'Future' ||
    tenseEnglish === 'Conditional' ||
    tenseEnglish.includes('Perfect')
  ) {
    return `${engPersonObj[pronoun]} ${cleanedAnswer}`;
  }

  if (tenseEnglish === 'Imperfect') {
    if (infinitive === 'ser' || infinitive === 'estar') {
      if (engPersonObj[pronoun] === 'He/she' || engPersonObj[pronoun] === 'I') {
        return `${engPersonObj[pronoun]} was`;
      } else {
        return `${engPersonObj[pronoun]} were`;
      }
    }
    if (infinitive === 'saber' || infinitive === 'conocer') {
      return `${engPersonObj[pronoun]} knew`;
    }
    const gerund = splitAnswer.find(word => word.includes('ing'));
    if (moodEnglish === 'Subjunctive') {
      if (engPersonObj[pronoun] === 'He/she' || engPersonObj[pronoun] === 'I') {
        return `${engPersonObj[pronoun]} was ${gerund}`;
      } else {
        return `${engPersonObj[pronoun]} were ${gerund}`;
      }
    } else {
      if (splitAnswer[1] === 'used') {
        // return `${engPersonObj[pronoun]} ${splitAnswer[1]} ${splitAnswer[2]} ${splitAnswer[3]}`;
        return `${engPersonObj[pronoun]} ${cleanedAnswer}`;
      }
      if (engPersonObj[pronoun] === 'He/she' || engPersonObj[pronoun] === 'I') {
        return `${engPersonObj[pronoun]} was ${gerund}`;
      } else {
        return `${engPersonObj[pronoun]} were ${gerund}`;
      }
    }
  } else {
    return `${engPersonObj[pronoun]} ${cleanedAnswer}`;
  }
};

export default TransformVerbEng;
