export const logthis = console.log;
export {
    RateLimitManager
} from '@sapphire/ratelimits';
export {
    blue,
    bold,
    cyan,
    cyanBright,
    green,
    greenBright,
    magenta,
    magentaBright,
    red,
    redBright,
    underline,
    yellow,
    yellowBright
} from "colorette";
export {
    currenthour,
    currentminutes,
    currentseconds,
    daysInTheWeek,
    gameArray,
    gameArrayDelete,
    gameobj,
    LineupResponse,
    nbagamehours,
    nbagameinfo,
    parsedMinutes,
    parseSecondsv2,
    RightNow,
    SixSecondsAheadv2,
    timestamp,
    TodayDayOfWeek
} from './Storage/Schedule-Todays-Games-Data.js';
export {
    Pagination
};
    import {
        container
    } from '@sapphire/framework';
    import '@sapphire/plugin-hmr/register';
    import {
        RateLimitManager
    } from "@sapphire/ratelimits";
    import CronJobManager from 'cron-job-manager';
    import Pagination from "discord-embed-pagination";
    import {
        StorageNBATeams
    } from "./Storage/NBATeamLists.js";

export const NBATeams = StorageNBATeams.NBATeams
export const NBATeamsNickNames = StorageNBATeams.NBATeamsNickNames
export const predictorTeamIDs = StorageNBATeams.predictorTeamIDs
export const cborder = `    =========          =========          =========    `;
container.dbValue = {};
container.rateinfo = new RateLimitManager(5000, 1);

/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
//? Cron timers related to game scheduling
export const GameScheduleTime = `00 05 * * *`;
export const StandingsSSTime = `58 04 * * *`;
export const SSTodaysGames = `56 04 * * *`;
export const ScheduleVerifyTime = `05 03 * * *`;
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
//? Creating a container for us to use with Usage Stats
container.SQLdb = 'n/a';
//? Cron Job Managers
//? Cron Manager to cancel scheduled games.
//? First game manager. (Creates game channels)
container.cronhandler = new CronJobManager();
//? Second game manager (Deletes game channels)
container.cronhandler2 = new CronJobManager();
//? Third cron manager - prediction channel / lock prediction manager
container.cronhandler3 = new CronJobManager();
//? Gather Games Manager
container.cronhandler4 = new CronJobManager();
//? Fourth Cron Manager - Daily Game Scheduling Function
container.dailyscheduler = new CronJobManager();
//? Channel Scrubbing Manager
container.scrubmanager = new CronJobManager();
//? $cr cron manager.
container.crmngr = new CronJobManager();
//? Daily Standings Manager
container.dailyStandings = new CronJobManager();
//? Daily Game Schedule SS Manager
container.dailyGameSS = new CronJobManager();

// $creategame Object 
container.GameSchedule2 = {};

//? Main Game Array - populated from ScheduleTodaysNBAGames.js
container.GameArray = [];

//? $creategame game Schedule Array
container.GameSchedule2Array = [];


//? Container for the Game Count OBJ
container.GameSchedule = {};
//? Check for: Server Database
//*---*/
container.WhichServer = '';
export const serverlocalornot = container.WhichServer;

//? Msg resp if no database is loaded:
export const noDbLoadedMsg = `The database is not loaded. **Please run $ld to load the database for this server.**`;
container.crRan = 'false';
//? Daily Mngr Var
export const scheduleCrnMngr = container.dailyscheduler;
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
//? Images for Cmd List Embeds
export const scheduleImg = "https://i.imgur.com/kx0KxR2.jpg"
export const DefaultEmbedImg = "https://media.discordapp.net/attachments/515598020818239491/975843360453578852/HerculesLogo.png"
export const utilityEmbedImg = "https://i.pinimg.com/originals/d9/7c/86/d97c86b58f4f616c0627175d9bc44502.png"
export const managementEmbedImg = "https://i.imgur.com/y3vNsmF.jpg"
export const HercScheduleEmbed = "https://cdn.nba.com/manage/2021/09/USATSI_16841994-784x523.jpg"
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
// cr values 2
export const crRan = 'false'