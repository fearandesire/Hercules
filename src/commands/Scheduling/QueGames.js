import { Command, container } from '@sapphire/framework';
import {
  bold,
  green,
  logthis,
  noDbLoadedMsg,
  serverlocalornot
} from '../../lib/hercConfig.js';
import {
  LoadGames
} from '../../utils/LoadGames.js';
import {
  SendEmbedErrorResp
} from '../../utils/SQL/Embeds/ErrorReplyEmbed.js';
import { SendEmbedResp } from '../../utils/SQL/Embeds/SendEmbed.js';
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