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
    gameArrayDelete,
    gameobj,
    gameSchedList,
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


//* CRON JOB MANAGERS »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»» */
//? Cron Manager to cancel scheduled games.
/**
 - @hercGameSchedMngr - auto/daily game scheduling Hercules handles itself
 - @deleteGameMngr - auto game channel deletion Manager
 - @predictorMngr - prediction channel manager
 - @scrubmanager - not yet used yet
 - @crmngr - manager for games manually created with $cr
 - @dailyStandings - daily screenshotting of the ESPN Standings
 - @dailyGameSS daily screenshotting of the ESPN Game Schedule
 */
container.hercGameSchedMngr = new CronJobManager();
container.deleteGameMngr = new CronJobManager();
container.predictorMngr = new CronJobManager();
container.scrubmanager = new CronJobManager();
container.crmngr = new CronJobManager();
container.dailyStandings = new CronJobManager();
container.dailyGameSS = new CronJobManager();
/**
 @GameScheduleTime Scrape ESPN for Game Schedule @ 5:00 AM
 @StandingsSSTime Scrape ESPN for NBA Standings @ 4:58 AM
 @SSTodaysGames Scrape ESPN for Game Schedule && Screenshot @ 4:56 AM
 @ScheduleVerifyTime Verify if Hercules successfully scheduled the games for the day. Initially, Chromium would freeze-up. However,
 Currently the Game Schedule operation has been optimized and the VPS running Hercules has received a CPU upgrade to support the increasing demand of the bot.
 During the next regular season, Hercules will have to be monitored to see if it will need another CPU upgrade.
 */
export const GameScheduleTime = `00 05 * * *`;
export const StandingsSSTime = `58 04 * * *`;
export const SSTodaysGames = `10 00 * * *`;
export const ScheduleVerifyTime = `05 03 * * *`;


//export const validateSchTime = '00 00 * * *';
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */

//* Validity of today's Game Schedule Image collection »»»»»»»»»»»» */
container.scheduleValidated = 'false';

//* ARRAY THAT WILL CONTAIN THE LIST OF GAME'S SCHEDULED TODAY »»»»»»»»»»»»»»»»»»»»»»»»»»»»»» */
container.gameSchedList = [];

//* ARRAY THAT WILL CONTAIN THE LIST OF GAME'S MANUALLY SCHEDULED TODAY »»»»»»»»»»»»»»»»»»»»»»»»»»»»»» */
container.CrSchedList = [];

//? Which Database Hercules will send Usage Stats to.
container.SQLdb = 'n/a';

// $creategame Object 
container.OBJCrgameSched = {};




//? Container for the Game Count OBJ
container.OBJgameSched = {};
//? Check for: Server Database
//*---*/
container.WhichServer = '';
export const serverlocalornot = container.WhichServer;

//? Msg resp if no database is loaded:
export const noDbLoadedMsg = `The database is not loaded. **Please run $ld to load the database for this server.**`;
container.crRan = 'false';
//? Daily Mngr Var
export const scheduleCrnMngr = container.hercGameSchedMngr;

//* IMAGES FOR CMD LIST EMBEDS // RESPONSE EMBEDS »»»»»»»»»»»»»»»»»»» */
export const scheduleImg = "https://i.imgur.com/kx0KxR2.jpg"
export const DefaultEmbedImg = "https://media.discordapp.net/attachments/515598020818239491/975843360453578852/HerculesLogo.png"
export const utilityEmbedImg = "https://i.imgur.com/nW0FeDG.jpg"
export const managementEmbedImg = "https://i.imgur.com/zMAm8e2.jpg"
export const WhatsNewImg = "https://i.imgur.com/y3vNsmF.jpg"
export const HercScheduleEmbed = "https://cdn.nba.com/manage/2021/09/USATSI_16841994-784x523.jpg"
export const herculeslogo = "https://cdn.discordapp.com/attachments/515598020818239491/975854840217501737/HerculesLogo-PFP.png?size=4096"
export const herculesfulllogo = 'https://cdn.discordapp.com/attachments/515598020818239491/975843360453578852/HerculesLogo.png?size=4096'
export const nbaclogo =
    "https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif";

// cr values 2
export const crRan = 'false'

//? Minimal Arguments for Puppeteer Scraping
export const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
];