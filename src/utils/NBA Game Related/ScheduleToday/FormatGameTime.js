import _12FromTo24Hours from '12fromto24hours';
import { container } from '@sapphire/pieces';

export function FormatGameTime(time){
 //LogYellow(`[FormatGames.js] Received Time: ${time}`);
 
  //? Removing the PM from any time at 12:00 so it can convert to 24HR format without an error.
  if (time.substring(0, 2) == 12){
    time = time.slice(0, -2)
  }

  //? The time the game starts (includes AM/PM) - not yet manipulated.
    container.storedOGTime = time;
    //? Splitting time to manipulate
     const SplittingTime = time.split(`:`)
     container.scheduledhour = SplittingTime[0]
     
     //? Adding a zero if it's missing for proper shceduling in 24HR Format. (e.g, 1:00 PM needs to be 01:00 PM to convert with _12to24 pkg)
     if (parseInt(container.scheduledhour) < 10)
     {
         container.newScheduledHour = "0"+container.scheduledhour
     } else 
     { 
      container.newScheduledHour = container.scheduledhour  
    }

     //? Minutes from prior split
     const ScheduledMinutes = SplittingTime[1];
     
     //? Re-assigning our time (variable)
     time = `${container.newScheduledHour}:${ScheduledMinutes}`
     //time = `${container.scheduledhour}:${ScheduledMinutes}`
     //? Converting time to 24 HR format so we can use it with the Cron scheduling.
     const newTime = _12FromTo24Hours(time);
     const Twenty4ToCron = newTime.split(`:`);
     const CronHour = Twenty4ToCron[0];
     const CronMinutes = Twenty4ToCron[1];
     //? Cron Time string setup for us to use.
     const CronTimeString = `${CronMinutes} ${CronHour}`;
     //? Storing to access in another function
     container.storedOGTimeCron = CronTimeString;
    container.storedtime = `${CronHour}:${CronMinutes}`
    return time = CronTimeString

}