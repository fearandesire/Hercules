import { Command } from '@sapphire/framework';
import { ModScoreSQL } from '../../utils/ModifyScoreSQL.js';
export class scoretoggle extends Command {
constructor(context, options) {
super(context, {
...options,
name: "scoretoggle",
aliases: ["st"],
description: "score toggle",
requiredUserPermissions: ["KICK_MEMBERS"]
});
}
 
 async messageRun(message, args) {
  const modInput = await args.pick("string").catch(() => null);
  if (modInput === "off") {
    var TrueOrFalse = 'false';
    var dbID = parseInt(2);
    ModScoreSQL(TrueOrFalse, dbID)
    message.reply(`The score command has been turned **off!**`);
    return;
  } else if (modInput === "on") {
    var TrueOrFalse2 = 'true';
    var dbID2 = parseInt(2);
    ModScoreSQL(TrueOrFalse2, dbID2)
    message.reply(`The score command has been turned **on!**`);
    return;
  } else {
      console.log("Invalid inpuit given for scoretoggle command.")
      message.reply("Invalid inpuit given for scoretoggle command.")
  }

  }

}
