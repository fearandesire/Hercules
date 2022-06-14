import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
import { noDbLoadedMsg } from '../lib/hercConfig.js';
import { LogGreen } from '../utils/ConsoleLogging.js';
import { SendEmbedErrorResp } from '../utils/Send Embeds/ErrorReplyEmbed.js';
import { VerifyDatabase } from '../utils/VerifyDatabase.js';
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
    if (VerifyDatabase() == 'No Database is loaded') {
      LogGreen(`[verifyserver.js] No database is currently loaded.`)
        message.reply({embeds: [SendEmbedErrorResp(noDbLoadedMsg)]})
      return;
    } else {
      LogGreen(`[verifyserver.js] Database ${serverlocalornot} is loaded.`)
    message.reply(`The ${serverlocalornot} database is currently loaded.`)
    }
  }
}
