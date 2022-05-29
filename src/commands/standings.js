import {
  Command
} from '@sapphire/framework';
import {
  AddToUsageStats
} from '../utils/SQL/AddToUsageStats.js'
export class PostStandings extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'standings',
      description: 'Post Standings'
    });
  }

  async messageRun(message, args) {
    //* -------------- */
    //* Adding to usage stats
    var userid = message.author.id
    var SQLTargetTable = `standingsstats`
    var commandname = `standings`
    AddToUsageStats(userid, SQLTargetTable, commandname)
    //* -------------- */
    const msg = message;
    //? catching no arguments - which we will use here to post BOTH standings
    const text = await args.rest('string').catch(() => null);
    if (text == null) {
      msg.reply("Here are the Eastern and Western NBA Conference Standings:")
      msg.reply({
        files: ['./gameimages/eaststandings.jpg',
          './gameimages/weststandings.jpg'
        ]
      });
      return;
    }
    if (text.toLowerCase() == "west") {
      msg.reply("Here are the Western Conference Standings")
      msg.reply({
        files: ['./gameimages/weststandings.jpg'],
      });
      return;
    } else
    if (text.toLowerCase() == "east") {
      msg.reply("Here are the Eastern Conference Standings")
      msg.reply({
        files: ['./gameimages/eaststandings.jpg'],
      });
      return;
    } else {
      message.reply("Please input either West or East for this command!")
    }
  }
}