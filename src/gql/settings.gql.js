import gql from 'graphql-tag';

const CREATE_SETTING = gql`
  mutation(
    $difficulty: Int!
    $latam: Boolean!
    $present: Boolean!
    $preterite: Boolean!
    $imperfect: Boolean!
    $future: Boolean!
    $conditional: Boolean!
    $presentPerfect: Boolean!
    $futurePerfect: Boolean!
    $pastPerfect: Boolean!
    $conditionalPerfect: Boolean!
    $subjPresent: Boolean!
    $subjImperfect: Boolean!
    $subjPresentPerfect: Boolean!
  ) {
    createSetting(
      data: {
        difficulty: $difficulty
        latam: $latam
        present: $present
        preterite: $preterite
        imperfect: $imperfect
        future: $future
        conditional: $conditional
        presentPerfect: $presentPerfect
        futurePerfect: $futurePerfect
        pastPerfect: $pastPerfect
        conditionalPerfect: $conditionalPerfect
        subjPresent: $subjPresent
        subjImperfect: $subjImperfect
        subjPresentPerfect: $subjPresentPerfect
      }
    ) {
      id
      latam
      difficulty
      createdAt
    }
  }
`;

export { CREATE_SETTING };
