import { container } from '@sapphire/pieces';
import {
  bold, cborder, cyanBright,
  //? standard
  logthis, magentaBright
} from '../lib/hercConfig.js';

export function SetDeleteTime(DTString, CountNBAGames) {
  /* ----------------------------------------------- //? Splitting & Sorting 12 HR Format for Delete Embed ---------------------------------------------- */
  logthis(magentaBright(cborder))
  logthis(cyanBright(bold(`[Game #${CountNBAGames}  Scheduling]\nGame Starts At:`)))
  logthis(cyanBright(bold(container.storedOGTime)))
  //container.storedOGTime
  const OGSplitTime = container.storedOGTime.split(`:`)
  let OGSplitMinutes = parseInt(OGSplitTime[1]);
  let OGSplitHours = parseInt(OGSplitTime[0]);

  let DEmbedHours = OGSplitHours + parseInt(`3`)

  let DEmbedMinutes = OGSplitMinutes + parseInt(`20`);
  container.DEmbedHours = DEmbedHours
  container.DEmbedMinutes = DEmbedMinutes
  if (parseInt(DEmbedHours) == parseInt("13")) {
    container.DEmbedHours = parseInt("1");
    container.DEmbedMinutes = container.DEmbedMinutes+ ` AM`
    const DEmbedString = `${container.DEmbedHours}:${container.DEmbedMinutes}`
    //logthis(magentaBright(cborder))
    logthis(cyanBright(bold(`Delete Time 4 Embed:\n${DEmbedString}\n---`)))
    container.dt = DEmbedString
  } else {
    const DEmbedString = `${container.DEmbedHours}:${container.DEmbedMinutes} PM`
  //logthis(magentaBright(cborder))
  logthis(cyanBright(bold(`Delete Time 4 Embed:\n${DEmbedString}\n---`)))
  container.dt = DEmbedString
  }

  /* ------------------------------------------------ //? Splitting & Sorting 24HR String to Delete Games ----------------------------------------------- */
  logthis(cyanBright(bold(`D String Being Manipulated: ${DTString}`)))
  const SplitTime = DTString.split(`:`);
  let SplitMinutes = parseInt(SplitTime[1]);
  let SplitHours = parseInt(SplitTime[0]);
  container.Minutes = SplitMinutes
  let DeleteMinutes = parseInt("0");
  let DeleteHours = parseInt("0");
  container.DeleteHour = parseInt("0");
  let DHour = container.DeleteHour
  logthis(cyanBright(bold(`Delete Time B4 Time Added: \`${SplitHours}:${SplitMinutes}\``)))
  if (SplitHours == parseInt("21")) {
    //container.DHour = 00;
    let DeleteHours = parseInt("00")
    let DeleteMinutes = container.Minutes + parseInt("20")
    let DEmbedHour = SplitHours + parseInt("3");
    let DEmbedMinutes = SplitMinutes;
    logthis(cyanBright(bold(`Delete Time (21): \'${DeleteHours}:${DeleteMinutes}\'`)))
    const DeleteCron = `${DeleteMinutes} ${DeleteHours} * * *`
    return DTString = DeleteCron;
  } else
  if (SplitHours == parseInt("22")) {
    container.DHour = parseInt("01");
    let DeleteHours = parseInt("01")
    let DeleteMinutes = container.Minutes + parseInt("20")
    let DEmbedHour = SplitHours + parseInt("3");
    let DEmbedMinutes = SplitMinutes;
    logthis(cyanBright(bold(`Delete Time (22): \'${DeleteHours}:${DeleteMinutes}\'`)))
    const DeleteCron = `${DeleteMinutes} ${DeleteHours} * * *`
    return DTString = DeleteCron;
  } else
  if (SplitHours == parseInt("23")) {
    container.DHour = parseInt("02");
    let DeleteHours = parseInt("02")
    let DeleteMinutes = container.Minutes + parseInt("20")
    let DEmbedHour = SplitHours + parseInt("3");
    let DEmbedMinutes = SplitMinutes;
    logthis(cyanBright(bold(`Delete Time (parseInt("23")): \'${DeleteHours}:${DeleteMinutes}\'`)))
    const DeleteCron = `${DeleteMinutes} ${DeleteHours} * * *`
    return DTString = DeleteCron;
  } else
    try {
      let FinalHour = SplitHours + parseInt("3");
      let FinalMinutes = SplitMinutes + parseInt("20");
      logthis(cyanBright(bold(`Delete Time (Typical): \'${FinalHour}:${FinalMinutes}\'`)))
      const DeleteCron = `${FinalMinutes} ${FinalHour} * * *`
      return DTString = DeleteCron;
    } finally {
    //logthis(`Delete Time Function complete.`)
    }
  // try {
  //   if (SplitHours == 23) {
  //     container.DeleteHour = 1
  //   } else if (SplitHours == 22) {
  //     container.DeleteHour == 1;
  //   } else if (SplitHours == 21) {
  //     container.DeleteHour == 00;
  //   } else {
  //   container.DeleteHour = parseInt(container.DeleteHour) + 3;
  //   }
  // } finally {
  //   DeleteMinutes = SplitMinutes + 20;
  //   DeleteHours = DHour
  //   logthis(cyanBright(bold(`[Game #${container.nbagamecount}  Scheduling]\nDelete Time: \'${DeleteHours}:${DeleteMinutes}\'`)))
  //   container.dt = `${DeleteHours}:${DeleteMinutes}`
  //   const DeleteCron = `${DeleteMinutes} ${DeleteHours} * * *`
  return DTString = DeleteCron;
  //}
}