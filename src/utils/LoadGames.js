import {
  container
} from '@sapphire/pieces';
import puppeteer from 'puppeteer';
import {
  SapDiscClient
} from '../Hercules.js';
import {
  bold,
  cborder,
  cyanBright,
  green,
  logthis,
  magentaBright,
  NBATeams,
  NBATeamsNickNames, yellowBright
} from '../lib/hercConfig.js';
import {
  CurrentFullDate, timesearch
} from '../lib/Storage/Load-Games-Data.js';
import {
  ScheduleTodaysNBAGames
} from './ScheduleTodaysNBAGames.js';
import { SendEmbedErrorResp } from './SQL/Embeds/ErrorReplyEmbed.js';



/**
 * 
 * @LoadGames function: Scraping ESPN using Puppeteer for NBA Game Data. Passing in an object 
 * @HomeAndAwayTeamsObject object: This will be populated with the Home and Away Teams.
 */



  /* ------------------------- //! Passing in today's date and formatting it for ESPN Schedule URL to give us today's games. ------------------------- */

  export async function LoadGames(HomeAndAwayTeamsObject) {
    var bChannel = container.dbVal[`botChannel`]
    const chan = await SapDiscClient.channels.fetch(bChannel)
    logthis(green("Loading ESPN Game Page."))
    //? Using todays date formatted in a format ESPN will accept (Month, Day & Year all together)
    const ESPNURL = `https://www.espn.com/nba/schedule/_/date/` + CurrentFullDate
    logthis(cyanBright(bold(`[DEBUGGING]: ${ESPNURL}`)))
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    await page.goto(

      ESPNURL
    );
    try {

      // @tableRows AAA
      const tableRows = 'tbody tr'
      //? Counts how many rows we have. Block variable/temp on the amount.
      const rowCount = await page.$$eval(tableRows, (e) => e.length)
      //? Lists how many rows are in the ESPN Game Table. Hashed out for now
      //logthis(rowCount); //(Hashed out for now)
      //? Selector  for the table with the rows of games.
      /* ------------------------------------------------- //! Mapping the data from the table/rows on ESPN ------------------------------------------------- */
      const tableSelector = `#fittPageContainer > div:nth-child(4) > div > div > section > div > div:nth-child(3) > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table`
      const data = await page.$$eval(`#fittPageContainer > div:nth-child(4) > div > div > section > div > div:nth-child(3) > div:nth-child(1) > div > div.flex > div > div.Table__Scroller > table > tbody`, tds => tds.map((td) => {
        //? The table is assigned to `td`, and we can retrieve all text within it with this line.
        //   console.log(td.innerText)
        // eslint-disable-next-line no-undef
        return CompiledGameData = td.innerText;

      })).then(
        /**
        Below, I transform, store and pass along all the NBA Data we have scraped. To help understand why things below are done the way they are, you must first understand Puppeteer's response
        Puppeteer in this instance will return a completely organized mess - but nothing we can't work with.
        
         **/
        (CompiledGameData) => {

          /**
           * @GSTObj - a container that will be populated with the times the NBA Game's start.
           */
          const GSTObj = container.GameStartTime;
          const HomeAndAwayTeamsObject = container.HomeAndAwayTeams;
          const botChannel = container.dbVal[`botChannel`]
          const tabletoString = String(CompiledGameData)
          //  logthis(red(bold(`[DEBUGGING LOADGAMES] tabletoString: ${tabletoString.length}`)))
          //? In this LoadGames function, all the data scraped returns on indiviudal lines. Turning the string into an array.
          const GameDataArray = tabletoString.split("\n")
          // logthis(red(bold(`[DEBUGGING LOADGAMES] GameDataArray: ${GameDataArray}`)))
          logthis(magentaBright(cborder))
          //? We verify if the Game Data Array < 10 because when 'GameDataArray' is empty, there are under 10 characters present - even though the array is blank (whitespaces, bracket etc)
          if (tabletoString.length < parseInt(1)) {

            logthis(cyanBright(bold(`No NBA Games were found for today.`)))
            var embedText = `No NBA Games were found for today.`;
            chan.send({
              embeds: [SendEmbedErrorResp(embedText)]
            })
            return;
          }
          
          logthis(cyanBright(bold(`**  Logs for Game Scheduling/ESPN Scraping   **`)))
          logthis(magentaBright(cborder))
          logthis(cyanBright(bold(`[ESPN Scraping]\nArray of scraped ESPN Data:`)))
          logthis(GameDataArray)

          /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
          /*                 //! Catching the Start Times with a Regex that matches times (in the format of 7:00 PM) in the scraped ESPN Data String.                */
          /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
          logthis(magentaBright(cborder))
          logthis(cyanBright(bold("[ESPN Scraping]\nStart Times:")))
          const startTimes = tabletoString.match(timesearch)
          const NumberOfTimes = startTimes.length
          logthis(startTimes)
          logthis(cyanBright(bold(`# of start times found:`)))
          logthis(NumberOfTimes)


          /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
          /*                                       //! Putting team names into objects and arrays                                             */
          /* ------------------------------------------------------------------------------------------------------------------------------------------------ */


          //* This section will be storing the data we have obtained, as well as properly matching the team's to their respective nicknames (e.g Boston Celtics to -> Celtics)

          const MatchingTeamNamesArray = GameDataArray.filter(element => NBATeams.includes(element));
          logthis(magentaBright(cborder))
          logthis(cyanBright(bold(`[ESPN Scraping]\nTeams found:`)))
          logthis(MatchingTeamNamesArray);
          //? Troubleshooting/Debugging purposes
          //   container.countingTeams = 0;

          //! ---------------------------------------- //! Organizing / Storing the NBA Team name's scraped into objects ---------------------------------------- */

          //? Home Team Gathering. Every even number from the array w. matches is a home team (0 in this case as well, as the scraped data will always begin with a home team), so we store it using modulu (divisible by 2)
          for (let i = 0; i < MatchingTeamNamesArray.length; i++) {
            //? Is it divisible by 2? then let's get to work (Index of the Home Teams should be even numbers.)
            if (i % 2 === 0) {
              //  container.countingTeams = container.countingTeams + i
              var HomeTeamNameResult = MatchingTeamNamesArray[i];
              container.HomeAndAwayTeams[`teams`][i] = container.HomeAndAwayTeams[`teams`][i] || {}
              //* Storing Home Team into an Array and Object.
              container.HomeTeamList.push(HomeTeamNameResult)
              container.HomeAndAwayTeams[`teams`][i][`hTeam`] = HomeTeamNameResult;
            } else {
              //  container.countingTeams = container.countingTeams + i
              var AwayTeamNameResult = MatchingTeamNamesArray[i]
              //? For  some reason Away Teams // Results not % 2 are + 1 higher than their previous. So to put them in the same object (0 for each, for example) I have to subtract 1
              const adjustedIndex = i - 1;
              container.HomeAndAwayTeams[`teams`][adjustedIndex] = container.HomeAndAwayTeams[`teams`][adjustedIndex] || {}
              //? Keeping it simple; since we have already filtered our matches earlier, we can assume anything left at 𝗧𝗛𝗜𝗦 point that is not a Home Team, is an Away Team.
              container.AwayTeamList.push(AwayTeamNameResult)
              container.HomeAndAwayTeams[`teams`][adjustedIndex][`AwTeam`] = AwayTeamNameResult;
            }
          }
          //! ------------------------------------------------------------------------------------------------------------------------------------------------ */
          /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
          /*                                                           //! # of Keys in Team Object                                                           */
          /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
          logthis(magentaBright(cborder))
          //? # of Keys in the object that currently should hold all the teams we've scraped so far.
          //? Mainly for troubleshooting/debugging
          logthis(cyanBright(bold `[ESPN Scraping]\n# of Keys in the Team Object`))
          const CountTeamOBJKeys = Object.keys(HomeAndAwayTeamsObject[`teams`]).length;
          container.TeamOBJKeys = CountTeamOBJKeys;
          logthis(container.TeamOBJKeys)
          logthis(magentaBright(cborder))

          /* -------------------------------------------------- //! Creating an object with the start times ------------------------------------------------- */

          //? We will read this object later and place it into the team obj (HandAwyTeamObj)
          logthis(cyanBright(bold `[ESPN Scraping]\nGame Start Time Object:`))
          for (let index = 0; index < startTimes.length; index++) {
            if (index == 0) {
              GSTObj[0] = startTimes[index]
            } else if (index == 1) {
              GSTObj[2] = startTimes[index]
              container.GameCount = 2;
            } else {
              let newIndex = container.GameCount + 2;
              container.GameCount = newIndex;
              GSTObj[newIndex] = startTimes[index]
            }
          }
          logthis(magentaBright(cborder))
          logthis(cyanBright(bold `[ESPN Scraping]\nGame Start Time?: ${container.GameStartTime}`))
          logthis(magentaBright(cborder))
          //? Logging for troubleshooting/debugging
          logthis(`[ESPN Scraping]\nTeam Object:`)
          logthis(HomeAndAwayTeamsObject)
          logthis(magentaBright(cborder))

          /* --------- //! Storing the times the game start into the teams object. Specifically into their respective games inside the team object. --------- */

          //  logthis(`[ESPN Scraping]\nFor - In Loop:`)
          for (const key in container.GameStartTime) {
            HomeAndAwayTeamsObject[`teams`][`${key}`][`startTime`] = GSTObj[key];
          }
          //logthis(magentaBright(cborder))
          const {
            teams
          } = container.HomeAndAwayTeams

          function OBJSize(OBJ) {
            let size = Object.keys(OBJ).length;
            return size;
          }

          /* ---------------------------------------------- //? Logging the # of games we have =>  --------------------------------------------- */
          //? which we can do by reading the size of .teams in the team obj - since each kkey in '.teams' is actually an entire game.
          const TeamOBJSize = OBJSize(HomeAndAwayTeamsObject[`teams`]);
          logthis(cyanBright(bold `[ESPN Scraping]\n# Of Games Today:`))
          logthis(TeamOBJSize)
          //? For each game (key) in .teams =>
          for (const key of Object.keys(teams)) {
            if (teams[key].hTeam in NBATeamsNickNames) {
              teams[key].hTeam = NBATeamsNickNames[teams[key].hTeam]
            }

            if (teams[key].AwTeam in NBATeamsNickNames) {
              teams[key].AwTeam = NBATeamsNickNames[teams[key].AwTeam]
            }
          }
          //? This was an attempt to do something, I forget. Something about getting the length/amount of games in the team obj.
          for (let index = 0; index < 2; index++) {

            const [
              [LastOBJKey]
            ] = Object.entries(HomeAndAwayTeamsObject[`teams`]).sort(([a], [b]) => [b] - [a]);
            container.LastOBJTOInt = parseInt(LastOBJKey);

          }
          //? Unused - Printed the name of the last key in the Team Obj.
          /*
            container.ListObjs = [];
            Object.entries(HomeAndAwayTeamsObject[`teams`]).forEach(element => {
              container.ListObjs = element
            });
            logthis(cyanBright(bold`[ESPN Scraping]\nListObjs: ${container.ListObjs}`))
            logthis(`LastOBJ To Int (LastOBJToInt):`)
            logthis(container.LastOBJTOInt) */
          /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
          /*                                    ------//! Replacing Team City names to their respective Team Nicknames ------                                    */
          /* ------------------------------------------------------------------------------------------------------------------------------------------------ */

          logthis(magentaBright(cborder))
          //? Logging the team / matchup / time object
          logthis(cyanBright(bold `[ESPN Scraping]\nToday's Game's Object:`))
          logthis(container.HomeAndAwayTeams)
          logthis(magentaBright(cborder))
          logthis(green("[ESPN Scraping] Scraping completed."))
          logthis(magentaBright(cborder))
          logthis(` `)
          logthis(yellowBright(bold `Launching Game Scheduling`))
          logthis(` `)
          logthis(magentaBright(cborder))
          ScheduleTodaysNBAGames(HomeAndAwayTeamsObject)

        }

      )

    } finally {
    await browser.close();
    }
  }
  //LoadGames();
