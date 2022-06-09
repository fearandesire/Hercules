//? Load local database settings (score has a separate file)
import {
  Command
} from '@sapphire/framework';
import {
  container
} from '@sapphire/pieces';
import {
  bold,
  green,
  logthis
} from '../lib/hercConfig.js';

import {
  ReturnEmbedErrorResp
} from '../utils/SQL/Embeds/ErrorReplyEmbed.js';
import {
  LoadAboutEmbedDatabase
} from '../utils/SQL/Embeds/LoadAboutEmbedSQL.js';
import {
  SendEmbedResp
} from '../utils/SQL/Embeds/SendEmbed.js';
import { LoadDailySchedule } from '../utils/SQL/LoadLocalDailySchedule.js';
import {
  LoadLocalServerSettingsData
} from '../utils/SQL/LoadLocalDatabaseSQL.js';
import {
  LoadLocalScoreCmdData
} from '../utils/SQL/LoadLocalScoreSettings.js';
import {
  LoadNBAChatDatabase
} from '../utils/SQL/LoadNBACDatabaseSQL.js';
import { LoadNBACScoreCmdData } from '../utils/SQL/LoadNBACScoreSettings.js';
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
    if (serverID == `777353407383339038`) {
      // LoadLocalScoreCmdData()
      // LoadAboutEmbedDatabase()
      LoadLocalServerSettingsData().then(() => {

        LoadDailySchedule().then(() => {
      
        LoadAboutEmbedDatabase();

        LoadLocalScoreCmdData();
        //if (container.WhichServer == 'LOCAL') {
          var embedTitle = `Database Interaction`;
          var embedText = `The Local Database has been loaded for this server.`
          SendEmbedResp(message, embedTitle, embedText)
          logthis(green(bold(`[SQL] The Local Database has been loaded.`)))
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
        logthis(green(bold(`[SQL] The NBA Chat Database has been loaded.`)))
      })

      return;
    } else {
      if (container.WhichServer !== 'LOCAL' || container.WhichServer !== 'NBAC') {
        var errormsg = 'The Database has failed to load'
        ReturnEmbedErrorResp(errormsg)
      }
      return;
    }
  }
}

