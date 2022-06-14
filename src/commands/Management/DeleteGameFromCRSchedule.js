import {
  Command
} from "@sapphire/framework";
import {
  container
} from '@sapphire/pieces';
import { statcord } from "../../Hercules.js";
import { LogGreen, LogRed } from "../../utils/ConsoleLogging.js";
const OBJCrgameSched = container.OBJCrgameSched
const GameScheduleManager = container.hercGameSchedMngr;
export class DeleteScheduledGame extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: "deletecrscheduledgame",
      aliases: ["deletecr", "deletecreatedgame"],
      description: "Delete a game from the created games schedule",
      requiredUserPermissions: ['KICK_MEMBERS']
    });
  }

  async messageRun(message, args) {

    //* Adding to usage stats
    var userid = message.author.id
    var commandname = `deletecreatedgame`
    statcord.postCommand(commandname, userid)
    //* -------------- */

    const text = await args.rest('string').catch(() => null);
    var selectedScheduledGame = OBJCrgameSched[`${text}`]
    LogRed(`[Game Scheduling] Removing: ${selectedScheduledGame} from the Game Schedule`)
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