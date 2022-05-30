import {
    green,
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
    SortScoreEmbedColor,
    WhoWon
} from '../SortScoreEmbedColor.js';
  

/**
 @SendFinishedGameScore - If the scraped game data shows that it is finished, Hercules will respond with the winner & score from that finished game, while explicitly stating it is finished.
 @EmbedMsg - Defining to use within the SendFinishedGameScore function.
 @sendEmojiCircle - Not used currently as I have re-designed the Embed.
 */

 let EmbedMsg = "";
 export async function SendFinishedGameScore(CurrentChanId, HScore, AwScore, awayTeamEmoji, homeTeamEmoji, AwayTeam, HomeTeam, UserRequestedID, EmbedMsg) {
   console.log(yellow(bold(`Sending Finished Game Score`)))
   //var AdditionalLine = "Who did you have to win?"
   const ChanId = CurrentChanId;
   const sendPing = await SapDiscClient.channels.fetch(ChanId)
   var finishedfooter = `Type $help to learn more commands. Hercules - Developed By Fenix#7559`
   //? For some reason, 
   sendPing.send(`<@${UserRequestedID}>`)
   var EmbedTitle = `**${awayTeamEmoji} ${AwayTeam} ${AwScore} - ${HomeTeam} ${HScore} ${homeTeamEmoji}**`;
   EmbedMsg = `**Final Score**`;
   if (WhoWon(AwScore, HScore) == `Away`) {
     console.log(green(bold(`AWAY TEAM VICTORY`)))
     EmbedMsg = `**:red_circle: Game Over - The ${AwayTeam} won!**`
   }
   if (WhoWon(AwScore, HScore) == `Home`) {
     console.log(green(bold(`HOME TEAM VICTORY`)))
     EmbedMsg = `**:red_circle: Game Over - The ${HomeTeam} won!**`
   }
   const ScoreEmbed = new MessageEmbed()
     .setTitle(EmbedTitle)
     .addField("**Current Quarter:**" + "\u200B", EmbedMsg)
     .setTimestamp()
     .setColor(SortScoreEmbedColor(AwScore, HScore, AwayTeam, HomeTeam))
     .setThumbnail(
       "https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif"
     )
     .setFooter(finishedfooter);
 
   const chan = await SapDiscClient.channels.fetch(ChanId)
   chan.send({
     embeds: [ScoreEmbed]
   })
   return;
 }