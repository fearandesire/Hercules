import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
import { MessageEmbed } from 'discord.js';
import { SapDiscClient } from '../../Hercules.js';
import {
  bold, cborder, herculeslogo, logthis, magentaBright, nbaclogo, red
} from '../../lib/hercConfig.js';
import { SendEmbedResp } from '../../utils/SQL/Embeds/SendEmbed.js';

  /**
   - @gameSchedList array containing the Games automatically scheduled from Hercules
   - @CrSchedList array containing Games/Channels scheduled manually with $cr
   - @OBJgameSched object containing the Games scheduled - but more importantly: ordered numerically & increments per game.
   An example return would look like: { "1", "celtics vs heat", "2", "warriors vs mavericks" }
   This allows for simplistic deletion just by using the number associated with the game.
   - @OBJCrgameSched object containing the Games manually scheduled with $cr -- same as @OBJgameSched
   */
  const OBJgameSched = container.OBJgameSched
  const OBJCrgameSched = container.OBJCrgameSched
  const CrSchedList = container.CrSchedList;
  const gameSchedList = container.gameSchedList;
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
    if (gameSchedList && CrSchedList.length < parseInt(1)){
      var embedTitleNoGames = 'Schedule Information';
      var embedTextNoGames = `No games are currently scheduled. Verify with $tg to ensure this is correct.`;
      SendEmbedResp(message, embedTitleNoGames, embedTextNoGames)
      return;
    }
    //? Response if there are no games that have been scheduled with $cr or by Hercules
    if (CrSchedList.length < parseInt(1) && gameSchedList.length < parseInt(1)){
      var CRembedTitle = 'Schedule Information';
      var CRembedText = `Currently, there are no games scheduled by Hercules or manually.`;
      SendEmbedResp(message, CRembedTitle, CRembedText)
      return;
    }
    if (gameSchedList.length < parseInt(1)){
      var embedTitle = 'Automatic Schedule Information';
      var embedText = `There are no games automatically scheduled by **Hercules** for today.`;
      SendEmbedResp(message, embedTitle, embedText)
      //return;
    }
    logthis(magentaBright(cborder))
    logthis(red(bold(`Logging Games Scheduled Obj/List:`)))

    console.log(OBJgameSched)
    console.log(`----`)
    console.log(OBJCrgameSched)
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
      .setDescription(`**NBA Games:** \n \n **${gameSchedList.join('\n \n')}**`)
      .setColor("BLUE")
      .setFooter({
        text: "Take note of the order of the games. To delete a game, type: $deleteq [index]. For example, to delete the second game on this list, you would type: **$deletq 2.** Alternatively, if unsure, please review $vg ids"
      })
    //? Sending Games Scheduled from Hercules Embed
    async function sendAutoSchEmbed(AutoScheduleEmbed) {
      var bChannel = container.dbVal[`botChannel`]
      const chan = await SapDiscClient.channels.fetch(bChannel)
      chan.send({embeds: [AutoScheduleEmbed]})
      return;
    }
    sendAutoSchEmbed(AutoScheduleEmbed);
    const CreateGameScheduleEmbed = new MessageEmbed()
      /* ---------------------------------------------------- //* Embed containing the $creategame game schedule ---------------------------------------------------- */
      .setTitle("Scheduled Games (from $cr)")
      .setThumbnail(nbaclogo)
      .setAuthor({
        name: "Hercules",
        iconURL: herculeslogo
      })
      //? Using .join to format the game schedule array
      .setDescription(`**NBA Games:** \n \n **${CrSchedList.join('\n \n')}**`)
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