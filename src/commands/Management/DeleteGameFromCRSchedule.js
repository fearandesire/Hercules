import {
    Command
} from "@sapphire/framework";
import {
    container
} from '@sapphire/pieces';
import {
    bold,
    green,
    logthis,
    red
} from "../../lib/hercConfig.js";
import {
    AddToUsageStats
} from '../../utils/SQL/AddToUsageStats.js';
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
    //* -------------- */
    //* Adding to usage stats
    var userid = message.author.id
    var SQLTargetTable = `deletegamefromcrschedulestats`
    var commandname = `deletecr`
    AddToUsageStats(userid, SQLTargetTable, commandname)
    //* -------------- */
    const text = await args.rest('string').catch(() => null);
    var selectedScheduledGame = OBJCrgameSched[`${text}`]
    logthis(red(bold(`[Game Scheduling] Removing: ${selectedScheduledGame} from the Game Schedule`)))
    try {
      message.reply(`Deleted: '${selectedScheduledGame}' from today's channel scheduling.`)
      GameScheduleManager.deleteJob(selectedScheduledGame)
      logthis(green(bold(`[Game Scheduling] Successfully removed ${selectedScheduledGame} from the Game Schedule.`)))
    } catch (error) {
      console.log(error)
      return
    }

  }
}