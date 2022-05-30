import {
  container
} from '@sapphire/framework';
import '@sapphire/plugin-hmr/register';
import {
  SapDiscClient
} from '../Hercules.js';

import {
  bold,
  cborder,
  cyanBright,
  gameArrayDelete,
  LineupResponse,
  logthis,
  magentaBright,
  nbagamehours,
  predictorTeamIDs,
  red
} from '../lib/hercConfig.js';
//? Preparing the NBA Game start time 
import {
  SendGameStartingSoon
} from '../utils/GameStartingSoon.js';
import {
  GrabTimeNoPM
} from "../utils/GrabTimeNoPM.js";
//? Transforming the time to be used for the delete schedule
import {
  SetDeleteTime
} from "../utils/SetDeleteTime.js";
//? Preparing start time to be used in finding the first NBA Game starting tonight
import {
  ClosePredictionChannels
} from "../utils/ClosePredictorChannels.js";
//? Function to prepare and send the schedule embeds
import {
  ScheduleEmbed
} from '../utils/ScheduleEmbed.js';
//? Setup Predictor Lineup
import {
  SetupPredictorLineup
} from '../utils/SetupPredictorLineup.js';

const herculeslogo = "https://cdn.discordapp.com/attachments/515598020818239491/975854840217501737/HerculesLogo-PFP.png?size=4096";
const nbaclogo =
  "https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif";
//let NBAGameCount = container.nbagamecount
//* Array we will push the hour from the start time of the schedulenbagames function here.

//* Object holding all of the game titles and start times to process into a single embed.
let CountNBAGames = parseInt(0);
const gameArray = container.GameArray
//logthis(`Today is: ${TodayDayOfWeek}`)
export function ScheduleTodaysNBAGames(HomeAndAwayTeamsObject) {

  const DatabaseEntry = container.dbVal;
  const gameparent = DatabaseEntry[`GameParent`]
  const lgct = DatabaseEntry[`GameChanTopic`]
  const serverid = container.dbVal[`ServerId`]
  const ServerCache = SapDiscClient.guilds.cache.get(serverid)

  //? An Object that will store the channel name of each game we schedule. The key will be numerical and increase in +1 increments
  //? This will allow for deletion of scheduled games by using the index of it on the schedule.
  //? Example we can type $deleteq 1 to delete the first game schedule, so on
  const GameSchedule = container.GameSchedule
  logthis(red(bold(`[Debug DatabaseEntry]:\n ${DatabaseEntry}\n-- \n ${DatabaseEntry}\n-- \n ${DatabaseEntry[`botChannel`]}`)))


  //? A True or False to see to double-check if the scheduling has completed (the virtual server it's on has some lag/sometimes puppeteer doesn't work)
  container.areGamesScheduled = true;
  //? Grabbing the earliest/first game of the night so we can close the predictor channel at that time.
  container.FirstGameTime = HomeAndAwayTeamsObject.teams[0].startTime;
  logthis(magentaBright(cborder))
  logthis(``)

  logthis(cyanBright(bold `[Game Scheduling] Scheduling NBA Games for today`))
  logthis(container.FirstGameTime)
  //const OBJofTodaysGames = Object.keys(HomeAndAwayTeamsObject[`teams`])
  const TodaysGames = HomeAndAwayTeamsObject.teams

  /* -------------------------------------------------------------------------- */
  /*          //! Looping through the NBA Games today previously stored         */
  /* -------------------------------------------------------------------------- */
  for (var game in TodaysGames) {
    //? Keeping track of how many NBA Games we have scheduled to later display
    //container.nbagamecount = parseInt(container.nbagamecount) + parseInt("1");
    //NBAGameCount++;
    CountNBAGames++;
    const ServerCache = SapDiscClient.guilds.cache.get(serverid);
    //* ------------------------------------------------------------------------------------------------------------------------------------------------ */
    //! a minor mistake of the home team list actually being the away team. easiest solution, renaming it here where it is used for now.
    const AwayTeam = TodaysGames[game].hTeam;
    const HomeTeam = TodaysGames[game].AwTeam;
    const startsAt = TodaysGames[game].startTime
    // @gctitle  Game Channel Title Compiled with the relevant team names.
    const gctitle = AwayTeam + "-vs-" + HomeTeam;
    //? For obj; making it lowercase to match how it will be written within the cron job manager, which is case sensitive.
    const CronGameChannelTitle = AwayTeam.toLowerCase() + "-vs-" + HomeTeam.toLowerCase();
    GameSchedule[`${CountNBAGames}`] = CronGameChannelTitle
    const LowerCaseTitle = gctitle.toLowerCase();
    //* ------------------------------------------------------------------------------------------------------------------------------------------------ */
    logthis(cyanBright(bold(`[DEBUG] Starts At: ${startsAt}`)))

    //const anydigits = /\d+/;
    if (startsAt == undefined) {
      logthis(cyanBright(bold(`A Live or Complete game was collected and dismissed.`)))
      continue;
    }
    /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
    //? Calling a function that will erase the "PM" portion of the times
    //! This variable will also be apart of the string u͟s͟e͟d t͟o s͟t͟a͟r͟t g͟a͟m͟e͟s a͟t t͟h͟e͟i͟r s͟c͟h͟e͟d͟u͟l͟e t͟i͟m͟e.
    const CronGameTime = GrabTimeNoPM(startsAt)
    /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
    const Stored24HRFormatTime = container.storedtime;
    const gcArrayTitle = `${AwayTeam} vs. ${HomeTeam}`
    nbagamehours.push(startsAt)
    //? Setting up the Lineup for the Predictor Challenge
    var predictorIdHomeTeam = predictorTeamIDs[HomeTeam] || "(not found)";
    var predictorIdHAwayTeam = predictorTeamIDs[AwayTeam] || "(not found)";
    LineupResponse.push(`<@582334440588443816> ac 1 ${predictorIdHomeTeam} ${predictorIdHAwayTeam}`)


    //? Cron Job Manager for game delete times.
    const gamedeletemngr = container.cronhandler2;
    //? Daily Mngr
    const scheduleCrnMngr = container.dailyscheduler;
    //? Game Mngr
    const gamemngr = container.cronhandler;
    //? Used to select a team at random to wish good luck to.
    const teamArray = [
      `${HomeTeam}`,
      `${AwayTeam}`
    ];
    const DeleteTime = SetDeleteTime(Stored24HRFormatTime, CountNBAGames);
    /* -------------------------------------------------------------------------- */
    /*                          //! Scheduling NBA Games                          */
    /* -------------------------------------------------------------------------- */
    gamemngr.add(`${LowerCaseTitle}`, `${CronGameTime} * * *`, () => {
      ServerCache.channels.create(`${gctitle}`, {
        parent: `${gameparent}`,
        topic: `${lgct}`,
      }).then((channel) => {
        logthis(`Creating Game Channel: ${gctitle}`)
        const id = channel.id
        channel.lockPermissions();
        SendGameStartingSoon(id)
        //  SapDiscClient.channels.cache.get(id).send(`Want to bet on NBA Games? **Check out <#${predictorchan}>**!`)
        const chanID = SapDiscClient.channels.cache.find(channel => channel.name === gctitle);
        //? Selecting a random team to say good luck to, no bias :)
        var randomTeam = teamArray[Math.floor(Math.random() * teamArray.length)];
        //? Lowercase
        var AwayTeamNameLowercase = AwayTeam.toLowerCase();
        var HomeTeamNameLowercaase = HomeTeam.toLowerCase();
        logthis(`Lowercase Names: {`)
        logthis(`Away Team: ${AwayTeamNameLowercase}`)
        logthis(`Home Team: ${HomeTeamNameLowercaase}\n}`)
        const HomeTeamEmoji = SapDiscClient.emojis.cache.find(emoji => emoji.name === `${HomeTeamNameLowercaase}`);
        const AwayTeamEmoji = SapDiscClient.emojis.cache.find(emoji => emoji.name === `${AwayTeamNameLowercase}`);
        logthis(`Emojis: {\nHome: ${HomeTeamEmoji}\nAway:${AwayTeamEmoji}}`)

        SapDiscClient.channels.cache.get(id).send(`Good luck ${randomTeam}!`).then((message) => {
          message.react(HomeTeamEmoji.id).then(() =>
            message.react(AwayTeamEmoji.id))
        })
      })

    })
    //? Adding the game to an array which will display all the games scheduled today in an embed.
    gameArray.push(`${gcArrayTitle} opening at: ${startsAt}`)
    //? Adding to the count of NBA Games scheduled so far.
    //? A variable used to get the earliest NBA Game for the night.
    gamemngr.start(`${LowerCaseTitle}`);

    /* -------------------------------------------------------------------------- */
    /*                  //! Scheduling Deletion of the NBA Games.                 */
    /* -------------------------------------------------------------------------- */
    gameArrayDelete.push(`**Deleting: ${gcArrayTitle} channel at: ${container.dt}**`)
    //* * Scheduling game channels to be deleted
    gamedeletemngr.add(
      `Delete-${LowerCaseTitle}`,
      DeleteTime,
      () => {
        gamemngr.deleteJob(LowerCaseTitle)
        if (
          ServerCache.channels.cache.some(
            (channel) => channel.name === LowerCaseTitle
          )
        ) {
          ServerCache.channels.cache
            .find((channel) => channel.name === LowerCaseTitle)
            .delete();
        } else {
          console.log(
            "Game Chat Deleted Prior - This message is to avoid shutdown"
          );
        }
      }
    );
    gamedeletemngr.start(`Delete-${LowerCaseTitle}`);
    logthis(cyanBright(bold(`Delete Time is: ${DeleteTime}`)))

    //? A function to get the hours and minutes substringed, which we will use to get the earliest NBA Game starting today.
    //? End of For In Loop
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
  /*                             //!   Grabbing the time of the first Game Tonight - using to close the Predictor Channel                                */
  /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
  const EarliestNBAGameTonight = setTimeout(() => {

    logthis(magentaBright(cborder))
    logthis(cyanBright(bold `Scheduling Predictor Channels permission changes.`))
    logthis(magentaBright(cborder))
    ClosePredictionChannels();

  }, 1100)



  /* -------------------------------------------------------------------------- */
  /*                             //!  Schedule & Delete Embed                               */
  /* -------------------------------------------------------------------------- */
  const scheduleEmbed = setTimeout(() => {
    ScheduleEmbed(nbaclogo, herculeslogo, gameArray, gameArrayDelete, CountNBAGames);
  }, 1100)

  /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
  /*                                                           //! Schedule Predictor Lineup                                                          */
  /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
  const SetupLineup = setTimeout(() => {
    SetupPredictorLineup(LineupResponse)

  }, 1100)
  // async function SendGamesScheduled() {
  //   var bChannel = container.dbVal[`botChannel`]
  //   const chan = await SapDiscClient.channels.fetch(bChannel)
  //   chan.send(`**Games Scheduled.**`)
  //   return;
  // } //! Returns: Promise {object}
  // logthis(cborder)
  // logthis(cyanBright(bold `[Game Scheduling]\nGame Scheduling complete.`))
  // logthis(cborder)
  // // }
  // SendGamesScheduled()
}