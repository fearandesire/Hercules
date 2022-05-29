import {
    Command
} from '@sapphire/framework';
import {
    AddToUsageStats
  } from '../utils/SQL/AddToUsageStats.js'
import fs from "fs"
import fetch from "node-fetch";
export class ManualScreenshot extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: "manualscreenshot",
            aliases: ["ms", "mg"],
            description: "Manually set image for $tg command.",
            requiredUserPermissions: ['KICK_MEMBERS']
        });
    }

    async messageRun(message, args) {
        //* -------------- */
        //* Adding to usage stats
        var userid = message.author.id
        var SQLTargetTable = `manualscreenshotstats`
        var commandname = `manualscreenshot`
        AddToUsageStats(userid, SQLTargetTable, commandname)
        //* -------------- */
        const tgdata = await args.pick("string").catch(() => null);
        var mgresponse = await fetch(tgdata);
        var mgbuffer = await mgresponse.buffer();
        fs.writeFile(`./gameimages/tgnba.jpg`, mgbuffer, () =>
            console.log("finished downloading!")
        );
        console.log(tgdata);
        message.reply(
            "Custom Image for '$tg' has been set! Type $tg to see your result."
        );
    }
}