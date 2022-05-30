import {
  container
} from '@sapphire/framework';
import {
  magentaBright,
  yellow
} from 'colorette';
import 'dotenv/config';
import {
  bold,
  cborder,
  green,
  red
} from '../../lib/hercConfig.js';
const logthis = console.log;
container.dbVal = {};


var dbUser = process.env.SQLusername
var dbIP = process.env.SQLiPAddress
var dbPass = process.env.SQLPass
var dbPort = process.env.SQLPort


//* ACCESSING POSTGRE DB WITH NODE-POSTGRES »»»»»»»»» */
import * as pg from 'pg';
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

export async function LoadNBACScoreCmdData() {
  logthis(magentaBright(cborder))
  logthis(yellow(bold(`[Database] Accessing 'NBAC Score' Database`)))
  //? Querying the database for the scoreconfig settings
  const QueryDB = {
    name: 'fetch-nbacscoreconfig',
    text: `SELECT * from nbacscoreconfig`,
  }
  //? A Promise is required to process these kinds of requests.
  const nodepoolPromise = new Promise((err, res) => {
    //? @nodepool an instance of the postgreSQL connection
    nodepool.query(QueryDB, (err, res) => {
      if (err) {
        logthis(red(bold(`[DEBUGGING]: Database nbacscoreconfig ERROR:`)))
        console.log(err)
      } else {
        logthis(green(bold(`Score Cmd Data:`)))
        //? The return/response here is reminds me of an API call/response.
        var scoremsgval = res.rows[0].dbvalue;
        var scoretoggleval = res.rows[1].dbvalue
        //* Storing the score command settings
        container.dbVal[`scoremsg`] = scoremsgval
        container.dbVal[`scoretoggleval`] = scoretoggleval
        logthis(green(`• Score Message:\n ${scoremsgval}`))
        logthis(yellow(cborder))
        logthis(green(`• Score Toggle:\n ${scoretoggleval}`))
        logthis(magentaBright(cborder))
        logthis(magentaBright(cborder))
        //nodepool.end()
      }

    })
  })
}