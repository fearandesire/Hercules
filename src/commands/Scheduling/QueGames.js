import { Command, container } from '@sapphire/framework';
import { statcord } from '../../Hercules.js';
import {
  bold,
  green,
  logthis,
  noDbLoadedMsg,
  serverlocalornot
} from '../../lib/hercConfig.js';
import {
  LoadGames
} from '../../utils/NBA Game Related/LoadGames.js';
import {
  SendEmbedErrorResp
} from '../../utils/Send Embeds/ErrorReplyEmbed.js';
import { SendEmbedResp } from '../../utils/Send Embeds/SendEmbed.js';
import {
  VerifyDatabase
} from '../../utils/VerifyDatabase.js';

export class QueGameScheduling extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: "quegames",
      aliases: ["qg"],
      description: "Que Today's Games to be scheduled.",
      requiredUserPermissions: ['KICK_MEMBERS']
    });
  }

  async messageRun(message) {

    //* ADDING TO USAGE STATS »»» */
    var userid = message.author.id
    var commandname = `quegames`
    statcord.postCommand(commandname, userid)
    //* -------------- */

    if (VerifyDatabase() == 'No Database is loaded') {
      logthis(green(bold(serverlocalornot)))
      message.reply({
        embeds: [SendEmbedErrorResp(noDbLoadedMsg)]
      })
      return;
    }

    if (container.scheduleCompleted === 'true'){
      var embedTitle = 'Schedule Info'
      var embedText = 'Games have already been scheduled for today.'
      SendEmbedResp(message, embedTitle, embedText)
      return;
      }
      
    message.reply("Scheduling Games, please wait.")
    LoadGames();
    console.log(
      'Scheduling Games from $qg command usage.'
    )
  }
}