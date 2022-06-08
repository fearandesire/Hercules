import {
    MessageEmbed
} from 'discord.js';
import { nbaclogo, utilityEmbedImg } from '../hercConfig.js';
export function usermodUtility(message){
    const usrmodUtilEmbed = new MessageEmbed()
        .setTitle("Utility Commands")
        .setThumbnail(nbaclogo)
        .setColor("#ff1100")
        .addFields(

            {   name: "$standings _[east, west, or none]*_",   value: `Returns the current NBA Standings. *User can request either East, West or if nothing is input - both will display.`, inline: false },
             {   name: "$scoretoggle",   value: "Toggles the score command.", inline: false },
             {   name: "$scoremsgtoggle",   value: "Toggles the response msg that score is off..", inline: false },
             {   name: "$sg",   value: "Requests the bot to gather the daily game for $tg.", inline: false   },
             {   name: "$ping",   value: "Pings the bot.", inline: false   },
             {   name: "$mg [url]",   value: "Manually set an image for the $tg command (used if image is currently cutoff).", inline: false   },
             {   name: "$score",   value: "When used in a game channel, bot will retrieve the score.", inline: false   },
            
 
        )
        .setImage(`${utilityEmbedImg}`)
    message.channel.send({ 
        embeds: [usrmodUtilEmbed]
    });  
}   
