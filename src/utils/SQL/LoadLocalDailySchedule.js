import {
  container
} from '@sapphire/framework';
import 'dotenv/config';
import { LogBorder, LogGreen, LogRed, LogYellow } from '../ConsoleLogging.js';
container.dbVal = {};
var dbUser = process.env.SQLusername
var dbIP = process.env.SQLiPAddress
var dbPass = process.env.SQLPass
var dbPort = process.env.SQLPort

//* ACCESSING POSTGRE DB WITH NODE-POSTGRES »»»»»»»»» */
import * as pg from 'pg';
import { queScreenshotStandings } from '../QueDailyScheduling/quedailystandings.js';
import { queGameSchedule } from '../QueDailyScheduling/quegameSchedule.js';
import { queGameImage } from '../QueDailyScheduling/queSSGameImage.js';
import { LogBlue } from './../ConsoleLogging.js';
const {
  Pool
} = pg.default
export const nodepool = new Pool({
  user: dbUser,
  host: dbIP,
  database: 'settings',
  password: dbPass,
  port: dbPort
})


export async function LoadDailySchedule() {
  LogBorder()
  LogYellow(`[LoadLocalDailySchedule.js] Loading Daily Schedule from Database`)
/**
 - @QueryDB - settings to query the postgreSQL server

 */
  const QueryDB = {
    name: 'fetch-nbacdailytimers',
    text: `SELECT * from nbacdailytimers`,
  }
  //? A Promise is required to process these kinds of requests.
  const nodepoolPromise = new Promise((err, res) => {

    nodepool.query(QueryDB, (err, res) => {
      if (err) {
        LogRed(`[LoadLocalDailySchedule.js] Error: ${err}`)
        console.log(err)
      } else {
       LogGreen(`[LoadLocalDailySchedule.js] Successfully loaded nbacdailytimers table from Database`)
        
        var GameScheduleTime = res.rows[0].GameScheduleTime;
        var StandingsSSTime = res.rows[0].StandingsSSTime
        var SSTodaysGames = res.rows[0].SSTodaysGames
        var ScheduleVerifyTime = res.rows[0].ScheduleVerifyTime
        //* Storing the score command settings into global variables
        container.dbVal[`GameScheduleTime`] = GameScheduleTime
        container.dbVal[`StandingsSSTime`] = StandingsSSTime
        container.dbVal[`SSTodaysGames`] = SSTodaysGames
        container.dbVal[`ScheduleVerifyTime`] = ScheduleVerifyTime
        LogBorder();
        LogGreen(`Daily Schedule Times:`)
        LogBlue(`
        GameScheduleTime: ${GameScheduleTime} \n 
        StandingsSSTime: ${StandingsSSTime} \n 
        SSTodaysGames: ${SSTodaysGames} \n 
        ScheduleVerifyTime: ${ScheduleVerifyTime}`)
        LogBorder();

        queGameImage();

        queGameSchedule();

        queScreenshotStandings();
        //nodepool.end() // (nodepool should stay open) 
      }

    })
  })
}