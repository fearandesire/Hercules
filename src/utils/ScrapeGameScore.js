/* eslint-disable no-useless-escape */
/* eslint-disable no-redeclare */
import {
  container
} from '@sapphire/pieces';
import {
  yellow
} from 'colorette';
import puppeteer from 'puppeteer';
import {
  bold,
  cborder,
  logthis,
  magentaBright,
  minimal_args,
  red
} from '../lib/hercConfig.js';
import {
  SendFinishedGameScore
} from './ScoreRelated/SendFinishedEmbed.js';
import {
  SendGameScore
} from './ScoreRelated/SendLiveEmbed.js';

//* Using Puppeteer: I scrape Google's Score API to get an accurate read on live game scores.
//* Working on increasing the response time. As it currently stands at around ~3 seconds. We are spoiled as a society.
//* --------------------------------- */
/** 
 
- @ScrapeScore function: - Scrapes the Home, Away & Current Quarter information for the game it's being requested for, then passes that information into Embeds to display
- @ChanHomeTeam - the Home Team's name - collected from the channel name $score was used in (score.js)
- @ChanAwTeam - the Away Team's name - collected from the channel name $score was used in (score.js)
- @CurrentChanID - ID of channel $score was used from
- @awayTeamEmoji - Away Team's Logo (server should have the emoji)
- @homeTeamEmoji - Home Team's Logo (server should have the emoji)
- @UserRequestedID - the ID of the user who has used the $score command

*/

export async function ScrapeScore(ChanHomeTeam, ChanAwTeam, CurrentChanId, awayTeamEmoji, homeTeamEmoji, UserRequestedID) {
  logthis(magentaBright(cborder))
  logthis(red(bold(`[$score] Scraping Score for ${ChanAwTeam} vs ${ChanHomeTeam}`)))
  logthis(magentaBright(cborder))
  //? Using the channel name to gather the score info for the requested game.
  const ScoreGoogleURL = `http://www.google.com/search?q=${ChanAwTeam}+${ChanHomeTeam}+score`
  const browser = await puppeteer.launch({
    headless: false,
    args: minimal_args,
    userDataDir: '../lib/Puppeteer'
  });
  const page = await browser.newPage();
  await page.goto(
    ScoreGoogleURL, {
      waitUntil: 'domcontentloaded'
    }
  );
  //* ⁡⁢⁣⁣𝗛𝗢𝗠𝗘 𝗦𝗖𝗢𝗥𝗘 𝗗𝗜𝗩⁡ // ⁡⁢⁣⁣𝗖𝗢𝗟𝗟𝗘𝗖𝗧𝗜𝗡𝗚 𝗛𝗢𝗠𝗘 ⁡⁢⁣⁣𝗦𝗖𝗢𝗥𝗘⁡⁡⁡ »»»»»»»»»»» */
  let hScoreSelector = await page.$(`#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__tm-a-sts > div.imso_mh__wl.imso-ani.imso_mh__tas > div > div.imso_mh__scr-sep > div > div.imso_mh__r-tm-sc.imso_mh__scr-it.imso-light-font`)
  let HOMESCORE = await page.evaluate(el => el.textContent, hScoreSelector)
  container.HomeScore = HOMESCORE;
  const GlobalHomeScore = container.HomeScore
  //* ««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««« */

  //? Debugging /  Logging purposes. Likely to get hashed out/removed

  logthis(red(bold(`[$score] Logged HOME SCORE: ${GlobalHomeScore}`)))

  //* ⁡⁢⁣⁣𝗔𝗪𝗔𝗬 𝗦𝗖𝗢𝗥𝗘 𝗗𝗜𝗩⁡ // ⁡⁢⁣⁣𝗖𝗢𝗟𝗟𝗘𝗖𝗧𝗜𝗡𝗚 𝗔𝗪𝗔𝗬 𝗦𝗖𝗢𝗥𝗘⁡ »»»»»»»»»»»»»»» */
  let AwayScoreSelector = await page.$('#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__tm-a-sts > div.imso_mh__wl.imso-ani.imso_mh__tas > div > div.imso_mh__scr-sep > div > div.imso_mh__l-tm-sc.imso_mh__scr-it.imso-light-font')
  let AWAYSCORE = await page.evaluate(el => el.textContent, AwayScoreSelector)
  container.AwayScore = AWAYSCORE;
  const GlobalAwayScore = container.AwayScore
  logthis(red(bold(`[$score] Logged AWAY SCORE: ${GlobalAwayScore}`)))
  //* ««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««« */

  //* TEAM NAMES TO UPPERCASE FOR EMBED DISPLAYING »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»» */
  //? JSON.stringify will place '' quotes around the team names. Using regex to clear those so it can be displayed
  var AwayTeamNameQuotedString = JSON.stringify(ChanAwTeam)
  var HomeTeamNameQuotedString = JSON.stringify(ChanHomeTeam)
  var ATeamName = AwayTeamNameQuotedString.replace(/\"/g, "")
  var HTeamName = HomeTeamNameQuotedString.replace(/\"/g, "")
  const AwayTeam = ATeamName.charAt(0).toUpperCase() + ATeamName.slice(1);
  const HomeTeam = HTeamName.charAt(0).toUpperCase() + HTeamName.slice(1);
  //* ««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««« */

  /**
   - @QuarterSelectorLive This DIV contains the current time in the game/quarter. When called on a game that is done, it will return 'Final'
   - @GlobalCurrentQuarter will hold the current quarter / status of the game. Either holding the current quarter, or the 'Final' response
   */

  //* SCRAPING CURRENT QUARTER »»»»»»»»»»»» */
  let QuarterSelector = await page.$(`#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__stts-l.imso-ani.imso_mh__stts-l-cont > div > span`)
  let ScrapedQuarter = await page.evaluate(el => el.textContent, QuarterSelector)
  if (ScrapedQuarter == 'NBA') {
    logthis(red(bold(`[$score] The wrong selector was grabbed. Scraping the correct one`)))
    let QuarterSelectorLive = await page.$(`#sports-app > div > div.imso-hov.imso-mh > div:nth-child(2) > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__stts-l.imso-ani.imso_mh__stts-l-cont > div > div`)
    let ScrapedQuarter = await page.evaluate(el => el.textContent, QuarterSelectorLive)
    container.QTRorFinal = ScrapedQuarter;
  } else {
    logthis(red(bold(`[$score] Game: ${AwayTeam} vs. ${HomeTeam} was scraped as a complete game.`)))
    container.QTRorFinal = ScrapedQuarter;
  }
  const GlobalCurrentQuarter = container.QTRorFinal;
  logthis(red(bold(`[$score] Quarter Scraped: ${GlobalCurrentQuarter}`)))
  //? Game Over: Send Finished Game Embed
  if (GlobalCurrentQuarter == 'Final') {
    logthis(magentaBright(cborder))
    logthis(yellow(bold(`[$score] Queing 'Finished' Embed for ${ChanAwTeam} vs. ${ChanHomeTeam}`)))
    SendFinishedGameScore(CurrentChanId, GlobalHomeScore, GlobalAwayScore, awayTeamEmoji, homeTeamEmoji, AwayTeam, HomeTeam, UserRequestedID)
    await browser.close();
    return;
  } else {
    //? Game Live: Send Live Score Embed
    logthis(red(bold(`Sending A Live Game's score with the following values:\n${HomeTeam} ${GlobalHomeScore} - ${AwayTeam} ${GlobalAwayScore}`)))
    SendGameScore(CurrentChanId, GlobalHomeScore, GlobalAwayScore, awayTeamEmoji, homeTeamEmoji, AwayTeam, HomeTeam, UserRequestedID, GlobalCurrentQuarter)
    await browser.close();
    return;
  }

}