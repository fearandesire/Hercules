
import {
    Command
} from '@sapphire/framework';
import {
    container
} from '@sapphire/pieces';
import {
    bold, green, logthis, red, underline, yellow
} from '../lib/hercConfig.js';
import {
    GrabScoreInformation
} from '../utils/GrabLiveScore.js';
import {
    AddToUsageStats
  } from '../utils/SQL/AddToUsageStats.js'
  import { noDbLoadedMsg } from '../lib/hercConfig.js';
import { SendEmbedErrorResp } from '../utils/SQL/Embeds/ErrorReplyEmbed.js';
import {VerifyDatabase} from '../utils/VerifyDatabase.js'
// Define a bucket with 1 usage every 5 seconds
// CHANGE GLOBAL TO MESSAGE AUTHOR ID

const randomColor = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
        const random = Math.random();
        const bit = (random * 16) | 0;
        color += bit.toString(16);
    }
    return color;
};


export class score extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: "score",
            aliases: ["score"],
            description: "Score Command",
        });
    }


    async messageRun(message) {
        var localOrNot = container.WhichServer;
        logthis(yellow(underline(`[SERVER]: RUNNING FROM ${localOrNot}`)))
                //* -------------- */
        //* Adding to usage stats
        var userid = message.author.id
        var SQLTargetTable = `scorestats`
        var commandname = `score`
        AddToUsageStats(userid, SQLTargetTable, commandname)
        //* -------------- */
      //  let UserRequestedID = SapDiscClient.user.id;
        //* Declaring variables for the command.
        const chan = message.channel;
        const configDB = container.dbVal
        //? Verify if DB is loaded

        //logthis(green(`SERVER DATABASE LOADED OR NOT:`))
       // logthis(yellow(bold(serverlocalornot)))
       var serverlocalornot = container.WhichServer;
       if (VerifyDatabase() == 'No Database is loaded') {
         logthis(green(bold(serverlocalornot)))
           message.reply({embeds: [SendEmbedErrorResp(noDbLoadedMsg)]})
         return;
       }
        //? Score command cooldown
        const ratelimit = container.rateinfo.acquire(message.author.id);
        if (ratelimit.limited) {
            message.reply("There is a 5 second cooldown for this command.");
            return;
        }
        //? Check if $score is on or off.
        var isScoreOnOrOff = container.dbVal[`scoretoggleval`]
        //? Check if the message response for $score is on or off [aka scoremsg]
        var isScoreMsgOnOrOff = container.dbVal[`scoremsg`]
        logthis(red(bold(`[DEBUGGING] SCORE STATUS: ${isScoreOnOrOff}`)))
        logthis(red(bold(`[DEBUGGING] SCORE MSG STATUS: ${isScoreMsgOnOrOff}`)))
        if (isScoreOnOrOff == 'false' && isScoreMsgOnOrOff == 'false' ) {
            //message.reply('The $score command is currently turned off.')
            logthis(yellow(bold(`[score.js] score command is off. Called by: ${message.author.username}`)))
            return;
        }
        if (isScoreOnOrOff == 'false'){
            message.reply('The $score command is currently turned off.')
            return;
        }
        if (chan.parentId != configDB[`GameParent`]) {
            message.reply("You are not in a live game chat.");
            return;
        }
        //? Sending score
      //  var scoreRespMsg = await message.reply('Fetching score...')
        const CurrentChanId = message.channel.id;
        logthis(red(bold(`[DEBUGGING]: ${CurrentChanId}`)))
        const ChanNameSplit = message.channel.name.split(`-`);
        const GameChanSplitAwayTeam = ChanNameSplit[0]
        const GameChanSplitHomeTeam = ChanNameSplit[2]
        const awayTeamEmoji = message.guild.emojis.cache?.find(
            (emoji) => emoji.name == GameChanSplitAwayTeam
          );
          const homeTeamEmoji = message.guild.emojis.cache?.find(
            (emoji) => emoji.name == GameChanSplitHomeTeam
          );
            var UserRequestedID = message.author.id
        logthis(red(bold(`[DEBUGGING] CHANNEL NAME: AWAY TEAM: ${GameChanSplitAwayTeam} -- HOME TEAM: ${GameChanSplitHomeTeam}`)))
        GrabScoreInformation(GameChanSplitHomeTeam, GameChanSplitAwayTeam, CurrentChanId, awayTeamEmoji, homeTeamEmoji, UserRequestedID)
        ratelimit.consume();
    }
}

export { randomColor };
