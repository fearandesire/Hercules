import {
    MessageEmbed
} from 'discord.js';
import { scheduleImg } from '../hercConfig.js';
export function usermodScheduling(message){
    const usrmodSchEmbed = new MessageEmbed()
        .setTitle("Scheduling Commands")
        .setThumbnail('https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif')
        .setColor("#ff1100")
        .addFields(
            
            {   name: "$quegames *or* $qg",   value: "Schedules any game due today.", inline: true },
            {   name: "$cr team1 vs/at team2 time",   value: "Schedules a game channel to be made based on the provided formant and the time that you input.", inline: true   },
            {
                name: '\u200B',
                value: '\u200B',
                inline: true
             },
        )
        .setImage(`${scheduleImg}`)
    message.channel.send({
        embeds: [usrmodSchEmbed]
    });
}

