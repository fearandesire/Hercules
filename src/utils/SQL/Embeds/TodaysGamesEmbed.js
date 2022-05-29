import { MessageAttachment, MessageEmbed } from "discord.js"
const attachment = new MessageAttachment('../../../gameimages/tgnba.jpg');

export function SendHercEmbedGameImageResp(){
    const HercEmbedResp = new MessageEmbed()
      .setTitle("Todays Game's")
      .setThumbnail('https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif')
      .setColor("blue")
       .setImage("attachment://tgnba.jpg")
      return HercEmbedResp;
    }