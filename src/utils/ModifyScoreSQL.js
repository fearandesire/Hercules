import {
  container
} from '@sapphire/framework';
import {
  magentaBright,
  yellow
} from 'colorette';
import {
  bold,
  cborder, green, red
} from '../lib/hercConfig.js';
const logthis = console.log;
container.dbVal = {};


/* ---------------------------------------------- //? Logging into the postgreSQL with node-postgres ---------------------------------------------- */
import * as pg from 'pg';
const {
  Pool
} = pg.default


/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/*                                                              //? Query postgreSQL DB                                                             */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export const pool = new Pool({
  user: 'postgres',
  host: '144.202.4.112',
  database: 'settings',
  password: '666999',
  port: 5432,
})
export async function ModScoreSQL(TrueOrFalse, dbID) {
  container.dbVal[`scoretoggleval`] = TrueOrFalse
  logthis(magentaBright(cborder))
  logthis(yellow(bold(`[postgreSQL] Querying DB to modify Score MSG Value.`)))
  //? Querying the database for the scoreconfig settings
  const quer = {
    name: 'update-scoretoggle'+Math.random(),
    text: `UPDATE scoreconfig SET dbvalue = ${TrueOrFalse} WHERE id = ${dbID}`,
  }
  //? Setting up a promise so we can properly call the data we need without any script rushing us.
  const poolpromise = new Promise((err, res) => {
    //*  An instance of the postgreSQL connection
    pool.query(quer, (err, res) => {
      if (err) {
        logthis(red(bold(`[DEBUGGING node-postgres QUERY]:`)))
        console.log(err)
      } else {
        logthis(green(bold(`[postgreSQL] Score Cmd Updated]:`)))

      }

    })
  })
}