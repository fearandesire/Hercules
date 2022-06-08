import {
    MessageEmbed
} from 'discord.js';
import { managementEmbedImg, nbaclogo } from '../hercConfig.js';
export function usermodManagement(message){
    const usrmodMngEmbed = new MessageEmbed()
        .setTitle("Management Commands")
        .setThumbnail(nbaclogo)
        .setColor("#8f09da")
        .addFields(
            
            {   name: "$ld",   value: "Load the Databse for the server. Required to be run anytime Hercules is started", inline: true },
            {   name: "$viewall *or* $va",   value: "View every scheduled operation Hercules has.", inline: true },
            {   name: "$listschedule *or* $ls",   value: "Lists scheduled games. This will display games created by the bot, and with $cr", inline: true },
            {   name: "$deleteq *or* $delete [index]",   value: "Deletes a scheduled game. Index is the number the game is listed in. This makes it easier to delete scheduled games. If unsure, type $ls to view the number associated with the game to delete it.", inline: true   },
            {   name: "$deletcr [index]",   value: "Deletes a scheduled game that was created with the $cr command. Same as the $deletq command.  Games made with $cr are on a different list internally than ones made by Hercules automatically. ", inline: true   },
            {   name: "$dg",   value: "Deletes the game channel the command is used in.", inline: true   },
             {   name: "$cleargames or *$clearg*",   value: "Cancels all scheduled tasks today.", inline: true },

        )
        .setImage(`${managementEmbedImg}`)
    message.channel.send({
        embeds: [usrmodMngEmbed]
    });
}