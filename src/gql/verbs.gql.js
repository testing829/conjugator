import gql from 'graphql-tag';

const REGULAR = gql`
  query($latam: Boolean!, $tenseArr: [String!], $subjArr: [String!]) {
    verbs(
      where: {
        OR: [
          {
            tenseEnglish_in: $tenseArr
            infinitive_in: [
              "caminar"
              "hablar"
              "ayudar"
              "necesitar"
              "escribir"
              "esperar"
              "cocinar"
              "comer"
              "beber"
              "vivir"
            ]
            moodEnglish: "Indicative"
          }
          {
            tenseEnglish_in: $subjArr
            infinitive_in: [
              "caminar"
              "hablar"
              "ayudar"
              "necesitar"
              "escribir"
              "esperar"
              "cocinar"
              "comer"
              "beber"
              "vivir"
            ]
            moodEnglish: "Subjunctive"
          }
        ]
      }
    ) {
      form1p
      form1s
      form2p @skip(if: $latam)
      form2s
      form3p
      form3s
      infinitive
      infinitiveEnglish
      moodEnglish
      tenseEnglish
      verbEnglish
    }
  }
`;

const IRREGULAR = gql`
  query($latam: Boolean!, $tenseArr: [String!], $subjArr: [String!]) {
    verbs(
      where: {
        OR: [
          {
            tenseEnglish_in: $tenseArr
            infinitive_in: [
              "saber"
              "dormir"
              "morir"
              "mover"
              "jugar"
              "encontrar"
              "empezar"
              "entender"
              "querer"
              "conocer"
              "conducir"
              "traducir"
              "salir"
              "traer"
              "hacer"
              "tener"
              "ser"
              "estar"
              "dar"
            ]
            moodEnglish: "Indicative"
          }
          {
            tenseEnglish_in: $subjArr
            infinitive_in: [
              "saber"
              "dormir"
              "morir"
              "mover"
              "jugar"
              "encontrar"
              "empezar"
              "entender"
              "querer"
              "conocer"
              "conducir"
              "traducir"
              "salir"
              "traer"
              "hacer"
              "tener"
              "ser"
              "estar"
              "dar"
            ]
            moodEnglish: "Subjunctive"
          }
        ]
      }
    ) {
      form1p
      form1s
      form2p @skip(if: $latam)
      form2s
      form3p
      form3s
      infinitive
      infinitiveEnglish
      moodEnglish
      tenseEnglish
      verbEnglish
    }
  }
`;

const REG_AND_IRREGULAR = gql`
  query($latam: Boolean!, $tenseArr: [String!], $subjArr: [String!]) {
    verbs(
      where: {
        OR: [
          {
            tenseEnglish_in: $tenseArr
            infinitive_in: [
              "caminar"
              "hablar"
              "ayudar"
              "necesitar"
              "escribir"
              "esperar"
              "cocinar"
              "comer"
              "beber"
              "vivir"
              "saber"
              "dormir"
              "morir"
              "mover"
              "jugar"
              "encontrar"
              "empezar"
              "entender"
              "querer"
              "conocer"
              "conducir"
              "traducir"
              "salir"
              "traer"
              "hacer"
              "tener"
              "ser"
              "estar"
              "dar"
            ]
            moodEnglish: "Indicative"
          }
          {
            tenseEnglish_in: $subjArr
            infinitive_in: [
              "caminar"
              "hablar"
              "ayudar"
              "necesitar"
              "escribir"
              "esperar"
              "cocinar"
              "comer"
              "beber"
              "vivir"
              "saber"
              "dormir"
              "morir"
              "mover"
              "jugar"
              "encontrar"
              "empezar"
              "entender"
              "querer"
              "conocer"
              "conducir"
              "traducir"
              "salir"
              "traer"
              "hacer"
              "tener"
              "ser"
              "estar"
              "dar"
            ]
            moodEnglish: "Subjunctive"
          }
        ]
      }
    ) {
      form1p
      form1s
      form2p @skip(if: $latam)
      form2s
      form3p
      form3s
      infinitive
      infinitiveEnglish
      moodEnglish
      tenseEnglish
      verbEnglish
    }
  }
`;

const All_VERBS = gql`
  query($latam: Boolean!, $tenseArr: [String!], $subjArr: [String!]) {
    verbs(
      where: {
        OR: [
          {
            AND: [{ tenseEnglish_in: $tenseArr }, { moodEnglish: "Indicative" }]
          }
          {
            AND: [{ tenseEnglish_in: $subjArr }, { moodEnglish: "Subjunctive" }]
          }
        ]
      }
    ) {
      form1p
      form1s
      form2p @skip(if: $latam)
      form2s
      form3p
      form3s
      infinitive
      infinitiveEnglish
      moodEnglish
      tenseEnglish
      verbEnglish
    }
  }
`;

const VERB_QUERY = [REGULAR, IRREGULAR, REG_AND_IRREGULAR, All_VERBS];

export { VERB_QUERY };
