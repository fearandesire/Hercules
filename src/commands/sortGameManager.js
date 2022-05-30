
import {
    Command
  } from '@sapphire/framework';
  import {
    container
  } from '@sapphire/pieces';
  export class sortGameManager extends Command {
    constructor(context, options) {
      super(context, {
        ...options,
        name: 'sortgamemanager',
        aliases: ['sortgm'],
        description: 'Handling Game Manager.',
        requiredUserPermissions: ['KICK_MEMBERS']
      });
    }
  
    async messageRun(message) {
        const GameManager = container.cronhandler;
        var GamesListObj = GameManager.listCrons();
        Object.entries(GamesListObj).forEach(([key]) => console.log(`${key}`))
        return;
  
  }}
  