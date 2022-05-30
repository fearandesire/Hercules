import {
  container
} from '@sapphire/pieces';
import express from 'express';
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
import {
  SendEmbedErrorResp
} from './SQL/Embeds/ErrorReplyEmbed.js';
import {
  SendEmbedRespToChannel
} from './SQL/Embeds/SendEmbed.js';
export const app = express();
app.listen(4006, () =>
  console.log('App listening on port 4006!'),
);
/**
 * @screenshotTodaysNBAGames Screenshots ESPN daily NBA schedule. Response/Image can be viewed with the $tg (TodaysGames) command
 */
export async function screenshotTodaysNBAGames(SSTodaysGames, msg) {
  async function SendGameStandingsComplete() {
    var bChannel = container.dbVal[`botChannel`]
    var embedTitle = 'Daily Game Schedule'
    var embedText = 'The NBA schedule has been downloaded. Type $tg to view.'
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
        userDataDir: '../lib/Puppeteer'
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
      logthis(cyanBright("Done - Today's NBA schedule has been downloaded."))
      SendGameStandingsComplete();

    } catch (error) {
      console.log('[DEBUGGING] ERROR when screenshoting game schedule - - Likely there are no Games scheduled today.')
      var bChannel = container.dbVal[`botChannel`]
      var embedText = 'There are no NBA Games on the schedule today.'
      const chan = await SapDiscClient.channels.fetch(bChannel)
      chan.send({
        embeds: [SendEmbedErrorResp(embedText)]
      })
      return;
    }
    return;
  }
  runSG().then(() => {
    if (msg != undefined) {
      msg.edit(`Schedule Image gathered.`)
    }
  })
}