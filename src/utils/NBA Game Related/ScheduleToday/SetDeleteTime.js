import {
  container
} from '@sapphire/pieces';

export function SetDeleteTime(DTString, CountNBAGames) {

  //? Converting Time to 24HR OBJ
  //? OG = Original aka the time currently listed before we manipulate it
  const OGSplitTime = container.storedOGTime.split(`:`)
  let OGSplitMinutes = parseInt(OGSplitTime[1]);
  let OGSplitHours = parseInt(OGSplitTime[0]);
  //? Converted time to 24HR Format
  let DEmbedHours = OGSplitHours + parseInt(`3`)
  let DEmbedMinutes = OGSplitMinutes + parseInt(`20`);
  container.DEmbedHours = DEmbedHours
  container.DEmbedMinutes = DEmbedMinutes
  //? Correcting hour if we've added it past the 24HR limit
  if (parseInt(DEmbedHours) == parseInt("13")) {
    container.DEmbedHours = parseInt("1");
    container.DEmbedMinutes = container.DEmbedMinutes + ` AM`
    const DEmbedString = `${container.DEmbedHours}:${container.DEmbedMinutes}`
    container.dt = DEmbedString
  } else {
    const DEmbedString = `${container.DEmbedHours}:${container.DEmbedMinutes} PM`

    container.dt = DEmbedString
  }
  //? Converting 24HR Time to Cron Time
  const SplitTime = DTString.split(`:`);
  let SplitMinutes = parseInt(SplitTime[1]);
  let SplitHours = parseInt(SplitTime[0]);
  container.Minutes = SplitMinutes
  container.DeleteHour = parseInt("0");
  if (SplitHours == parseInt("21")) {
    let DeleteHours = parseInt("00")
    let DeleteMinutes = container.Minutes + parseInt("20")
    const DeleteCron = `${DeleteMinutes} ${DeleteHours} * * *`
    return DTString = DeleteCron;
  } else
  if (SplitHours == parseInt("22")) {
    container.DHour = parseInt("01");
    let DeleteHours = parseInt("01")
    let DeleteMinutes = container.Minutes + parseInt("20")
    const DeleteCron = `${DeleteMinutes} ${DeleteHours} * * *`
    return DTString = DeleteCron;
  } else
  if (SplitHours == parseInt("23")) {
    container.DHour = parseInt("02");
    let DeleteHours = parseInt("02")
    let DeleteMinutes = container.Minutes + parseInt("20")
    const DeleteCron = `${DeleteMinutes} ${DeleteHours} * * *`
    return DTString = DeleteCron;
  } else
    try {
      let FinalHour = SplitHours + parseInt("3");
      let FinalMinutes = SplitMinutes + parseInt("20");
      const DeleteCron = `${FinalMinutes} ${FinalHour} * * *`
      return DTString = DeleteCron;
    } finally {
      //logthis(`Delete Time Function complete.`)
    }
}