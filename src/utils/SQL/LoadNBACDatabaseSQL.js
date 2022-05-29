import {
    container
  } from '@sapphire/pieces';
  import {
      magentaBright,
      yellow
  } from 'colorette';
  import {
      bold,
      cborder, green, red
  } from '../../lib/hercConfig.js';
    const logthis = console.log;
    container.dbVal = {};
  
    
    
    /* ---------------------------------------------- //? Logging into the postgreSQL with node-postgres ---------------------------------------------- */
    import * as pg from 'pg';
    const {
      Pool
    } = pg.default
    
  export const SecondPool = new Pool({
      user: 'postgres',
      host: '144.202.4.112',
      database: 'settings',
      password: '666999',
      port: 5432,
    })
  
    //* This Query will be to store most of the server settings from the database -> virtually into Hercules
    
  export async function LoadNBAChatDatabase() {
      logthis(magentaBright(cborder))
      logthis(yellow(bold(`[postgreSQL] Loading NBA Chat Database..`)))
      //? Querying the database for the scoreconfig settings
      const quer = {
        name: 'fetch-scoremsg',
        text: `SELECT * from localserversettings`,
        //? I was originally using this to select just one result invidually, but found it easier for me persoanlly to extract the data I want later.
        // text: `SELECT * from config WHERE id = $1`, //! Select one individual
        //  values: [1],
      }
      //? Setting up a promise so we can properly call the data we need without any script rushing us.
      const poolpromise = new Promise((err, res) => {
        //? @pool an instance of the postgreSQL connection
        SecondPool.query(quer, (err, res) => {
          if (err) {
            logthis(red(bold(`[DEBUGGING node-postgres QUERY] ERROR:`)))
            console.log(err)
          } else {
            logthis(green(bold(`[postgreSQL] NBA Chat Database Successfully Accessed`)))
    
            logthis(green(bold(`Server Settings:`)))
            //? This outputs similar to an API call, with a JSON Object that contains an array, with an object inside of it.
            //? I extract the data here similar to the original game scheduling function, when we were using the rapidnba API.
            var dbbotChannel = res.rows[1].botChannel;
            var dbGameChannelTopic = res.rows[1].GameChanTopic
            var dbGameParent = res.rows[1].GameParent
            var dbPredictorChan = res.rows[1].PredictorChan
            var dbPredictorChan2 = res.rows[1].PredictorChan2
            var dbPredictorRole = res.rows[1].PredictorRole
            var dbServerId = res.rows[1].ServerId
            var dbGeneralChat = res.rows[1].GeneralChat
            var dbGameChanMsg = res.rows[1].GameChanMsg
            //* Storing the score command settings
            container.dbVal[`botChannel`] = dbbotChannel
            container.dbVal[`GameChanTopic`] = dbGameChannelTopic
            container.dbVal[`GameParent`] = dbGameParent
            container.dbVal[`PredictorChan`] = dbPredictorChan
            container.dbVal[`PredictorChan2`] = dbPredictorChan2
            container.dbVal[`PredictorRole`] = dbPredictorRole
            container.dbVal[`ServerId`] = dbServerId
            container.dbVal[`GeneralChat`] = dbGeneralChat
            container.dbVal[`GameChanMsg`] = dbGameChanMsg
            logthis(green(`• Bot Channel:\n${dbbotChannel}`))
            logthis(yellow(cborder))
            logthis(green(`• Game Topic:\n${dbGameChannelTopic}`))
            logthis(yellow(cborder))
            logthis(green(`• Game Parent:\n${dbGameParent}`))
            logthis(yellow(cborder))
            logthis(green(`• Game Channel Message:\n${dbGameChanMsg}`))
            logthis(yellow(bold(cborder)))
            logthis(green(`• Predictor Channel:\n${dbPredictorChan}`))
            logthis(yellow(cborder))
            logthis(green(`• Predictor Channel 2:\n${dbPredictorChan2}`))
            logthis(yellow(cborder))
            logthis(green(`• Predictor Role:\n${dbPredictorRole}`))
            logthis(yellow(bold(cborder)))
            logthis(yellow(cborder))
            logthis(green(`• Server Id:\n${dbServerId}`))
            //SecondPool.end()
            logthis(magentaBright(cborder))
            logthis(magentaBright(cborder))
          }
    
        })
      })
    }