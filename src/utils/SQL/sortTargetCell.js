import { ModifyScheduleTime } from "./ModifyScheduleTimes.js";

//? designated target cell sorting for adjustTimers.js

export function sortTargetCell(TargetCell, NewCronTime, message){
    TargetCell = TargetCell.toLowerCase();
    if (TargetCell === "games"){
        TargetCell = 'GameScheduleTime';
        ModifyScheduleTime(TargetCell, NewCronTime, message);
        return; 
    }
    if (TargetCell === "standings"){
        TargetCell = 'StandingsSSTime';
        ModifyScheduleTime(TargetCell, NewCronTime, message);
        return;
    }
    if (TargetCell === 'todaysgames'){
        TargetCell = 'SSTodaysGames';
        ModifyScheduleTime(TargetCell, NewCronTime, message);
        return;
    }
}