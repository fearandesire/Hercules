import {
    container
} from '@sapphire/pieces';
import {
    MessageEmbed
} from 'discord.js';
import {
    SapDiscClient
} from '../../Hercules.js';
import {
    herculeslogo,
    nbaclogo
} from '../../lib/hercConfig.js';
import {
    LogGreen
} from '../ConsoleLogging.js';
const gameSchedList = container.gameSchedList;
export async function sendAutoSchEmbed(message) {
    LogGreen(`Sending Auto Schedule Embed`)
    var bChannel = container.dbVal[`botChannel`]
    const chan = await SapDiscClient.channels.fetch(bChannel)
    const AutoScheduleEmbed = new MessageEmbed()
        /* ---------------------------------------------------- //* Embed containing the game schedule ---------------------------------------------------- */
        .setTitle("Scheduled Games (from Hercules)")
        .setThumbnail(nbaclogo)
        .setAuthor({
            name: "Hercules",
            iconURL: herculeslogo
        })
        //? Using .join to format the game schedule array
        .setDescription(`**NBA Games:** \n \n **${gameSchedList.join('\n \n')}**`)
        .setColor("BLUE")
        .setFooter({
            text: "Take note of the order of the games. To delete a game, type: $deleteq [index]. For example, to delete the second game on this list, you would type: **$deletq 2.** Alternatively, if unsure, please review $vg ids"
        })
    //? Sending Games Scheduled from Hercules Embed
    message.reply({
        embeds: [AutoScheduleEmbed]
    })
    return;
}