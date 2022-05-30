import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
import {
  MessageEmbed
} from 'discord.js';
import { logthis, noDbLoadedMsg, bold, yellow, green } from '../lib/hercConfig.js';
import {SendEmbedErrorResp } from '../utils/SQL/Embeds/ErrorReplyEmbed.js'
import {VerifyDatabase} from '../utils/VerifyDatabase.js'
export class verifyserver extends Command {
  constructor(context, options) {  
    super(context, {
      ...options,
      name: 'verifyserver',
      aliases: ['vs'],
      description: 'verifyserver',
      requiredUserPermissions: ['KICK_MEMBERS']
    });
  }


  async messageRun(message){  
    var serverlocalornot = container.WhichServer;
    logthis(yellow(bold(`[DEBUGGING] serverlocalornot: ${serverlocalornot}`)))
    if (VerifyDatabase() == 'No Database is loaded') {
      logthis(green(bold(serverlocalornot)))
        message.reply({embeds: [SendEmbedErrorResp(noDbLoadedMsg)]})
      return;
    } else {
      logthis(green(bold(serverlocalornot)))
    message.reply(`The ${serverlocalornot} database is currently loaded.`)
    }
  }
}