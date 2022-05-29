import {
    container
} from '@sapphire/pieces';
import {
    magentaBright,
    yellow
} from 'colorette';
import {
    bold,
    cborder,
    green,
    red
} from '../../lib/hercConfig.js';
const logthis = console.log;
container.dbVal = {};

/* ---------------------------------------------- //? Logging into postgreSQL with node-postgres ---------------------------------------------- */
import * as pg from 'pg';
const {
    Pool
} = pg.default

export const CmdEmbed = new Pool({
    user: 'postgres',
    host: '144.202.4.112',
    database: 'settings',
    password: '666999',
    port: 5432,
})

export async function LoadCmdsEmbedData() {
    logthis(magentaBright(cborder))
    logthis(yellow(bold(`[postgreSQL] Querying 'Cmds Embed Data' database.`)))
    //? Querying the database for the scoreconfig settings
    const quer = {
        name: 'fetch-cmdsembed-data',
        text: `SELECT * from cmdsembed`,
        //? I was originally using this to select just one result invidually, but found it easier for me persoanlly to extract the data I want later.
    }
    //? Setting up a promise so we can properly call the data we need without any script rushing us.
    const poolpromise = new Promise((err, res) => {
        //? @pool an instance of the postgreSQL connection
        CmdEmbed.query(quer, (err, res) => {
            if (err) {
                logthis(red(bold(`[DEBUGGING node-postgres QUERY]:`)))
                console.log(err)
            } else {
                logthis(green(bold(`[postgreSQL] Successfully accessed 'cmdsembed`)))
                logthis(green(bold(`Cmd Embeds Configuration:`)))
                //? This outputs similar to an API call, with a JSON Object that contains an array, with an object inside of it. I only have one row of entries, which are identified with the [1] serial number in SQL
                //? So with that in mind, we will be accessing the response (which is the data from our database) -> accessing a row (#0) { data }
                //? I extract the data here similar to the original game scheduling function, when we were using the rapidnba API.
                var dbScheduleImg = res.rows[0].scheduleimg;
                var dbManageImg = res.rows[0].manageimg
                var dbUtility = res.rows[0].utlityimg
                var dbCore = res.rows[0].coreimg 
                //* Storing the Embed Data into containers. containers can be used globally with Sapphire.
                /* --------------------------------------------------- */
                container.dbVal[`scheduleimg`] = dbScheduleImg
                container.dbVal[`manageimg`] = dbManageImg
                container.dbVal[`currentversion`] = dbUtility
                container.dbVal[`utlityimg`] = dbCore
                /* ---------------------------------------------------- */
                //* Logging the DB Result -- aka the text the $cmds embed will display
                logthis(green(`• Schedule Image:\n${dbScheduleImg}`))
                logthis(yellow(cborder))
                logthis(green(`• Management Image:\n${dbManageImg}`))
                logthis(yellow(cborder))
                logthis(green(`• Utility Image:\n${dbUtility}`))
                logthis(yellow(cborder))
                logthis(green(`• Core Image:\n${dbCore}`))
                logthis(yellow(cborder))
                //AboutEmbedPool.end()
                logthis(magentaBright(cborder))
                logthis(magentaBright(cborder))
            }

        })
    })
}