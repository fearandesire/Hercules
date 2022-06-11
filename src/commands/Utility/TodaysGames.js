import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
import {
  MessageAttachment
} from "discord.js";
import { statcord } from '../../Hercules.js';
import { nbaclogo } from '../../lib/hercConfig.js';
import { SendEmbedResp } from '../../utils/Send Embeds/SendEmbed.js';
export class todaysgames extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'todaysgames',
      aliases: ['tg'],
      description: 'todays games',
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
    var commandname = `todaysgames`
    statcord.postCommand(commandname, userid)
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
