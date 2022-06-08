import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
import {
  MessageAttachment
} from "discord.js";
import { nbaclogo } from '../../lib/hercConfig.js';
import {
  AddToUsageStats
} from '../../utils/SQL/AddToUsageStats.js';
import { SendEmbedResp } from '../../utils/SQL/Embeds/SendEmbed.js';
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
    if (container.scheduleValidated === 'false'){
    var embedTitle = 'Schedule Info'
    var embedText = 'There are no games on the schedule today.'
    SendEmbedResp(message, embedTitle, embedText)
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
      thumbnail: nbaclogo,
      image: {
        url: 'attachment://tgnba.jpg',
      },
    };
    message.reply({
      embeds: [TodayGamesEmbed],
      files: [file]
    });
    ratelimit.consume();
  }
}
