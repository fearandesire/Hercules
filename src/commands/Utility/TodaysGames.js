import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
import {
  AddToUsageStats
} from '../../utils/SQL/AddToUsageStats.js';

import {
  MessageAttachment
} from "discord.js";
export class todaysgames extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'todaysgames',
      aliases: ['tg'],
      description: 'todays games',
      requiredUserPermissions: ['KICK_MEMBERS']
    });
  }

  async messageRun(message) {
    const ratelimit = container.rateinfo.acquire(message.author.id);
    if (ratelimit.limited) {
      message.reply("There is a 5 second cooldown for this command.");
      return;
    }
    //* -------------- */
    //* Adding to usage stats
    var userid = message.author.id
    var SQLTargetTable = `todaysgamesstats`
    var commandname = `todaysgames`
    AddToUsageStats(userid, SQLTargetTable, commandname)
    //* -------------- */
    const file = new MessageAttachment('./gameimages/tgnba.jpg');
    const TodayGamesEmbed = {
      title: 'NBA Games Today',
      color: "#29d8ff",
      author: 'Hercules',
      thumbnail: 'https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif',
      image: {
        url: 'attachment://tgnba.jpg',
      },
    };
    message.reply({
      embeds: [TodayGamesEmbed],
      files: [file]
    });
    //? Might put this into an Embed to make it look better.
    ratelimit.consume();
  }
}
