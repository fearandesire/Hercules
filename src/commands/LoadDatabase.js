//? Load local database settings (score has a separate file)
import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
import { LogGreen, LogRed } from '../utils/ConsoleLogging.js';

import {
  ReturnEmbedErrorResp
} from '../utils/Send Embeds/ErrorReplyEmbed.js';
import {
  SendEmbedResp
} from '../utils/Send Embeds/SendEmbed.js';
import {
  LoadAboutEmbedDatabase
} from '../utils/SQL/Embeds/LoadAboutEmbedSQL.js';
import { LoadDailySchedule } from '../utils/SQL/LoadDatabase/LocalDailySchedule.js';
import {
  LoadLocalServerSettingsData
} from '../utils/SQL/LoadDatabase/LocalDatabaseSQL.js';
import {
  LoadLocalScoreCmdData
} from '../utils/SQL/LoadDatabase/LocalScoreSettings.js';
import {
  LoadNBAChatDatabase
} from '../utils/SQL/LoadDatabase/NBACDatabaseSQL.js';
import { LoadNBACScoreCmdData } from '../utils/SQL/LoadDatabase/NBACScoreSettings.js';

export class LoadDatabase extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'loaddatabase',
      aliases: ['ld'],
      description: 'load database',
      requiredUserPermissions: ['KICK_MEMBERS']
    });
  }

  async messageRun(message) {

    var serverID = message.guild.id
    container.loadedServerID = serverID
    if (container.WhichServer == 'Local' || container.WhichServer == 'NBAC') {
      SendEmbedResp(message, 'Database Information', `The ${container.WhichServer} database is already loaded.`)
      return;
    }
    if (serverID == `777353407383339038`) {
      // LoadLocalScoreCmdData()
      // LoadAboutEmbedDatabase()
      LoadLocalServerSettingsData().then(() => {

        LoadDailySchedule().then(() => {
      
        LoadAboutEmbedDatabase();

        LoadLocalScoreCmdData();
        //if (container.WhichServer == 'Local') {
          var embedTitle = `Database Interaction`;
          var embedText = `The Local Database has been loaded for this server.`
          SendEmbedResp(message, embedTitle, embedText)
          LogGreen(`[LoadDatabase.js] The Local Database has been loaded.`)
        //}
      })
    })
      return;

    } else if (serverID == `555171631539028000`) {
      LoadNBAChatDatabase().then(() => {
        LoadAboutEmbedDatabase();
        LoadNBACScoreCmdData();
        LoadDailySchedule();
        var embedTitle = `Database Interaction`;
        var embedText = `The NBAC Database has been loaded for this server.`
        SendEmbedResp(message, embedTitle, embedText)
        LogGreen(`[LoadDatabase.js] The NBA Chat Database has been loaded.`)
      })

      return;
    } else {
      if (container.WhichServer !== 'Local' || container.WhichServer !== 'NBAC') {
        var errormsg = 'The Database has failed to load'
        ReturnEmbedErrorResp(errormsg)
        LogRed(`[LoadDatabase.js] The Database has failed to load.`)
      }
      return;
    }
  }
}

