const TransformVerbEng = ({ verb }) => {
  if (!verb.infinitive) return null;

  // reflexive verbs. You washed myself. Should be you washed yourself
  // could remove reflexive
  // agredecer = they am grateful for

  const {
    englishAnswer,
    infinitive,
    moodEnglish,
    pronoun,
    tenseEnglish
  } = verb;

  const engPersonObj = {
    form1s: 'I',
    form2s: 'you',
    form3s: 'he/she',
    form1p: 'we',
    form2p: 'you all',
    form3p: 'they'
  };

  const splitAnswer = englishAnswer.replace(/,/g, '').split(' ');
  const answerPreComma = englishAnswer.split(',')[0];
  const temp = answerPreComma.split(' ');
  temp.shift();
  const cleanedAnswer = temp.join(' ');

  if (tenseEnglish === 'Present') {
    if (infinitive === 'ser' || infinitive === 'estar') {
      if (engPersonObj[pronoun] === 'I') {
        return 'I am';
      } else if (engPersonObj[pronoun] === 'he/she') {
        return 'he/she is';
      } else {
        return `${engPersonObj[pronoun]} are`;
      }
    }
  }

  if (engPersonObj[pronoun] === 'he/she' && tenseEnglish === 'Present') {
    return `${engPersonObj[pronoun]} ${cleanedAnswer}s`;
  }
  if (
    tenseEnglish === 'Future' ||
    tenseEnglish === 'Conditional' ||
    tenseEnglish.includes('Perfect')
  ) {
    return `${engPersonObj[pronoun]} ${cleanedAnswer}`;
  }

  if (
    (tenseEnglish === 'Imperfect' || tenseEnglish === 'Preterite') &&
    (infinitive === 'ser' || infinitive === 'estar')
  ) {
    if (engPersonObj[pronoun] === 'he/she' || engPersonObj[pronoun] === 'I') {
      return `${engPersonObj[pronoun]} was`;
    } else {
      return `${engPersonObj[pronoun]} were`;
    }
  }
  if (tenseEnglish === 'Imperfect') {
    if (infinitive === 'saber' || infinitive === 'conocer') {
      return `${engPersonObj[pronoun]} knew`;
    }
    const gerund = splitAnswer.find(word => word.includes('ing'));
    if (moodEnglish === 'Subjunctive') {
      if (engPersonObj[pronoun] === 'he/she' || engPersonObj[pronoun] === 'I') {
        return `${engPersonObj[pronoun]} was ${gerund}`;
      } else {
        return `${engPersonObj[pronoun]} were ${gerund}`;
      }
    } else {
      if (splitAnswer[1] === 'used') {
        return `${engPersonObj[pronoun]} ${cleanedAnswer}`;
      }
      if (engPersonObj[pronoun] === 'he/she' || engPersonObj[pronoun] === 'I') {
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
