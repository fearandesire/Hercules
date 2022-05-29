import {
    MessageEmbed
} from 'discord.js';
import { DefaultEmbedImg } from '../hercConfig.js';
export function usernotmod(message){

    const nonmodresponse = new MessageEmbed()
        .setTitle("Commands") 
        .setThumbnail('https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif')
        .setColor("BLUE")
        .addFields(  
          
        {   name: "$score",   value: "When used in a game channel, Hercules will retrieve the score.", inline: true },
        {   name: "$tg",   value: "Displays today's scheduled NBA Games.", inline: true   },
        {
            
            name: '\u200B',
            value: '\u200B',
            inline: true
         },
        {   name: "$standings _[east, west, or none]*_",   value: "Displays the current NBA Standings. *User can request either East, West or if nothing is input - both will display.", inline: true   },
        )
        .setImage(`${DefaultEmbedImg}`)
    message.channel.send({
        embeds: [nonmodresponse]
    });
}