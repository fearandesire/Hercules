import {
  container
} from '@sapphire/pieces';
export function OrganizeTeams(CombinedTeamsList){
    //? The list of teams are sorted via Away Teams first, then Home Teams. This is equal to Away teams being even, and Home teams being odd.
    for (let i = 0; i < CombinedTeamsList.length; i++) {
        //? Using the index of the array to determine if the team is Home or Away via the modulus operator.
        if (i % 2 === 0) {
          var AwayTeamName = CombinedTeamsList[i];
          container.HomeAndAwayTeams[`teams`][i] = container.HomeAndAwayTeams[`teams`][i] || {}
          //* Storing Home Team into an Array and Object.
          container.AwayTeamList.push(AwayTeamName)
          container.HomeAndAwayTeams[`teams`][i][`AwTeam`] = AwayTeamName;
        } else {
          var HomeTeamName = CombinedTeamsList[i]
          const adjustedIndex = i - 1;
          container.HomeAndAwayTeams[`teams`][adjustedIndex] = container.HomeAndAwayTeams[`teams`][adjustedIndex] || {}
          container.HomeTeamList.push(HomeTeamName)
          container.HomeAndAwayTeams[`teams`][adjustedIndex][`hTeam`] = HomeTeamName;
        }
      }
}