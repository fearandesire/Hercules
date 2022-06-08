import { MessageEmbed } from "discord.js";
import { nbaclogo } from "../../../lib/hercConfig.js";
/**
 @embedText Text of Error Embed
 */
export function SendEmbedErrorResp(embedText){
const HercEmbedResp = new MessageEmbed()
//.setTitle("TITLE")
  .setThumbnail(nbaclogo)
  .setColor("RED")
  .addFields(

    {
      name: "Error",
      value: `${embedText}`,
      inline: false
    },
  )
  return HercEmbedResp;
}

export function ReturnEmbedErrorResp(errorMsg){
  const HercEmbedResp = new MessageEmbed()
  //.setTitle("TITLE")
    .setThumbnail(nbaclogo)
    .setColor("RED")
    .addFields(
  
      {
        name: "Error",
        value: `${errorMsg}`,
        inline: false
      },
    )
    return HercEmbedResp;
  }

  export function ReturnScheduleEmbedErrorResp(errorMsg){
    const HercEmbedResp = new MessageEmbed()
    //.setTitle("TITLE")
      .setThumbnail(nbaclogo)
      .setColor("#f5ef42")
      .addFields(
    
        {
          name: "No Schedule Found Today",
          value: `${errorMsg}`,
          inline: false
        },
      )
      return HercEmbedResp;
    }