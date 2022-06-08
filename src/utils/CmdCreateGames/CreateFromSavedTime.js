import {
  container
} from '@sapphire/pieces';
import {
  SapDiscClient
} from '../../Hercules.js';
import { SendEmbedResp } from '../SQL/Embeds/SendEmbed.js';

/**
 * @CreateFromSavedTime function: If $creategame has already been used, this provides a QoL feature to type 'last' as the time input to match the previous.
 * @GameParent - Game Category ID collected from Database
 * @GameChatTopic - Channel Topic to be assigned to the channel - collected from the database
 */
export function CreateFromSavedTime(message, GameParent, GameChatTopic, teamArray, team1, team2){
const SavedGameTime = container.SavedGameTime;
const client = SapDiscClient;
const DatabaseEntry = container.dbVal;
const predictorChan = DatabaseEntry[`PredictorChan`]
//? Splitting the time the game starts to properly schedule it with Cron
 const SeparatingTime = SavedGameTime.split(":");
 const LGTHours = SeparatingTime[0];
 const LGTMins = SeparatingTime[1];
 const crmanager = container.crmngr;
 const title = `${team1}-vs-${team2}`;
 const chanName = `${team1} vs ${team2}`
 const requestedTimeCronFormat = `${LGTMins} ${LGTHours} * * *`
 var embedTitle = 'Schedule Management';
 var embedText = `Creating channel: ${title.toLowerCase()}  at + ${LGTHours}:${LGTMins}`;
 SendEmbedResp(message, embedTitle, embedText)
 crmanager.add(`${title}`, requestedTimeCronFormat, () => {
   const createdChannelv3 = message.guild.channels
     .create(chanName, {
       parent: GameParent,
       topic: GameChatTopic,
     }).then((channel) => {
       const id = channel.id
       console.log(channel.id)
       channel.lockPermissions();
      // const chanID = client.channels.cache.find(channel => channel.name === chanName);
       const randomTeam = teamArray[Math.floor(Math.random() * teamArray.length)];
      // const lowerCaseTeam = randomTeam.toLowerCase();
       const HomeTeamName = team1.toLowerCase();
       const AwayTeamName = team2.toLowerCase();
       const HomeTeamEmoji = client.emojis.cache.find(emoji => emoji.name === `${HomeTeamName}`);
       const AwayTeamEmoji = client.emojis.cache.find(emoji => emoji.name === `${AwayTeamName}`);
       client.channels.cache.get(id).send(`Want to bet on who will win? **Check out <#${predictorChan}>**!`)
       client.channels.cache.get(id).send(`Good luck ${randomTeam}!`).then((message) => {
         message.react(HomeTeamEmoji.id)
         message.react(AwayTeamEmoji.id)
       })
     })
 })
 crmanager.start(title)
return;
}