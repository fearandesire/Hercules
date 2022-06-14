
import {
  Command, container
} from '@sapphire/framework';
import { bold, green, logthis, noDbLoadedMsg } from '../../lib/hercConfig.js';
import { screenshotTodaysNBAGames } from '../../utils/ScreenshotOperation.js';
import { SendEmbedErrorResp } from '../../utils/Send Embeds/ErrorReplyEmbed.js';
import { VerifyDatabase } from '../../utils/VerifyDatabase.js';

export class QueGameScheduleScreenshot extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: "quegamesimage",
      aliases: ["sg"],
      description: "Que Today's Games Image to be screenshotted.",
      requiredUserPermissions: ['KICK_MEMBERS']
    });
  }

  async messageRun(message) {
    const SSTodaysGames = container.dbVal[`SSTodaysGames`]   
    var serverlocalornot = container.WhichServer;
    if (VerifyDatabase() == 'No Database is loaded') {
      logthis(green(bold(serverlocalornot)))
        message.reply({embeds: [SendEmbedErrorResp(noDbLoadedMsg)]})
      return;
    }
    //scheduleCrnMngr.deleteJob('dailyschedulingv2')
    const msg = await message.reply("Screenshotting today's NBA Schedule. Please wait")
    screenshotTodaysNBAGames(SSTodaysGames, msg)
  }
}
