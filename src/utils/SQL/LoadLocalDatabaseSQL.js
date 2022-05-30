import {
  container
} from '@sapphire/pieces';
import {
  magentaBright,
  yellow
} from 'colorette';
import 'dotenv/config';
import {
  bold,
  cborder, green, red
} from '../../lib/hercConfig.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
export const SecondPool = new Pool({
  
    user: dbUser,
    host: dbIP,
    database: 'settings',
    password: dbPass,
    port: dbPort
  })

export async function LoadLocalServerSettingsData() {
  logthis(magentaBright(cborder))
    logthis(yellow(bold(`[Database] Accessing localserversettings to load Local server settings. `)))
    const QueryDB = {
      name: 'fetch-localserversettings',
      text: `SELECT * from localserversettings`,

    }
  //? A Promise is required to process these kinds of requests.
    const poolpromise = new Promise((err, res) => {
      SecondPool.query(QueryDB, (err, res) => {
        if (err) {
          logthis(red(bold(`[DEBUGGING]: Database localserversettings ERROR:`)))
          console.log(err)
        } else {
          logthis(green(bold(`[Database] Server Setting Data Query Successful]`)))
          logthis(green(bold(`Server Settings:`)))
        //? The return/response here is reminds me of an API call/response.
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
          logthis(magentaBright(cborder))
          logthis(magentaBright(cborder))
        //? Set the Global Database Identifier to LOCAL
          container.WhichServer = 'LOCAL'
        }
  
      })
    })
  }