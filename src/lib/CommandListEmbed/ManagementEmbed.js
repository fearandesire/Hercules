import {
    MessageEmbed
} from 'discord.js';
import { managementEmbedImg } from '../hercConfig.js';
export function usermodManagement(message){
    const usrmodMngEmbed = new MessageEmbed()
        .setTitle("Management Commands")
        .setThumbnail('https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif')
        .setColor("#00471b")
        .addFields(
            
            {   name: "$vg [ids]*",   value: "View _everything_ scheduled today. **To view the IDs for every task, type $vg ids.** **Instead of 'ids', you could also type '$vg full' or $vg list': ids, full, list.* ", inline: true },
            {   name: "$listschedule *or* $ls",   value: "Lists scheduled games. This will display games created by the bot, and with $cr", inline: true },
            {   name: "$deleteq *or* $delete [index]",   value: "Deletes a scheduled task. Index is the number the game is listed in. This makes it easier to delete scheduled games. If unsure, type $ls to view the number associated with the game to delete it.", inline: true   },
            {   name: "$dg",   value: "Deletes the game channel the command is used in.", inline: true   },
             {   name: "$cleargames or *$clearg*",   value: "Cancels all scheduled tasks today.", inline: true },

        )
        .setImage(`${managementEmbedImg}`)
    message.channel.send({
        embeds: [usrmodMngEmbed]
    });
}