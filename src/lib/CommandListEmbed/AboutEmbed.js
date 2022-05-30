import {
    container
} from '@sapphire/pieces';
import {
    MessageEmbed
} from 'discord.js';
import { herculesfulllogo, nbaclogo } from '../hercConfig.js';

export function AboutEmbed(message) {
    var dbAboutEmbedFeatures = container.dbVal[`features`];
    var dbAboutEmbedDevelopers = container.dbVal[`developers`];
    var dbAboutEmbedCurrentVersion = container.dbVal[`currentversion`];
    var dbAboutEmbedGithub = container.dbVal[`github`];
    var dbAboutEmbedDonateLink = container.dbVal[`donatelink`]
    const AboutEmbed = new MessageEmbed()
        .setTitle("About Hercules")
        .setThumbnail(nbaclogo)
        .addFields({
                name: ":checkered_flag: **__Features__**",
                value: `${dbAboutEmbedFeatures}`,
                inline: false
            }, {
                name: ":desktop: **__Developers__**",
                value: `${dbAboutEmbedDevelopers}`,
                inline: false
            }, {
                name: ":globe_with_meridians:  **__Current Version__**",
                value: `${dbAboutEmbedCurrentVersion}`,
                inline: false
            }, {
                name: ":notepad_spiral:  **__Github__**",
                value: `${dbAboutEmbedGithub}`,
                inline: false
            }, {
                name: ":coffee:  **__Donate__**",
                value: `${dbAboutEmbedDonateLink}`,
                inline: false
            },

        )
        .setImage(`${herculesfulllogo}`)
    message.reply({
        embeds: [AboutEmbed]
    })
}