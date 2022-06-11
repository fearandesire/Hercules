import {
  container
} from '@sapphire/framework';
import {
  LogGreen, LogRed
} from '../../ConsoleLogging.js';
import {
  dailystandings
} from '../DailyGameStandings.js';
export function queScreenshotStandings() {
    LogGreen(`Queuing Daily Standings Screenshot`)
    //* Collecting NBA ⁡⁢⁣⁣S͟T͟A͟N͟D͟I͟N͟G͟S⁡ Image
    const StandingsSSTime = container.dbVal[`StandingsSSTime`]
    LogRed(`StandingsSSTime: ${StandingsSSTime}`)
    dailystandings(StandingsSSTime)


}