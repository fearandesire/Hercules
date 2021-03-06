import {
  container
} from '@sapphire/pieces';
import express from 'express';
import now from 'performance-now';
import puppeteer from 'puppeteer';
import {
  SapDiscClient
} from '../Hercules.js';
import {
  cborder,
  cyanBright,
  logthis,
  magentaBright
} from '../lib/hercConfig.js';
import { LogBorder, LogCyan } from './ConsoleLogging.js';
import { ReturnPerformance } from './PerformanceLogger.js';
import {
  ReturnScheduleEmbedErrorResp
} from './Send Embeds/ErrorReplyEmbed.js';
import {
  SendEmbedRespToChannel
} from './Send Embeds/SendEmbed.js';
export const app = express();
app.listen(4006, () =>
  console.log('App listening on port 4006!'),
);

/**
 - @screenshotTodaysNBAGames Screenshots ESPN daily NBA schedule. Response/Image can be viewed with the $tg (TodaysGames) command.
 - @container.scheduleValidated -- A Global Container/Variable that is used to verify if Hercules was successful in collecting the Game Schedule Image.
   Hercules scrapes from the table that contains the NBA Games on ESPN ( DIV: @GameTable ). If it fails to do so, it's likely that there are no games going on for that day.
 */

export async function screenshotTodaysNBAGames(SSTodaysGames, msg) {
  //? Performance Stats
  const start = now();
  async function SendSuccessfulEmbed() {
    var bChannel = container.dbVal[`botChannel`]
    var embedTitle = 'Daily Game Schedule'
    var embedText = 'The NBA schedule has been collected. Type $tg to view.'
    var targetChannel = bChannel
    SendEmbedRespToChannel(embedTitle, embedText, targetChannel)
    return;
  }
  logthis(
    magentaBright(
      cborder));

  let TodaysNewDate = new Date();
  let TodaysDay = String(TodaysNewDate.getDate()).padStart(2, "0");
  let TodaysMonth = String(TodaysNewDate.getMonth() + 1).padStart(2, "0"); // Jan is 0.
  let TheCurrentYear = TodaysNewDate.getFullYear();
  let CurrentFullDate = `${TheCurrentYear}${TodaysMonth}${TodaysDay}`;
  logthis(cyanBright("Collecting the screenshot for today's NBA Games."));
  //* Launching Puppeteer
  const runSG = async () => {
    try {
      const browserSG = await puppeteer.launch({
        headless: false,
        userDataDir: '../../src/lib/Puppeteer'
      });
      const pageSG = await browserSG.newPage();
      await pageSG.goto(

        "https://www.espn.com/nba/schedule/_/date/" + CurrentFullDate
      );
      //await pageSG.waitForSelector('#fittPageContainer > div:nth-child(4) > div > div > section > div > div:nth-child(3) > div:nth-child(1)')
      const GameTable = await pageSG.$(`#fittPageContainer > div:nth-child(4) > div > div > section > div > div:nth-child(3) > div:nth-child(1)`)
      await GameTable.screenshot({
        'path': '../src/gameimages/tgnba.jpg',
      });
      await browserSG.close();
      LogCyan(`[ScreenshotOperation.js] Screenshot for today's NBA Games has been collected.`);
      SendSuccessfulEmbed();
      ReturnPerformance(start, 'ScreenshotOperation.js');
      container.scheduleValidated = 'true';
    } catch (error) {
      container.scheduleValidated = 'false';
      LogBorder(`[ScreenshotOperation.js] Error: No games were found for today.`)
      var bChannel = container.dbVal[`botChannel`]
      var embedText = 'There are no NBA Games on the schedule today. Schedule Image will be unavailable.'
      const chan = await SapDiscClient.channels.fetch(bChannel)
      chan.send({
        embeds: [ReturnScheduleEmbedErrorResp(embedText)]
      })
      return;
    }
    return;
  }
  runSG().then(() => {
    if (msg != undefined) {
      msg.edit(`Schedule Image collected.`)
    }
  })
}