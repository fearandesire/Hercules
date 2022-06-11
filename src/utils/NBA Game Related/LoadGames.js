import {
  container
} from '@sapphire/pieces';
import now from 'performance-now';
import puppeteer from 'puppeteer';
import {
  SapDiscClient
} from '../../Hercules.js';
import {
  NBATeams
} from '../../lib/hercConfig.js';
import {
  tableSelector,
  timesearch
} from '../../lib/Storage/Load-Games-Data.js';
import {
  LogBorder,
  LogCyan,
  LogGreen,
  LogRed,
  LogYellow
} from '../ConsoleLogging.js';
import {
  ReturnPerformance
} from '../PerformanceLogger.js';
import {

  ReturnScheduleEmbedErrorResp
} from '../Send Embeds/ErrorReplyEmbed.js';
import {
  OrganizeStartTimes
} from './LoadGameRelated/OrganizeStartTimes.js';
import {
  OrganizeTeams
} from './LoadGameRelated/OrganizeTeams.js';
import {
  SwapTeamNames
} from './LoadGameRelated/SwapTeamNames.js';
import {
  TodaysDateESPNFormat
} from './LoadGameRelated/TodaysDate.js';
import {
  ScheduleTodaysNBAGames
} from './ScheduleTodaysNBAGames.js';

const start = now();
/**
 * 
 * @LoadGames function: Scraping ESPN using Puppeteer for NBA Game Data. Passing in an object 
 * @HomeAndAwayTeamsObject object: This will be populated with the Home and Away Teams.
 */

export async function LoadGames(HomeAndAwayTeamsObject) {
  LogGreen(`[LoadGames.js] Performance Time: ${start.toFixed(3)} `) // start time
  var bChannel = container.dbVal[`botChannel`]
  var YYDDMM = TodaysDateESPNFormat();
  const chan = await SapDiscClient.channels.fetch(bChannel)
  LogYellow(`[LoadGames.js] Loading Games for today (${YYDDMM})`)
  //? Using todays date formatted in a format ESPN will accept (Month, Day & Year all together)
  const ESPNURL = `https://www.espn.com/nba/schedule/_/date/` + YYDDMM
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.goto(

    ESPNURL
  );
  try {
    const data = await page.$$eval(tableSelector, tds => tds.map((td) => {
        //? The table of games is mapped to `td`, and we can retrieve all text within it with this line.
        // eslint-disable-next-line no-undef
        return CompiledGameData = td.innerText;

      }))
      .then(

        (CompiledGameData) => {

          // Defining variable names for the objects I will use to store the data I will be passing to schedule.
          const GSTObj = container.GameStartTime;
          const HomeAndAwayTeamsObject = container.HomeAndAwayTeams;
          const GamesTableData = String(CompiledGameData)
          //? Formatting the data we have scraped from ESPN into an array of strings.
          const GameDataArray = GamesTableData.split("\n")

          //? Cease operation if there are no games today.
          if (GamesTableData.length === 0) {
            LogRed(`[LoadGames.js] No Games Today!`)
            var embedText = `No NBA Games were found for today.`;
            chan.send({
              embeds: [ReturnScheduleEmbedErrorResp(embedText)]
            })
            ReturnPerformance(start, LoadGames.name)
            return;
          }

          //* USING REGEXP TO FIND THE TIMES IN THE TABLE DATA. »»»»» */
          LogCyan(`[LoadGames.js] Games found on the schedule today! Organizing data...`)
          LogBorder();
          //? timesearch will search for the 12HR formatted times in the table data.
          const startTimes = GamesTableData.match(timesearch)


          //* FILTERING THE DATA TO EXTRACT/MATCH NBA TEAMS »»»»» */
          const CombinedTeamsList = GameDataArray.filter(element => NBATeams.includes(element));
          //* SORTING HOME & AWAY TEAMS »»»»» */
          OrganizeTeams(CombinedTeamsList);

          //* POPULATING GAME START TIMES OBJECT  »»»»» */
          OrganizeStartTimes(GSTObj, startTimes);

          //* STORING GAME START TIMES TO THEIR RESPECTIVE GAMES »»»»» */
          for (const key in container.GameStartTime) {
            HomeAndAwayTeamsObject[`teams`][`${key}`][`startTime`] = GSTObj[key];
          }

          //* REPLACING TEAM NAMES W/ THEIR NICKNAMES. »»»»» */
          SwapTeamNames();
          LogGreen(`[Loadgames.js] Games collected, launching scheduling.`)
          ScheduleTodaysNBAGames(HomeAndAwayTeamsObject)
          ReturnPerformance(start, LoadGames.name)
        }
      )

  } finally {
    await browser.close();
  }
}