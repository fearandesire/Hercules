import { MessageAttachment, MessageEmbed } from "discord.js";
import { nbaclogo } from "../../../lib/hercConfig.js";
const attachment = new MessageAttachment('../../../gameimages/tgnba.jpg');

export function SendHercEmbedGameImageResp(){
    const HercEmbedResp = new MessageEmbed()
      .setTitle("Todays Game's")
      .setThumbnail(nbaclogo)
      .setColor("blue")
       .setImage("attachment://tgnba.jpg")
      return HercEmbedResp;
    }