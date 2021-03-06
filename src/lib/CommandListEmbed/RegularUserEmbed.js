import {
    MessageEmbed
} from 'discord.js';
import { DefaultEmbedImg, nbaclogo } from '../hercConfig.js';
export function usernotmod(message){

    const nonmodresponse = new MessageEmbed()
        .setTitle("Commands") 
        .setThumbnail(nbaclogo)
        .setColor("#00FFFF")
        .addFields(  
          
        {   name: "$score",   value: "When used in a game channel, Hercules will retrieve the score.", inline: true },
        {   name: "$tg",   value: "Displays today's scheduled NBA Games.", inline: true   },
        {
            
            name: '\u200B',
            value: '\u200B',
            inline: true
         },
        {   name: "$standings _[east, west, or none]*_",   value: "Displays the current NBA Standings. *User can request either East, West or if nothing is input - both will display.", inline: true   },
        {   name: "About",   value: "Displays information/docs on Hercules & [Donation Link](https://ko-fi.com/fenix7559)", inline: true },
        {   name: "WhatsNew",   value: "Summary of the latest changes to Hercules.", inline: true }
        
        )
        .setImage(`${DefaultEmbedImg}`)
    message.channel.send({
        embeds: [nonmodresponse]
    });
}