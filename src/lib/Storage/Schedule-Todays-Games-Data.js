  import { container } from '@sapphire/pieces';
import '@sapphire/plugin-hmr/register';
export const timestamp = new Date();
export const nbagamehours = [];
export const gameobj = {};
export const nbagameinfo = {};
export const gameSchedList = [];
export const gameArrayDelete = []; 
export const LineupResponse = [];

export let currentminutes = timestamp.getMinutes();
export let currenthour = timestamp.getHours();
export let currentseconds = timestamp.getSeconds();
export const parseSecondsv2 = parseInt(currentseconds)
export const parsedMinutes = parseInt(currentminutes) + 1
export let SixSecondsAheadv2 = parseSecondsv2 + 5;
const RightNow = `${parsedMinutes} ${currenthour} * * *`
export { RightNow };
export const daysInTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const TodayDayOfWeek = daysInTheWeek[timestamp.getDay()];
container.TodayDayOfWeek = TodayDayOfWeek
