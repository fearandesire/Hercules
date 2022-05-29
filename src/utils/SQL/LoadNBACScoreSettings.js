import {
} from '@sapphire/framework';
import {
  magentaBright,
  yellow,
} from 'colorette';
import {
  green,
  bold,
  cborder,
  red
} from '../../lib/hercConfig.js';
const logthis = console.log;
container.dbVal = {};
import {
  container
} from '@sapphire/framework';


//? This module is intended to connect to the postgreSQL database. 
//? Separate modules will be setup to individually load, and store the database into containers as a form of virtually-stored data.
//? The goal is to not only challenge myself into learning SQL, but to also provide a way to use Hercules across multiple servers.

//? Login URL


/* ---------------------------------------------- //? Logging into the postgreSQL with node-postgres ---------------------------------------------- */
import * as pg from 'pg'
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
export async function LoadNBACScoreCmdData() {
  logthis(magentaBright(cborder))
  logthis(yellow(bold(`[Database] Accessing 'NBAC Score' Database`)))
  //? Querying the database for the scoreconfig settings
  const quer = {
    name: 'fetch-scoremsg',
    text: `SELECT * from nbacscoreconfig`,
    //? I was originally using this to select just one result invidually, but found it easier for me persoanlly to extract the data I want later.
    //text: `SELECT * from scoreconfig`, 
    //  values: [0], //* Select one individual cell
  }
  //? Setting up a promise so we can properly call the data we need without any script rushing us.
  const poolpromise = new Promise((err, res) => {
    //? @pool an instance of the postgreSQL connection
    pool.query(quer, (err, res) => {
      if (err) {
        logthis(red(bold(`[DEBUGGING node-postgres QUERY]: Database ERROR:`)))
        console.log(err)
      } else {
        //logthis(green(bold(`[postgreSQL] Score Cmd Data Query Successful]`)))

        logthis(green(bold(`Score Cmd Data:`)))
        //? This outputs similar to an API call, with a JSON Object that contains an array, with an object inside of it.
        //? I extract the data here similar to the original game scheduling function, when we were using the rapidnba API.
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
        //pool.end() //* Turns out we don't need to end the pool. Especially as we need it to stay open to query later on.
      }

    })
  })
}
