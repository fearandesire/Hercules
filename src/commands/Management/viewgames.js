//?
import {
  Command, container
} from '@sapphire/framework';
import {
  MessageEmbed
} from 'discord.js';

const gameSchedMngr = container.hercGameSchedMngr;
const deleteGameMngr = container.deleteGameMngr;
const dailyStandingsMngr = container.dailyStandings
const dailyGameSSMngr = container.dailyGameSS
const CrgameSchedMngr = container.crmngr;
//const ScrubScheduler = container.scrubmanager
//const lockPredictorMngr = container.predictorMngr;

export class viewall extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: "viewall",
      aliases: ["va"],
      description: "View all scheduled operations",
      requiredUserPermissions: ['KICK_MEMBERS']
    });
  }

  async messageRun(message) {

    const gameEmbed = new MessageEmbed()
    .setTitle(`Games automatically scheduled by Hercules`)
    .setColor("#00FFFF")
    .addField(`Details:`, `**${gameSchedMngr.listCrons()}**`)
  message.channel.send({
    embeds: [gameEmbed]
  });

  const crGameEmbed = new MessageEmbed()
    .setTitle("Games created manually with $cr")
    .setColor("#00FFFF")
    .addField("Manual Game Channel Operations:", `**${CrgameSchedMngr.listCrons()}**`)
  message.channel.send({
    embeds: [crGameEmbed]
  });

  const deleteGameEmbed = new MessageEmbed()
    .setTitle("Game Channels to be deleted by Hercules")
    .setColor("#00FFFF")
    .addField("Details:", `**${deleteGameMngr.listCrons()}**`)
  message.channel.send({
    embeds: [deleteGameEmbed]
  });


  const dailySSEmbed = new MessageEmbed()
    .setTitle("Collect Game Schedule Image")
    .setColor("#00FFFF")
    .addField("Details:", `**${dailyGameSSMngr.listCrons()}**`)
  message.channel.send({
    embeds: [dailySSEmbed]
  });

  
  const dailyStandingsEmbed = new MessageEmbed()
    .setTitle("Collect NBA Standings Image")
    .setColor("#00FFFF")
    .addField("Details:", `**${dailyStandingsMngr.listCrons()}**`)
  message.channel.send({
    embeds: [dailyStandingsEmbed]
  });

    }
  }