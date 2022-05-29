
import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
export class deletegame extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'deletegame',
      aliases: ['dg'],
      description: 'Command List',
      requiredUserPermissions: ['KICK_MEMBERS']
    });
  }

  async messageRun(message) {
    const config = container.dbVal
const GameParent = config[`GameParent`]
    const chancheck = message.channel;
   // console.log(chancheck.parentId);
  //  console.log(config[`GameParent`]);
    if (chancheck.parentId == GameParent) {
        message.channel.delete();
        console.log(`Game Chat Deleted Channel - command called from: ${message.author.username} - ID: ${message.author.id}`);
    } else {
        // we only want our staff to be able to delete game chats specifically!
        message.reply('You are not in a Game Channel');
    
  }

}}
