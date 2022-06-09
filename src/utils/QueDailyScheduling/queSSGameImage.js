import { container } from "@sapphire/framework";
import {
  LogGreen, LogRed
} from '../ConsoleLogging.js';
import { screenshotTodaysNBAGames } from "../ScreenshotOperation.js";
export function queGameImage(){
  LogGreen(`Queuing Game Schedule Image Screenshot`)
const SSTodaysGames = container.dbVal[`SSTodaysGames`]    
LogRed(`SSTodaysGames: ${SSTodaysGames}`)
//* Collecting NBA ⁡⁣⁢⁢⁡⁣⁢⁣S͟C͟H͟E͟D͟U͟L͟E⁡ Image
const gatherGamesManager =  container.dailyGameSS;
gatherGamesManager.add(`gathergames1`, SSTodaysGames, () => {
  screenshotTodaysNBAGames(SSTodaysGames)
})
gatherGamesManager.start(`gathergames1`)

}