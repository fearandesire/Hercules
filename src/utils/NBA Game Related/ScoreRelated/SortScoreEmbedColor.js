/* eslint-disable no-redeclare */
import {
    logthis,
    yellowBright
} from '../../../lib/hercConfig.js';
import {
    NBATeamHexColors
} from '../../../lib/Storage/NBATeamHexColors.js';
const NBAHexColors = NBATeamHexColors


export function SortScoreEmbedColor(AwScore, HScore, AwayTeam, HomeTeam) {
    if (WhoWon(AwScore, HScore, AwayTeam, HomeTeam) == `Away`) {
        logthis(yellowBright(`-----------`))
        console.log(AwScore)
        var winningteam = JSON.stringify(AwayTeam)
        var findQuotes = /['"]+/g;
        var winningteamNoQuotes = winningteam.replace(findQuotes, '')
        var wTeamLowercase = winningteam.toLowerCase();
        var embedHex = NBAHexColors[winningteamNoQuotes]
        logthis(yellowBright(`-----------`))
        return embedHex;
    } else if (WhoWon(AwScore, HScore, AwayTeam, HomeTeam) == 'Home') {
        logthis(yellowBright(`-----------`))
        console.log(HScore)
        var winningteam = JSON.stringify(HomeTeam)
        var findQuotes = /['"]+/g;
        var winningteamNoQuotes = winningteam.replace(findQuotes, '')
        var wTeamLowercase = winningteam.toLowerCase();
        var embedHex = NBAHexColors[winningteamNoQuotes]
        //var testHex = NBAHexColors.Suns
        logthis(yellowBright(`-----------`))
        return embedHex;
    }
}


export function WhoWon(AwScore, HScore, AwayTeam, HomeTeam) {
    if (parseInt(AwScore) == parseInt(HScore)) {
        var HTeamWithQuotes = JSON.stringify(HomeTeam)
        var findQuotes = /['"]+/g;
        var HTeamNoQuotes = HTeamWithQuotes.replace(findQuotes, '')
        var AwayTeamWithQuotes = JSON.stringify(HomeTeam)
        var AwayTeamNoQuotes = AwayTeamWithQuotes.replace(findQuotes, '')
        var HTeamHex = NBAHexColors[HTeamNoQuotes]
        var AwayTeamHex = NBAHexColors[AwayTeamNoQuotes]
        var teamHexs = [
            `${HTeamHex}`,
            `${AwayTeamHex}`
        ];
        var OneOfTwoHexes = teamHexs[Math.floor(Math.random() * teamHexs.length)];
        return OneOfTwoHexes;
    }
    if (parseInt(AwScore) > parseInt(HScore)) {
        var WhoWonTheGame = `Away`
        return WhoWonTheGame
    } else if (parseInt(HScore) > parseInt(AwScore)) {
        var WhoWonTheGame = 'Home'
        return WhoWonTheGame
    }
}