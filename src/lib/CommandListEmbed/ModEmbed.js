import {
    MessageEmbed
} from 'discord.js';
import { DefaultEmbedImg } from '../hercConfig.js';
export function usermodDefault(message){ 
    const usrmodDefaultEmbed = new MessageEmbed()
        .setTitle("Command List Menu")
        .setThumbnail('https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif')
        .setColor("BLUE")
        .addFields(
            
            {   name: "Scheduling",   value: "Displays commands related to scheduling and channel creation. _[$cmds scheduling]_", inline: true },
            {   name: "Management",   value: "Displays commands related to managing the bot and it's features. _[$cmds management]_ ", inline: true   },
        {   name: "Utility",   value: "When used in a game channel, bot will retrieve the score. _[$cmds utility]_", inline: true },
        {   name: "About",   value: "Displays information/docs on Hercules & [Donation Link](https://ko-fi.com/fenix7559)", inline: true }
        )
        .setImage(`${DefaultEmbedImg}`)
    message.channel.send({
        embeds: [usrmodDefaultEmbed]
    }); 
}