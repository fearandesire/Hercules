import { container } from '@sapphire/framework';
import { scheduleCrnMngr } from '../../lib/hercConfig.js';
import {
    LogGreen, LogRed
} from '../ConsoleLogging.js';
import { LoadGames } from '../LoadGames.js';
export function queGameSchedule(){
    LogGreen(`Queuing Game Scheduling`)
//* Collecting, and then scheduling NBA Games
const GameScheduleTime = container.dbVal[`GameScheduleTime`]
LogRed(`GameScheduleTime: ${GameScheduleTime}`)
 scheduleCrnMngr.add('dailyscheduling', GameScheduleTime, () => {
  LoadGames();
 })
 scheduleCrnMngr.start('dailyscheduling')
}