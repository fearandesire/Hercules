import { container } from '@sapphire/framework';
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/*                                                                   Grabbing Date                                                                  */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
let TodaysNewDate = new Date();
let TodaysDay = String(TodaysNewDate.getDate()).padStart(2, "0");
let TodaysMonth = String(TodaysNewDate.getMonth() + 1).padStart(2, "0");
let TheCurrentYear = TodaysNewDate.getFullYear();
let CurrentFullDate = `${TheCurrentYear}${TodaysMonth}${TodaysDay}`;

/* ---------------------------------------------------------------------------- //? Objects and Arrays setup for us to store, retrieve, and manipulate the teams and start time data that we've scraped for game scheduling. --------------------------------------------------------------------------- */
container.HomeTeamList = [];
container.AwayTeamList = [];
container.HomeTeamObject = {};
container.AwayTeamObject = {};
container.StartTimeArray = [];
//container.logthis = console.log;
container.teamNickNames = [];
container.levelsObject = {};
container.levelsObject[`teams`] = {};
container.HomeTeamObject[`teams`] = {};
container.AwayTeamObject[`teams`] = {};
container.HomeAndAwayTeams = {};
container.HomeAndAwayTeams[`teams`] = {};
container.GameStartTime = {};

//? Regex to match any time found in the table data that we scraped. And .match returns an array of results, so we can access it without any more work.
const timesearch = /(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)(?:[000-999]) (AM|am|aM|Am|PM|pm|pM|Pm)/gm;

//


export {
    CurrentFullDate, timesearch
};
