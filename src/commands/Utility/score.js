
import {
    Command
} from '@sapphire/framework';
import {
    container
} from '@sapphire/pieces';
import {
    bold, green, logthis, noDbLoadedMsg, yellow
} from '../../lib/hercConfig.js';
import {
    ScrapeScore
} from '../../utils/ScrapeGameScore.js';
import {
    AddToUsageStats
} from '../../utils/SQL/AddToUsageStats.js';
import { SendEmbedErrorResp } from '../../utils/SQL/Embeds/ErrorReplyEmbed.js';
import { VerifyDatabase } from '../../utils/VerifyDatabase.js';
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
        var serverlocalornot = container.WhichServer;
        //* ADDING TO USAGE STATS »»» */
        var userid = message.author.id
        var SQLTargetTable = `scorestats`
        var commandname = `score`
        AddToUsageStats(userid, SQLTargetTable, commandname)
        //* ««««««««««««««««««««««««« */
        const chan = message.channel;
        const configDB = container.dbVal
       //? DB Verification Failsafe
       if (VerifyDatabase() == 'No Database is loaded') {
         logthis(green(bold(serverlocalornot)))
           message.reply({embeds: [SendEmbedErrorResp(noDbLoadedMsg)]})
         return;
       }
        //? command cooldown check
        const ratelimit = container.rateinfo.acquire(message.author.id);
        if (ratelimit.limited) {
            message.reply("There is a 5 second cooldown for this command.");
            return;
        }
        //? Verify $score status - as it is toggable to prevent spam
        var isScoreOnOrOff = container.dbVal[`scoretoggleval`]
        //? If score is off, Hercules will reply with that information. I call it scoremsg.
        //? Verifying if scoremsg is enabled or not.
        var isScoreMsgOnOrOff = container.dbVal[`scoremsg`]
        if (isScoreOnOrOff == 'false' && isScoreMsgOnOrOff == 'false' ) {
            logthis(yellow(bold(`[$score] The $score command is currently off. $score requested by: ${message.author.username}`)))
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
        //?  Compiling variables to send into the function that will scrape the score.
        const CurrentChanId = message.channel.id;
        const ChanNameSplit = message.channel.name.split(`-`);
        const ChanAwTeam = ChanNameSplit[0]
        const ChanHomeTeam = ChanNameSplit[2]
        const awayTeamEmoji = message.guild.emojis.cache?.find(
            (emoji) => emoji.name == ChanAwTeam
          );
          const homeTeamEmoji = message.guild.emojis.cache?.find(
            (emoji) => emoji.name == ChanHomeTeam
          );
            var UserRequestedID = message.author.id
        ScrapeScore(ChanHomeTeam, ChanAwTeam, CurrentChanId, awayTeamEmoji, homeTeamEmoji, UserRequestedID)
        ratelimit.consume();
    }
}

export { randomColor };

