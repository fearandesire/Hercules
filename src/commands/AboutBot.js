import {
    Command
} from '@sapphire/framework';
import {
    container
} from '@sapphire/pieces';
import {
    MessageEmbed
} from 'discord.js';
const nbaclogo =
  "https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif";
  const herculeslogo = "https://cdn.discordapp.com/attachments/515598020818239491/975854840217501737/HerculesLogo-PFP.png?size=4096";
  const herculesfulllogo = 'https://cdn.discordapp.com/attachments/515598020818239491/975843360453578852/HerculesLogo.png?size=4096'

export class AboutHercules extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'about',
            aliases: ['info', 'github'],
            description: 'Description',
        });
    }
    async messageRun(message) {
        var dbAboutEmbedFeatures = container.dbVal[`features`];
        var dbAboutEmbedDevelopers = container.dbVal[`developers`];
        var dbAboutEmbedCurrentVersion = container.dbVal[`currentversion`];
        var dbAboutEmbedGithub = container.dbVal[`github`];
        const AboutEmbed = new MessageEmbed()
            .setTitle("About Hercules")
            .setThumbnail(nbaclogo)
            .addFields(
                {   name: ":checkered_flag: **__Features__**",   value: `${dbAboutEmbedFeatures}`, inline: false   },
                {   name: ":desktop: **__Developers__**",   value: `${dbAboutEmbedDevelopers}`, inline: false   },
                {   name: ":globe_with_meridians:  **__Current Version__**",   value: `${dbAboutEmbedCurrentVersion}`, inline: false },
                {   name: ":notepad_spiral:  **__Github__**",   value:`${dbAboutEmbedGithub}` , inline: false },                
    
            )
            .setImage(`${herculesfulllogo}`)
            message.reply({embeds: [AboutEmbed]})
    }
}