import { Command } from '@sapphire/framework';
import { ModScoreSQL } from '../../utils/SQL/ModifyScoreSQL.js';
export class scoreMsgtoggle extends Command {
constructor(context, options) {
super(context, {
...options,
name: "scoremsgtoggle",
aliases: ["smsgt", "smsgtg"],
description: "score msg response toggle",
requiredUserPermissions: ["KICK_MEMBERS"]
});
}
 
 async messageRun(message, args) {
  const modInput = await args.pick("string").catch(() => null);
  if (modInput === "off") {
    var TrueOrFalse = 'false';
    var dbID = parseInt(1);
    ModScoreSQL(TrueOrFalse, dbID)
    message.reply(`$Score command's response message is now **off!**`);
    return;
  } else if (modInput === "on") {
    var TrueOrFalse2 = 'true';
    var dbID2 = parseInt(1);
    ModScoreSQL(TrueOrFalse2, dbID2)
    message.reply(`$Score command's response message is now  **on!**`);
    return;
  } else {
      console.log("Invalid inpuit given for scoretoggle command.")
      message.reply("Invalid inpuit given for scoretoggle command.")
  }

  }

}
