import {
  Command
} from "@sapphire/framework";
import {
  container
} from '@sapphire/pieces';
import { statcord } from "../../Hercules.js";
import { LogGreen, LogYellow } from "../../utils/ConsoleLogging.js";
import { SendErrorEmbed } from "../../utils/Send Embeds/ErrorReplyEmbed.js";
const OBJgameSched = container.OBJgameSched
const GameScheduleManager = container.hercGameSchedMngr;
export class DeleteScheduledGame extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: "deletescheduledgame",
      aliases: ["deleteq", "deletescheduled", "delete", 'deletesch'],
      description: "Delete a game from the schedule",
      requiredUserPermissions: ['KICK_MEMBERS']
    });
  }

  async messageRun(message, args) {
    const text = await args.rest('string').catch(() => null);
    if (text === undefined){
      SendErrorEmbed(message, 'You must specify a game via index to delete. For help, type $help manage')
      return;
    }
    //* -------------- */
    //* Adding to usage stats
    var userid = message.author.id
    var commandname = `deletescheduledgame`
    statcord.postCommand(commandname, userid)
    //* -------------- */


    var selectedScheduledGame = OBJgameSched[`${text}`]
    LogYellow(`[Game Scheduling] Removing: ${selectedScheduledGame} from the Game Schedule`)
    try {
      message.reply(`Deleted: '${selectedScheduledGame}' from today's channel scheduling.`)
      GameScheduleManager.deleteJob(selectedScheduledGame)
      LogGreen(`[Game Scheduling] Successfully removed ${selectedScheduledGame} from the Game Schedule.`)
    } catch (error) {
      console.log(error)
      return
    }

  }
}