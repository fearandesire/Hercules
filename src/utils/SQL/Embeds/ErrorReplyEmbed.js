import { MessageEmbed } from "discord.js"

export function SendEmbedErrorResp(embedText){
const HercEmbedResp = new MessageEmbed()
//.setTitle("TITLE")
  .setThumbnail('https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif')
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
    .setThumbnail('https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif')
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