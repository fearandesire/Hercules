import { container, Listener } from '@sapphire/framework';
import {
  GameScheduleTime, scheduleCrnMngr, SSTodaysGames, StandingsSSTime
} from '../lib/hercConfig.js';
import {
  dailystandings
} from '../utils/DailyGameStandings.js';
import { LoadGames } from '../utils/LoadGames.js';
import {
  screenshotTodaysNBAGames
} from '../utils/ScreenshotOperation.js';
container.dbVal = {};
const logthis = console.log;
export class ReadyListener extends Listener {
  run(SapDiscClient) {
    const {
      username,
      id
    } = SapDiscClient.user;
  }
}

/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/*                                                //! NBA Games, Standings & Schedule data daily gathering.                                               */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */

// //* Gathering NBA ⁡⁢⁣⁣S͟T͟A͟N͟D͟I͟N͟G͟S⁡ Image
dailystandings(StandingsSSTime)
// //* Gathering NBA ⁡⁣⁢⁢⁡⁣⁢⁣S͟C͟H͟E͟D͟U͟L͟E⁡ Image
const gatherGamesManager =  container.dailyGameSS;
gatherGamesManager.add(`gathergames1`, SSTodaysGames, () => {
  screenshotTodaysNBAGames(SSTodaysGames)
})
gatherGamesManager.start(`gathergames1`)
// //* Gathering, and then scheduling NBA Games
 scheduleCrnMngr.add('dailyscheduling', GameScheduleTime, () => {
  LoadGames();
 })
 scheduleCrnMngr.start('dailyscheduling')
logthis(`readyjs loaded`)