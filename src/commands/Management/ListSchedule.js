import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
import {
  LogYellow
} from '../../utils/ConsoleLogging.js';
import { sendAutoSchEmbed } from '../../utils/Send Embeds/SendAutoSchEmbed.js';
import { sendCRSchEmbed } from '../../utils/Send Embeds/SendCRSchedule.js';
import {
  SendEmbedResp
} from '../../utils/Send Embeds/SendEmbed.js';

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
    
    var gameSchedTorF = Array.isArray(gameSchedList) ? true : false;
    var CRgameSchedTorF = Array.isArray(CrSchedList) ? true : false;
    LogYellow(`gameSchedList: ${gameSchedList}`)
    LogYellow(`Array.isArray(gameSchedList): ${gameSchedTorF}`)
    if (gameSchedTorF === false || gameSchedList.length === 0 && CRgameSchedTorF === false || CrSchedList.length === 0) {
      var embedTitleNoGames = 'Schedule Information';
      var embedTextNoGames = `No games are currently scheduled by Hercules or manually.`;
      SendEmbedResp(message, embedTitleNoGames, embedTextNoGames)
      return;
    }
    //? Response if there are no games that have been scheduled with $cr or by Hercules
    if (gameSchedList.length > 0 && CrSchedList.length === 0) {
      sendAutoSchEmbed(message);
      return;
    } else
    if (gameSchedList.length === 0 && CrSchedList.length > 0) {
      sendCRSchEmbed(message);
      return;
    }
    
}
}