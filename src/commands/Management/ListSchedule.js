import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
import { MessageEmbed } from 'discord.js';
import { SapDiscClient } from '../../Hercules.js';
import {
  bold, cborder, logthis, magentaBright, red
} from '../../lib/hercConfig.js';
import { SendEmbedResp } from '../../utils/SQL/Embeds/SendEmbed.js';
const herculeslogo = "https://cdn.discordapp.com/attachments/515598020818239491/975854840217501737/HerculesLogo-PFP.png?size=4096";
const nbaclogo =
  "https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif";
  const GameSchedule = container.GameSchedule
  const GameSchedule2 = container.GameSchedule2
  const GameSchedule2Array = container.GameSchedule2Array;
  const GameArray = container.GameArray;
export class ListSchedule extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'listschedule',
      aliases: ['ls'],
      description: 'List Game Schedule',
      requiredUserPermissions: ['KICK_MEMBERS']
    });
  }

  async messageRun(message) {
    if (GameArray && GameSchedule2Array.length < parseInt(1)){
      var embedTitleNoGames = 'Schedule Information';
      var embedTextNoGames = `No games are currently scheduled. Verify with $tg to ensure this is correct.`;
      SendEmbedResp(message, embedTitleNoGames, embedTextNoGames)
      return;
    }
    if (GameArray.length < parseInt(1)){
      var embedTitle = 'Schedule Information';
      var embedText = `Currently, no games have been scheduled by Hercules.`;
      SendEmbedResp(message, embedTitle, embedText)
      return;
    }
    logthis(magentaBright(cborder))
    logthis(red(bold(`Logging Games Scheduled Obj/List:`)))

    console.log(GameSchedule)
    console.log(`----`)
    console.log(GameSchedule2)
    console.log(`----`)
    
    /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
    const botchannel = container.dbVal[`botChannel`]
    const AutoScheduleEmbed = new MessageEmbed()
      /* ---------------------------------------------------- //* Embed containing the game schedule ---------------------------------------------------- */
      .setTitle("Scheduled Games (from $cr)")
      .setThumbnail(nbaclogo)
      .setAuthor({
        name: "Hercules",
        iconURL: herculeslogo
      })
      //? Using .join to format the game schedule array
      .setDescription(`**NBA Games:** \n \n **${GameArray.join('\n \n')}**`)
      .setColor("BLUE")
      .setFooter({
        text: "Take note of the order of the games. To delete a game, type: $deleteq [index]. For example, to delete the second game on this list, you would type: **$deletq 2.** Alternatively, if unsure, please review $vg ids"
      })
    //? Sending Embed
    async function sendAutoSchEmbed(AutoScheduleEmbed) {
      var bChannel = container.dbVal[`botChannel`]
      const chan = await SapDiscClient.channels.fetch(bChannel)
      chan.send({embeds: [AutoScheduleEmbed]})
      return;
    }
    sendAutoSchEmbed(AutoScheduleEmbed);
    if (GameSchedule2Array.length < parseInt(1)){
      var CRembedTitle = '$CR Schedule Information';
      var CRembedText = `No games have been manually scheduled with $cr // $createagame command, games scheduled automatically are in the above embed.`;
      SendEmbedResp(message, CRembedTitle, CRembedText)
      return;
    }
    const CreateGameScheduleEmbed = new MessageEmbed()
      /* ---------------------------------------------------- //* Embed containing the $creategame game schedule ---------------------------------------------------- */
      .setTitle("Scheduled Games (from $cr)")
      .setThumbnail(nbaclogo)
      .setAuthor({
        name: "Hercules",
        iconURL: herculeslogo
      })
      //? Using .join to format the game schedule array
      .setDescription(`**NBA Games:** \n \n **${GameSchedule2Array.join('\n \n')}**`)
      .setColor("BLUE")
      .setFooter({
        text: "Take note of the order of the games. To delete a game, type: **$deletecr [index]**. For example, to delete the second game on this list, you would type: **$deletq 2.** Alternatively, if unsure, please review $vg ids. Note: Deleted Games will not disappear from the list."
      })
    /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
    //? Sending Embed
    async function sendCRSchEmbed(CreateGameScheduleEmbed) {
      var bChannel = container.dbVal[`botChannel`]
      const chan = await SapDiscClient.channels.fetch(bChannel)
      chan.send({embeds: [CreateGameScheduleEmbed]})
      return;
    }
    sendCRSchEmbed(CreateGameScheduleEmbed);
  }
}