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
  herculeslogo,
  // LineupResponse,
  logthis,
  magentaBright,
  nbaclogo,
  nbagamehours
  // predictorTeamIDs
} from '../lib/hercConfig.js';
import {
  FormatGameTime
} from "../utils/FormatGameTime.js";
import {
  SendGameStartingSoon
} from '../utils/GameStartingSoon.js';
import {
  SetDeleteTime
} from "../utils/SetDeleteTime.js";

import {
  ScheduleEmbed
} from '../utils/ScheduleEmbed.js';
let CountNBAGames = parseInt(0);
const gameSchedList = container.gameSchedList

/**
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
  //logthis(red(bold(`[Debug DatabaseEntry]:\n ${DatabaseEntry}\n-- \n ${DatabaseEntry}\n-- \n ${DatabaseEntry[`botChannel`]}`)))
  container.areGamesScheduled = true;
  container.FirstGameTime = HomeAndAwayTeamsObject.teams[0].startTime;
  const TodaysGames = HomeAndAwayTeamsObject.teams
  logthis(magentaBright(cborder))
  logthis(``)
  logthis(cyanBright(bold `[Game Scheduling] Scheduling NBA Games for today`))

//* LOOPING THROUGH THE NBA GAMES DUE TODAY THAT WERE SCRAPED. »»»»»»»»»»»»»»»»»»»»»»»»»»»»»» */
  for (var game in TodaysGames) {
    CountNBAGames++;
    const ServerCache = SapDiscClient.guilds.cache.get(serverid);
    //!
    //! There is a mistake in the prior code (LoadGames.js) where the Home Team and Away Team are swapped. For a temporary fix, I have swapped the assignment of the variables.
    const AwayTeam = TodaysGames[game].hTeam;
    const HomeTeam = TodaysGames[game].AwTeam;
    const startsAt = TodaysGames[game].startTime
    const gctitle = AwayTeam + "-vs-" + HomeTeam;
    //! «««««««««««««««««««««««««««««««««««««««««« */
    const CronGameChannelTitle = AwayTeam.toLowerCase() + "-vs-" + HomeTeam.toLowerCase();
    OBJgameSched[`${CountNBAGames}`] = CronGameChannelTitle
    const LowerCaseTitle = gctitle.toLowerCase();
    if (startsAt == undefined) {
      logthis(cyanBright(bold(`A Live or Complete game was collected and dismissed.`)))
      continue;
    }
    const CronGameTime = FormatGameTime(startsAt)
    const Stored24HRFormatTime = container.storedtime;
    const gcArrayTitle = `${AwayTeam} vs. ${HomeTeam}`
    nbagamehours.push(startsAt)

    //? Hashed out: Predictor channel is currently unused.
    /////? Setting up the Lineup for the Predictor Challenge
    // var predictorIdHomeTeam = predictorTeamIDs[HomeTeam] || "(not found)";
    // var predictorIdHAwayTeam = predictorTeamIDs[AwayTeam] || "(not found)";
    // LineupResponse.push(`<@582334440588443816> ac 1 ${predictorIdHomeTeam} ${predictorIdHAwayTeam}`)

    const gamedeletemngr = container.deleteGameMngr;
    const gamemngr = container.hercGameSchedMngr;
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
        topic: `${GameChanTopic}`,
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
    gameSchedList.push(`${gcArrayTitle} opening at: ${startsAt}`)
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

    //? End of For In Loop
  }

  //? Hashed out: Predictor channels are currently not being used
  // /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
  // /*                             //!   Grabbing the time of the first Game Tonight - using to close the Predictor Channel                             */
  // /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
  // const EarliestNBAGameTonight = setTimeout(() => {

  //   logthis(magentaBright(cborder))
  //   logthis(cyanBright(bold `Scheduling Predictor Channels permission changes.`))
  //   logthis(magentaBright(cborder))
  //   ClosePredictionChannels();

  // }, 1100)



  /* -------------------------------------------------------------------------- */
  /*                             //!  Schedule & Delete Embed                   */
  /* -------------------------------------------------------------------------- */
  const scheduleEmbed = setTimeout(() => {
    ScheduleEmbed(nbaclogo, herculeslogo, gameSchedList, gameArrayDelete, CountNBAGames);
  }, 1100)


  //? Hashed out: Predictor channels are currently not being used.
  // /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
  // /*                                                           //! Schedule Predictor Lineup                                                          */
  // /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
  // const SetupLineup = setTimeout(() => {
  //   SetupPredictorLineup(LineupResponse)

  // }, 1100)
}