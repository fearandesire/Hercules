import {
  container
} from '@sapphire/framework';
import '@sapphire/plugin-hmr/register';
import {
  SapDiscClient
} from '../../Hercules.js';
import {
  bold, cyanBright,
  gameArrayDelete,
  herculeslogo,
  // LineupResponse,
  logthis, nbaclogo,
  nbagamehours
  // predictorTeamIDs
} from '../../lib/hercConfig.js';
import {
  FormatGameTime
} from "./ScheduleToday/FormatGameTime.js";
import {
  SetDeleteTime
} from "./ScheduleToday/SetDeleteTime.js";

import { LogBorder, LogYellow } from '../ConsoleLogging.js';
import {
  ScheduleEmbed
} from '../Send Embeds/ScheduleEmbed.js';
import { QueDeleteChannels } from './ScheduleToday/QueDeleteChannels.js';
import { QueGameChannels } from './ScheduleToday/QueGameChannels.js';
let CountNBAGames = parseInt(0);
const gameSchedList = container.gameSchedList

/**
//? THE VARIABLES MASON, WHAT DO THEY MEAN!?
- @ScheduleTodayNBAGames - function that will receive the scraped data and use said data to que the Game Channels & auto-delete times of the Game Channels
- @DatabaseEntry The container that holds our Database settings. Named for readability
- @GameParent - Game Category ID from DB
- @GameChanTopic - Game Channel Topic from DB
- @serverid - Server ID from DB
- @ServerCache - Formatting the Server ID with discord guild cache for sending messages to specific channels.
- @gameSchedList - array that will contain the Games automatically scheduled from Hercules
- @OBJgameSched - object containing the Games scheduled - but more importantly: ordered numerically & increments per game.
   An example return would look like: { "1", "celtics vs heat", "2", "warriors vs mavericks" }
   This allows for simplistic deletion just by using the number associated with the game.
- @CountNBAGames - incrementing value to count how many NBA Games scheduled
- @TodaysGames - Variable holding the scraped Game data.
- @gctitle - Game Channel Title in Discord Format
- @CronGameChannelTitle - Lowercase Team Names for formatting uniform.
- @CronGameTime - A link to @FormatGameTime - a function that will manipulate the time string of the NBA Game into an acceptable Cron format.
- @teamArray Used to select a team at random to wish good luck to in the Game Channel
* @Containers important containers defined below
- @areGamesScheduled validity variable that will reflect if the games are scheduled are not. Hercules fails scrapes within LoadGames.js, not this file.
- @FirstGameTime - the earliest / first game that starts for the day. Originally used for the Predictor Channel
 * 
 */


export function ScheduleTodaysNBAGames(HomeAndAwayTeamsObject) {
  const DatabaseEntry = container.dbVal;
  const gameparent = DatabaseEntry[`GameParent`]
  const GameChanTopic = DatabaseEntry[`GameChanTopic`]
  const serverid = container.dbVal[`ServerId`]
  const OBJgameSched = container.OBJgameSched
  container.areGamesScheduled = true;
  container.FirstGameTime = HomeAndAwayTeamsObject.teams[0].startTime;
  const TodaysGames = HomeAndAwayTeamsObject.teams
  LogBorder();
  LogYellow(`Scheduling Today's Games`);

//* LOOPING THROUGH THE NBA GAMES COLLECTED. »»»»»»»»»»»»»»»»»»»»»»»»»»»»»» */
  for (var game in TodaysGames) {
    CountNBAGames++;
    const ServerCache = SapDiscClient.guilds.cache.get(serverid);
    container.AwayTeam = TodaysGames[game].AwTeam;
    container.HomeTeam = TodaysGames[game].hTeam;
    const startsAt = TodaysGames[game].startTime
    let HomeTeam = container.HomeTeam;
    let AwayTeam = container.AwayTeam;
    //? Titles for the channel & Cron Job Manager
    const gctitle = AwayTeam + "-vs-" + HomeTeam;
    const CronGameChannelTitle = AwayTeam.toLowerCase() + "-vs-" + HomeTeam.toLowerCase();
    OBJgameSched[`${CountNBAGames}`] = CronGameChannelTitle
    const LowerCaseTitle = gctitle.toLowerCase();

    //? In the case of games being scheduled while others are live, skipping said live games
    if (startsAt == undefined) {
      logthis(cyanBright(bold(`A Live or Complete game was collected and dismissed.`)))
      continue;
    }

    const CronGameTime = FormatGameTime(startsAt)
    const Stored24HRFormatTime = container.storedtime;
    const gcArrayTitle = `${AwayTeam} vs. ${HomeTeam}`
    const gamedeletemngr = container.deleteGameMngr;
    const gamemngr = container.hercGameSchedMngr;
    const DeleteTime = SetDeleteTime(Stored24HRFormatTime, CountNBAGames);
    nbagamehours.push(startsAt)
    //? Hashed out: Predictor channel is currently unused.
    /////? Setting up the Lineup for the Predictor Challenge
    //// var predictorIdHomeTeam = predictorTeamIDs[HomeTeam] || "(not found)";
    //// var predictorIdHAwayTeam = predictorTeamIDs[AwayTeam] || "(not found)";
    //// LineupResponse.push(`<@582334440588443816> ac 1 ${predictorIdHomeTeam} ${predictorIdHAwayTeam}`)

    //* QUEUING GAME CHANNELS »»»» */
    QueGameChannels(gameparent, GameChanTopic, CronGameTime, ServerCache, HomeTeam, AwayTeam, startsAt)

    //* QUEUING GAME DELETE TIMES »»»» */
    QueDeleteChannels(gcArrayTitle, gamemngr, gamedeletemngr, LowerCaseTitle, ServerCache, DeleteTime)
    //? End of For In Loop
  }

  //* SENDING THE SCHEDULE EMBED »»»» */
  const scheduleEmbed = setTimeout(() => {
    ScheduleEmbed(nbaclogo, herculeslogo, gameSchedList, gameArrayDelete, CountNBAGames);
  }, 1100)
}