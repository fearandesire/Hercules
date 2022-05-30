import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
import { CreateFromSavedTime } from '../utils/CmdCreateGames/CreateFromSavedTime.js';
import {
  CreateNow
} from '../utils/CmdCreateGames/CreateNow.js';
import {
  AddToUsageStats
} from '../utils/SQL/AddToUsageStats.js';
import {CreateFromScheduledTime} from '../utils/CmdCreateGames/CreateFromScheduledTime.js'
container.createGameTimes = [];
const SavedGameTime = container.SavedGameTime
let GameCount = parseInt(0);
export class CreateGames extends Command {  
  constructor(context, options) {
    super(context, {
      ...options,
      name: "creategame",
      aliases: ["cr", "create", "cg"],
      description: "Create A Game Channel",
    });
  }

  async messageRun(message, args) {
    const DatabaseEntry = container.dbVal;
    const GameParent = DatabaseEntry[`GameParent`]
    const GameChatTopic = DatabaseEntry[`GameChanTopic`]
    //* -------------- */
    //* Adding to usage stats
    var userid = message.author.id
    var SQLTargetTable = `creategamestats`
    var commandname = `creategame`
    AddToUsageStats(userid, SQLTargetTable, commandname)
    //* -------------- */
    const GameChanMsg = container.dbVal[`GameChanMsg`];
    const team1 = await args.pick("string");
    const vs = await args.pick("string");
    const team2 = await args.pick("string");
    //? Catch empty input.
    const time = await args.pick("string").catch(() => null);
    if (time == null) {
      message.reply("Missing a time.");
      return;
    }
    const teamArray = [
      `${team1}`,
      `${team2}`
    ];
    const chanName = `${team1} ${vs} ${team2}`
    if (time.toLowerCase() === "now") {
      CreateNow(message, chanName, teamArray, team1, team2, GameParent, GameChatTopic, GameChanMsg)
      return;
    }
    if (time === "last") {
      if (SavedGameTime !== "Empty") {
        CreateFromSavedTime(message, GameParent, GameChatTopic, teamArray, team1, team2, GameChanMsg)
        return;
      }
    } else {
      CreateFromScheduledTime(message, args, GameCount, GameChanMsg, team1, team2, time)
return;
    }
  }
}



