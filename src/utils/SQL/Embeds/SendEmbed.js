import { MessageEmbed } from "discord.js";
import { SapDiscClient } from '../../../Hercules.js';
import { nbaclogo } from "../../../lib/hercConfig.js";
/**
 * 
 * @SendEmbedResp function that will respond with an embed
 * @message required to pass in so the bot can use .reply
 * @embedTitle the title of the embed
 * @embedText the text of the embed
 */
export const SendEmbedResp = function(message, embedTitle, embedText){
const HercEmbedResp = new MessageEmbed()
//.setTitle("TITLE")
  .setThumbnail(nbaclogo)
  .setColor("#29d8ff")
  .addFields(

    {
      name: `${embedTitle}`,
      value: `${embedText}`,
      inline: false
    },
  )
  return message.reply({embeds: [HercEmbedResp]})
}

export const SendEmbedRespToChannel = async function(embedTitle, embedText, targetChannel){
  const HercEmbedResp2 = new MessageEmbed()
  //.setTitle("TITLE")
    .setThumbnail(nbaclogo)
    .setColor("#29d8ff")
    .addFields(
  
      {
        name: `${embedTitle}`,
        value: `${embedText}`,
        inline: false
      },
    )
    const chan = await SapDiscClient.channels.fetch(targetChannel)
    chan.send({embeds:[HercEmbedResp2]})
    return;
  }