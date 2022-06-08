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


export async function LoadLocalScoreCmdData() {
  logthis(magentaBright(cborder))
  logthis(yellow(bold(`[Database] Accessing 'Local Score' Database`)))
/**
 - @QueryDB - settings to query the postgreSQL server
 - @var -- name: titling the query in postgreSQL
 - @var -- text: the command/request to query the postgreSQL with

 */
  const QueryDB = {
    name: 'fetch-scoremsg',
    text: `SELECT * from localscoreconfig`,
  }
  //? A Promise is required to process these kinds of requests.
  const nodepoolPromise = new Promise((err, res) => {

    nodepool.query(QueryDB, (err, res) => {
      if (err) {
        logthis(red(bold(`[DEBUGGING]: localscoreconfig Database ERROR:`)))
        console.log(err)
      } else {
        logthis(green(bold(`Score Cmd Data:`)))
        //? The return/response here is reminds me of an API call/response.
        var scoremsgval = res.rows[0].dbvalue;
        var scoretoggleval = res.rows[1].dbvalue
        //* Storing the score command settings into global variables
        container.dbVal[`scoremsg`] = scoremsgval
        container.dbVal[`scoretoggleval`] = scoretoggleval
        logthis(green(`• Score Message:\n ${scoremsgval}`))
        logthis(yellow(cborder))
        logthis(green(`• Score Toggle:\n ${scoretoggleval}`))
        logthis(magentaBright(cborder))
        logthis(magentaBright(cborder))
        //nodepool.end() // (nodepool should stay open) 
      }

    })
  })
}