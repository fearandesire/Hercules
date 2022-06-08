import {
    MessageEmbed
} from 'discord.js';
import { DefaultEmbedImg, nbaclogo } from '../hercConfig.js';
export function usermodDefault(message){ 
    const usrmodDefaultEmbed = new MessageEmbed()
        .setTitle("Command List Menu")
        .setThumbnail(nbaclogo)
        .setColor("#00FFFF")
        .addFields(
            
            {   name: "Scheduling",   value: "Displays commands related to scheduling and channel creation. _[$cmds scheduling]_", inline: true },
            {   name: "Management",   value: "Displays commands related to managing the bot and it's features. _[$cmds management]_ ", inline: true   },
        {   name: "Utility",   value: "When used in a game channel, bot will retrieve the score. _[$cmds utility]_", inline: true },
        {   name: "About",   value: "Displays information/docs on Hercules & [Donation Link](https://ko-fi.com/fenix7559)", inline: true },
        {   name: "WhatsNew",   value: "Summary of the latest changes to Hercules.", inline: true }
        )
        .setImage(`${DefaultEmbedImg}`)
    message.channel.send({
        embeds: [usrmodDefaultEmbed]
    }); 
}