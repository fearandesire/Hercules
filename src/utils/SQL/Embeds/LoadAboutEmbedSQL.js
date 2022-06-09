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
} from '../../../lib/hercConfig.js';
const logthis = console.log;
container.dbVal = {};

/* ---------------------------------------------- //? Logging into postgreSQL with node-postgres ---------------------------------------------- */
import * as pg from 'pg';
const {
    Pool
} = pg.default

export const AboutEmbedPool = new Pool({
    user: 'postgres',
    host: '144.202.4.112',
    database: 'settings',
    password: '666999',
    port: 5432,
})

export async function LoadAboutEmbedDatabase() {
    logthis(magentaBright(cborder))
    logthis(yellow(bold(`[Database] Querying 'aboutembed' database.`)))
    //? Querying the database for the scoreconfig settings
    const QueryDB = {
        name: 'fetch-aboutembed',
        text: `SELECT * from aboutembed`,
        //? I was originally using this to select just one result invidually, but found it easier for me persoanlly to extract the data I want later.
        // text: `SELECT * from config WHERE id = $1`, //! Select one individual
        //  values: [1],
    }
    //? Setting up a promise so we can properly call the data we need without any script rushing us.
    const poolpromise = new Promise((err, res) => {
        //? @pool an instance of the postgreSQL connection
        AboutEmbedPool.query(QueryDB, (err, res) => {
            if (err) {
                logthis(red(bold(`[DEBUGGING node-postgres QUERY]:`)))
                console.log(err)
            } else {
                logthis(green(bold(`[Database] Successfully accessed 'aboutembed'`)))

                logthis(green(bold(`About Embed Configuration:`)))
                //? This outputs similar to an API call, with a JSON Object that contains an array, with an object inside of it. I only have one row of entries, which are identified with the [1] serial number in SQL
                //? So with that in mind, we will be accessing the response (which is the data from our database) -> accessing a row (#1) { data }
                //? I extract the data here similar to the original game scheduling function, when we were using the rapidnba API.
                var dbAboutEmbedFeatures = res.rows[0].features;
                var dbAboutEmbedDevelopers = res.rows[0].developers
                var dbAboutEmbedCurrentVersion = res.rows[0].currentversion
                var dbAboutEmbedGithub = res.rows[0].github
                var dbAboutEmbedDonateLink = res.rows[0].donateurl
                //* Storing the Embed Data into containers. containers can be used globally with Sapphire.
                /* --------------------------------------------------- */
                container.dbVal[`features`] = dbAboutEmbedFeatures
                container.dbVal[`developers`] = dbAboutEmbedDevelopers
                container.dbVal[`currentversion`] = dbAboutEmbedCurrentVersion
                container.dbVal[`github`] = dbAboutEmbedGithub
                container.dbVal[`donatelink`] = dbAboutEmbedDonateLink
                /* ---------------------------------------------------- */
                //* Logging the DB Result -- aka the text the $about embed will display
                logthis(green(`• Features:\n${dbAboutEmbedFeatures}`))
                logthis(yellow(cborder))
                logthis(green(`• Developers:\n${dbAboutEmbedDevelopers}`))
                logthis(yellow(cborder))
                logthis(green(`• Current Version:\n${dbAboutEmbedCurrentVersion}`))
                logthis(yellow(cborder))
                logthis(green(`• Github:\n${dbAboutEmbedGithub}`))
                logthis(yellow(cborder))
                logthis(green(`• Donate URL:\n${dbAboutEmbedDonateLink}`))
                //AboutEmbedPool.end()
                logthis(magentaBright(cborder))
                logthis(magentaBright(cborder))
            }

        })
    })
}