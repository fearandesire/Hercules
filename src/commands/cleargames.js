
import {
    Command
  } from '@sapphire/framework';
  import {
    container
  } from '@sapphire/pieces';
  export class ClearGames extends Command {
    constructor(context, options) {
      super(context, {
        ...options,
        name: 'cleargames',
        aliases: ['clearg'],
        description: 'Clear all games currently scheduled.',
        requiredUserPermissions: ['KICK_MEMBERS']
      });
    }
  
    async messageRun(message) {
        var msg = await message.reply(`Clearing all scheduled games.`)
        var scheduleManager = container.cronhandler;
        var DeleteManager = container.cronhandler2;
        var CreatedGameManager = container.crmngr;
        scheduleManager.stopAll();
        DeleteManager.stopAll();
        CreatedGameManager.stopAll();
        msg.edit(`Games Cleared.`)
        return;

  
  }}
  