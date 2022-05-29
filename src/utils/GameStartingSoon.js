import { container } from "@sapphire/pieces";
import { SapDiscClient } from "../Hercules.js";
import { bold, cyan, logthis } from "../lib/hercConfig.js";

export async function SendGameStartingSoon(id) {
    logthis(cyan(bold(`Alerting #general chat that a game channel is opening.`)))
    var GeneralChaniD = container.dbVal[`GeneralChat`]
    const chan = await SapDiscClient.channels.fetch(GeneralChaniD)
    chan.send(`**<#${id}> is starting soon. Tune in!**`)
    return;
}