//?
import {
  Command, container
} from '@sapphire/framework';
import {
  MessageEmbed
} from 'discord.js';
//! REPLACE CONFIG VARIABLE
import {
  SapDiscClient
} from '../Hercules.js';

/*
 ! We are using Cron Job Manager which is an effective
 ! Node Package that helps us manage the Cron Jobs (how i schedule the games) set up
 ! Now we can add commands to stop ALL Cron Jobs,  as well as
 ! A command to view all jobs (to retreive the game, cron job and matching key / id it has, for example)
 ! Then we can use that key / id to update or cancel any game scheduled.
 
 */

//* Game Channel creation manager
const gamemngr = container.cronhandler;
//* Delete Game Channel Manager
const gamemngr2 = container.cronhandler2;
const lockPredictorMngr = container.cronhandler3;
//const nextPredictorMngr = container.nextdaypredictor;
const ScrubScheduler = container.scrubmanager
//? Daily Mngr
const scheduleCrnMngr = container.dailyscheduler;
export class viewgames extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: "viewgames",
      aliases: ["vg"],
      description: "View scheduled games",
      requiredUserPermissions: ['KICK_MEMBERS']
    });
  }

  async messageRun(message, args) {
    const botchannel = container.dbVal[`botChannel`]
    //console.log(container.predictionChannelClose12Hr)
    const UserRequestID = await args.pick("string").catch(() => null);
    if (UserRequestID === null) {
      if (container.predictionChannelClose12Hr !== undefined) {
        //? Making sure predictor channel is running.
        lockPredictorMngr.start('lockPredictionChannelTimerV2')
        const etest = container.embedtest
        //console.log(etest)
        SapDiscClient.channels.cache.get(botchannel).send({
          embeds: [etest]
        });
        SapDiscClient.channels.cache.get(botchannel).send({
          embeds: [container.deletionEmbed]
        });

        const PredictionEmbed = new MessageEmbed()
          .setTitle(`Prediction Channel Closing @ ${container.predictionChannelClose12Hr}`)
          .setThumbnail('https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif')
          .setColor("BLUE")
          .setDescription("Any issues or bugs, please notify FENIX!")
        //  .setImage(`${config.HercScheduleEmbed}`)
        message.channel.send({
          embeds: [PredictionEmbed]
        });
        return;

      }
      if (gamemngr.listCrons().length > 4){
        console.log(gamemngr.listCrons().length)
        const IDEmbedInner = new MessageEmbed()
          .setTitle(`Scheduled Games IDs`)
          .setColor("BLUE")
          .addField(`ID List:`, `**${gamemngr.listCrons()}**`)
        message.channel.send({
          embeds: [IDEmbedInner]
        });
        return;
      } 
       else {
        message.reply("Nothing is scheduled.")
        return;
      }
    }
    
      if (UserRequestID.toLowerCase() === "full" || UserRequestID.toLowerCase() === "ids" || UserRequestID.toLowerCase() === "list" || UserRequestID.toLowerCase() === "id") {
        //if (container.predictionChannelClose12Hr !== undefined){
        const trio = "`";
        const IDEmbed1 = new MessageEmbed()
          .setTitle(`Scheduled Games IDs`)
          .setColor("BLUE")
          .addField(`ID List:`, `**${gamemngr.listCrons()}**`)
        message.channel.send({
          embeds: [IDEmbed1]
        });
        const IDEmbed2 = new MessageEmbed()
          .setTitle("Scheduled Deletion IDs")
          .setColor("BLUE")
          .addField("Delete Tasks ID List:", `**${gamemngr2.listCrons()}**`)
        message.channel.send({
          embeds: [IDEmbed2]
        });
        const IDEmbed3 = new MessageEmbed()
          .setTitle("Prediction Timers")
          .setColor("BLUE")
          .addField("Lock Channel Task:", `**${lockPredictorMngr.listCrons()}**`)
        message.channel.send({
          embeds: [IDEmbed3]
        });
        const IDEmbed4 = new MessageEmbed()
          .setTitle("Daily Scheduling")
          .setColor("BLUE")
          .addField("Daily Scheduling Task:", `**${scheduleCrnMngr.listCrons()}**`)
          .addField("Information:", "The time is written in 24hr format. \n *__Key:__* __`ID:` `minuteshere hourhere`__\n IDs can be used to edit and delete tasks. \nCheck the command list for more information.")
        message.channel.send({
          embeds: [IDEmbed4]
        });
        /*const IDEmbed5 = new MessageEmbed()
        .setTitle("Suggestions Channel Scrubbing")
        .setColor("BLUE")
        .addField("Scrubbing Suggestions at:", `**${ScrubScheduler.listCrons()}**`)
        .addField("Information:", "The time is written in 24hr format. \n *__Key:__* __`ID:` `minuteshere hourhere`__\n IDs can be used to edit and delete tasks. \nCheck the command list for more information.")
      message.channel.send({
        embeds: [IDEmbed5]
      });*/
      return;
      } 
      else {
        message.channel.send("Nothing is scheduled.")
      }

    }
  }