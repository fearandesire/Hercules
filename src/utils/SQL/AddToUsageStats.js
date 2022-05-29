//INSERT INTO products (product_no, name, price) VALUES (1, 'Cheese', 9.99);

import {
  container
} from '@sapphire/framework';
import {
  magentaBright,
  yellow
} from 'colorette';
import {
  bold,
  cborder,
  green,
  red,
  underline
} from '../../lib/hercConfig.js';
const logthis = console.log;
container.dbVal = {};

/* ---------------------------------------------- //? Logging into the postgreSQL with node-postgres ---------------------------------------------- */
import * as pg from 'pg';
const {
  Pool
} = pg.default


const SQLdb = container.SQLdb;
export async function AddToUsageStats(InputUserID, SQLTargetTable, commandsource, SQLdb) {
  //* Two different pools variables (really, only changing the database) - one that will be assumed for NBAC, and if not, local (my server) database will be selected instead.
  // var SQLuser = `postgres`;
  // var SQLhost = `144.202.4.112`
  // let SQLdb = `localusagestats`
  // var SQLport = `5432`
  var verifyserver = container.WhichServer;
  logthis(green(underline(`[DEBUGGING]: WHICH SERVER: ${verifyserver}`)))

  if (verifyserver == 'NBAC') {
    container.SQLdb = 'nbacusagestats'
  } else {
    container.SQLdb = 'localusagestats'
  }
  const UsagePool = new Pool({
    user: 'postgres',
    host: '144.202.4.112',
    database: container.SQLdb,
    password: '666999',
    port: 5432,
  })

  logthis(magentaBright(cborder))
  logthis(yellow(underline(`[postgreSQL] Querying ${container.SQLdb} to store usage stats`)))

  //? Querying the database for the scoreconfig settings
  const quer = {
    name: 'add-to-usage-stats',
    text: `INSERT INTO ${SQLTargetTable} (userid, commandname) VALUES (${InputUserID}, '${commandsource}');`,
    //? I was originally using this to select just one result invidually, but found it easier for me persoanlly to extract the data I want later.
  }
  //? Setting up a promise so we can properly call the data we need without any script rushing us.
  const poolpromise = new Promise((err, res) => {
    //? @pool an instance of the postgreSQL connection
    UsagePool.query(quer, (err, res) => {
      if (err) {
        logthis(red(bold(`[DEBUGGING node-postgres QUERY]:`)))
        console.log(err)
      } else {
        logthis(green(bold(`[Usage Stats] Added user to usage stats: ${InputUserID} - Command/Source: ${commandsource}`)))
        // logthis(green(`Score Toggle:\n ${scoretoggleval}`))
        // UsagePool.end()
        logthis(magentaBright(cborder))
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