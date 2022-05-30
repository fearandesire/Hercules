import {
  yellow
} from 'colorette';
import {
  MessageEmbed
} from 'discord.js';
import {
  SapDiscClient
} from '../../Hercules.js';
import {
  bold
} from '../../lib/hercConfig.js';
import {
  SortScoreEmbedColor
} from '../SortScoreEmbedColor.js';
/**
 @SendGameScore - If the scraped game is Live, Hercules will respond with the Live information for said game -- also making the Embed color the winning teams primary color for pretty formatting.
 @EmbedTitleLive - depricated -- re-designed embed.

 */
 let EmbedTitleLive = "";
 export async function SendGameScore(CurrentChanId, HScore, AwScore, awayTeamEmoji, homeTeamEmoji, AwayTeam, HomeTeam, UserRequestedID, CRScore, EmbedTitleLive) {
   //* CRScore variable stands for 'Current Score'
   console.log(yellow(bold(`Sending Live Game Score`)))
   //? Converting first letter to uppercase for display
   const ChanId = CurrentChanId;
   const sendPing = await SapDiscClient.channels.fetch(ChanId)
   var livescoreFooter = `Type $help to learn more commands. Developed By Fenix#7559`
   sendPing.send(`<@${UserRequestedID}>`)
   var EmbedLiveScoreTitle = `**${awayTeamEmoji} ${AwayTeam} ${AwScore} - ${HomeTeam} ${HScore} ${homeTeamEmoji}**`;
   var EmbedMsgLive = `:green_circle: **Current Quarter**:`
   var EmbedMsgLiveScore = `**${CRScore}**`;
   const ScoreEmbed = new MessageEmbed()
     .setTitle(EmbedLiveScoreTitle)
     .addField(EmbedMsgLive + "\n", EmbedMsgLiveScore)
     //.addField("Minutes In Quarter:", `**${timeingame}**`)
     .setTimestamp()
     .setColor(SortScoreEmbedColor(AwScore, HScore, AwayTeam, HomeTeam))
     .setThumbnail(
       "https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif"
     )
     .setFooter(livescoreFooter);
 
   const chan = await SapDiscClient.channels.fetch(ChanId)
   chan.send({
     embeds: [ScoreEmbed]
   })
   return;
 }