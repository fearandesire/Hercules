import {
    container
} from '@sapphire/framework';
import { LogGreen, LogRed, LogYellow } from '../ConsoleLogging.js';
  container.dbVal = {};
  
  
  //* ACCESSING POSTGRE DB WITH NODE-POSTGRES »»»»»»»»» */
  import * as pg from 'pg';
import { SendEmbedResp } from '../Send Embeds/SendEmbed.js';

  const {
    Pool
  } = pg.default
  
  
  
  export const pool = new Pool({
    user: 'postgres',
    host: '144.202.4.112',
    database: 'settings',
    password: '666999',
    port: 5432,
  })
  export async function ModifyScheduleTime(TargetCell, NewCronTime, message) {
    container.dbVal[`scoretoggleval`] = NewCronTime
LogYellow(`[ModifyScheduleTime.js] Modifying ${TargetCell} time to to ${NewCronTime}`)
    //? Querying the database for the NBAC Daily Schedule times' settings
    const QueryDB = {
      name: 'update-nbacDS'+Math.random(),
      text: `UPDATE nbacdailytimers SET "${TargetCell}" = '${NewCronTime}' WHERE id = ${parseInt(1)}`,
    }
    //? Setting up a promise so we can properly call the data we need without any script rushing us.
    const poolpromise = new Promise((err, res) => {
      //*  An instance of the postgreSQL connection
      pool.query(QueryDB, (err, res) => {
        if (err) {
          LogRed(`Error: ${err}`)
          console.log(err)
        } else {
        LogGreen(`[ModifyScheduleTime.js] Successfully updated ${TargetCell} to ${NewCronTime}`)
        SendEmbedResp(message, 'Database Interaction', `Successfully updated ${TargetCell} to ${NewCronTime}`)
  
        }
  
      })
    })
  }