//INSERT INTO products (product_no, name, price) VALUES (1, 'Cheese', 9.99);

import {
  container
} from '@sapphire/framework';
import 'dotenv/config';
import {
  bold,
  cborder,
  green, magentaBright, red, redBright, underline, yellow
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

export async function AddToUsageStats(InputUserID, SQLTargetTable, commandsource) {

  var verifyserver = container.WhichServer;
  logthis(green(underline(`[Usage Stats]: Storing into ${verifyserver} Database.`)))

  if (verifyserver == 'NBAC') {
    container.SQLdb = 'nbacusagestats'
  } else {
    container.SQLdb = 'localusagestats'
  }
  let SQLdb = container.SQLdb;
  const UsagePool = new Pool({
    user: dbUser,
    host: dbIP,
    database: SQLdb,
    password: dbPass,
    port: dbPort
  })

  logthis(magentaBright(cborder))
  logthis(yellow(bold(`[Usage Stats] Querying ${container.SQLdb} to store usage stats`)))
  
  /**
 - @QueryDB - settings to query the postgreSQL server
 - @var -- name: titling the query in postgreSQL
 - @var -- text: the command/request to query the postgreSQL with
 */
  const QueryDB = {
    name: 'add-to-usage-stats',
    text: `INSERT INTO ${SQLTargetTable} (userid, commandname) VALUES (${InputUserID}, '${commandsource}');`,
  }
  //? A Promise is required to process these kinds of requests.
  const UsagePoolPromise = new Promise((err, res) => {
    UsagePool.query(QueryDB, (err, res) => {
      if (err) {
        logthis(redBright(bold(cborder)))
        logthis(red(bold(`[DEBUGGING]: ${SQLTargetTable} Database ERROR:`)))
        console.log(err)
        logthis(redBright(bold(cborder)))
      } else {
        logthis(green(bold(`[Usage Stats] Added user to usage stats: ${InputUserID} - Command // Source: ${commandsource}`)))
        logthis(magentaBright(cborder))
      }

    })
  })
}

/*
  SELECT 
   COUNT(userid) 
FROM localusagestats
*/