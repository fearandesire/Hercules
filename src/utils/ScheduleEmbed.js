import {
  container
} from '@sapphire/framework';
import {
  MessageEmbed
} from 'discord.js';
import {
  bold, cborder, cyanBright,
  logthis, magentaBright, red
} from '../lib/hercConfig.js';
import {
  SapDiscClient
} from '../Hercules.js';
export function ScheduleEmbed(nbaclogo, herculeslogo, gameArray, gameArrayDelete, CountNBAGames) {
  const botchannel = container.dbVal[`botChannel`]
  logthis(red(bold(`[DEBUGGING] BOTCHANNEL: ${container.dbVal[`botChannel`]}`)))
  const ETConv = container.ETConvert
  const scheduleEmbed = new MessageEmbed()
    /* ---------------------------------------------------- //! Embed containing the game schedule ---------------------------------------------------- */
    .setTitle("Scheduled Games")
    .setThumbnail(nbaclogo)
    .setAuthor({
      name: "Hercules",
      iconURL: herculeslogo
    })
    //? Using .join to format the game schedule array
    .setDescription(`**NBA Games:** \n \n **${gameArray.join('\n \n')}**`)
    .setColor("BLUE")
    .setFooter({
      text: "If you need to delete a game the bot made, or a game manually made - read $help or $cmds."
    })
  /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
  //? Sending Embed
  async function sendSchEmbed(scheduleEmbed) {
    var bChannel = container.dbVal[`botChannel`]
    const chan = await SapDiscClient.channels.fetch(bChannel)
    chan.send({embeds: [scheduleEmbed]})
    return;
  }
  sendSchEmbed(scheduleEmbed);

  /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
  container.embedtest = scheduleEmbed;
  //// Troubleshooting/Debugging - logging embed data that we should be getting in the bot spam channel.

  logthis(magentaBright(cborder))
  logthis(cyanBright(bold(`[Game Scheduling]\nSchedule Embed:`)))
  logthis((gameArray))
  logthis(magentaBright(cborder))
  /* -------------------------------------- //! Embed containing the times we will delete created game channels: HASHED OUT for now. -------------------------------------- */
  // const deleteEmbed = new MessageEmbed()

  //   .setTitle("Scheduled Deletion")
  //   .setThumbnail(nbaclogo)
  //   .setAuthor({
  //     name: "Hercules",
  //     iconURL: herculeslogo
  //   })
  //   .setDescription(`**Delete Tasks:** \n \n ${gameArrayDelete.join('\n \n')}`)
  //   .setColor("BLUE")
  //   .setFooter({
  //     text: "Verify with $tg. If there is a game missing, ping FENIX!"
  //   })
  //   /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
  //   //* Sending Delete Times Embed
  //   async function sendDelEmbed(deleteEmbed) {
  //     var bChannel = container.dbVal[`botChannel`]
  //     const chan = await SapDiscClient.channels.fetch(bChannel)
  //     chan.send({embeds: [deleteEmbed]})
  //     return;
  //   }
  //   sendDelEmbed(deleteEmbed);
  //   container.deletionEmbed = deleteEmbed;
  /* ------------------------------------------------------------------------------------------------------------------------------------------------ */

  /* ---------------------------------------------------------- //! Info & Predictor Embed ---------------------------------------------------------- */
  const completeEmbed = new MessageEmbed()

    .setTitle("Daily Schedule Status & Info")
    .setThumbnail(nbaclogo)
    .setAuthor({
      name: "Hercules",
      iconURL: herculeslogo
    })
    .setDescription(`
    Prediction channels have been scheduled to close at **${ETConv}** \n 
    ${container.TodayDayOfWeek}'s Games (**${CountNBAGames} total**) are successfully scheduled! \n 
    **$help or $cmds** will display all commands. Please read the commands first and if you can't find what you need, ping FENIX. \n
    **View current scheduled games via $vg.** __View every **ID** for the scheduled games with:__ \`\`\`$vg ids\`\`\`
    `)
    .setColor("BLUE");
    /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
    //* Send Info & Predictor Embed
    async function sendInfoEmbed(completeEmbed) {
      var bChannel = container.dbVal[`botChannel`]
      const chan = await SapDiscClient.channels.fetch(bChannel)
      chan.send({embeds: [completeEmbed]})
      return;
    }
    sendInfoEmbed(completeEmbed);

}