import {
    container
} from '@sapphire/pieces';
import { MessageEmbed } from 'discord.js';
import { SapDiscClient } from '../../../Hercules.js';
import { herculeslogo, nbaclogo } from '../../../lib/hercConfig.js';
const CrSchedList = container.CrSchedList;
//? Sending Embed
export async function sendCRSchEmbed(message) {
var bChannel = container.dbVal[`botChannel`]
const chan = await SapDiscClient.channels.fetch(bChannel)
const CreateGameScheduleEmbed = new MessageEmbed()

.setTitle("Scheduled Games (from $cr)")
.setThumbnail(nbaclogo)
.setAuthor({
  name: "Hercules",
  iconURL: herculeslogo
})
//? Using .join to format the game schedule array
.setDescription(`**NBA Games:** \n \n **${CrSchedList.join('\n \n')}**`)
.setColor("BLUE")
.setFooter({
  text: "Take note of the order of the games. To delete a game, type: **$deletecr [index]**. For example, to delete the second game on this list, you would type: **$deletq 2.** Alternatively, if unsure, please review $vg ids. Note: Deleted Games will not disappear from the list."
})

message.reply({
    embeds: [CreateGameScheduleEmbed]
})
return;
}