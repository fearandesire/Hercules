import { container } from '@sapphire/pieces';
import { SapDiscClient } from '../../Hercules.js';
export async function sendChannelMSG(chanMsg){
     var bChannel = container.dbVal[`botChannel`]
  const chan = await SapDiscClient.channels.fetch(bChannel)
  chan.send(chanMsg)
  return;
}

export async function sendChannelEmbedMSG(chanEmbedMsg){
    var bChannel = container.dbVal[`botChannel`]
 const chan = await SapDiscClient.channels.fetch(bChannel)
 chan.send({
     embed: [chanEmbedMsg]
 })
 return;
}