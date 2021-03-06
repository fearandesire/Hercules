import {
  container
} from '@sapphire/pieces';
import express from 'express';
import now from 'performance-now';
import puppeteer from 'puppeteer';

import {
  cborder,
  cyanBright,
  logthis,
  magentaBright
} from '../../lib/hercConfig.js';
import {
  ReturnPerformance
} from '../PerformanceLogger.js';
import {
  SendEmbedRespToChannel
} from '../Send Embeds/SendEmbed.js';
export const app = express();
app.listen(4005, () =>
  console.log('App listening on port 4005!'),
);
//? Loads the cron manager for daily standings
const dailyStandingsManager = container.dailyStandings;
//? Performance Stats Counter
export async function dailystandings(StandingsSSTime) {
  //? Performance Stats
  const start = now();
  dailyStandingsManager.add("Daily Standings", StandingsSSTime, () => {
    logthis(
      magentaBright(
        cborder));
    logthis(cyanBright("Collecting current NBA Standings"));
    //* opens ESPN Standings page
    const standingasync = async () => {
      const standingsBrowserSG = await puppeteer.launch();
      const standingsPage = await standingsBrowserSG.newPage();
      await standingsPage.goto(
        "https://www.espn.com/nba/standings/_/sort/gamesbehind/dir/asc"
      );
      await standingsPage.waitForSelector("#espnfitt"); // wait for the selector to load
      const standingsLOGO = await standingsPage.$("#espnfitt"); // declare a variable with an ElementHandle
      const boxSG2 = await standingsLOGO.boundingBox();
      //* takes a screenshot with the dimensions provided. screenshotting twice to get west and east!
      await standingsPage.screenshot({
        path: "./gameimages/eaststandings.jpg",
        clip: {
          x: 36,
          y: 426,
          width: 716,
          height: 475
        },
      });
      await standingsPage.screenshot({
        path: "./gameimages/weststandings.jpg",
        clip: {
          x: 50,
          y: 900,
          width: 716,
          height: 475
        },
      });
      await standingsBrowserSG.close();
      logthis(
        magentaBright(
          cborder));
      logthis(cyanBright("Standings images gathered."));

      async function SendGameStandingsComplete() {
        var bChannel = container.dbVal[`botChannel`]
        var embedTitle = 'Daily Standings'
        var embedText = 'NBA Standings downloaded. To view, type: $standings, $standings west, $standings east'
        var targetChannel = bChannel
        SendEmbedRespToChannel(embedTitle, embedText, targetChannel)
        ReturnPerformance(start, 'DailyGameStandings')
        return;
      }
      SendGameStandingsComplete();
    };
    standingasync();
  });
  app.listen(301);
  dailyStandingsManager.start("Daily Standings")
}