import { container } from "@sapphire/pieces";
import { NBATeamsNickNames } from "../../../lib/hercConfig.js";
import { LogYellow } from "../../ConsoleLogging.js";
export function SwapTeamNames(){
    const {
        teams
      } = container.HomeAndAwayTeams
      for (const key of Object.keys(teams)) {
        LogYellow(`${teams[key].AwTeam} ${teams[key].hTeam}`);
        if (teams[key].AwTeam === 'Golden State') {
            teams[key].AwTeam = 'Warriors';
        }
        if (teams[key].hTeam === 'Golden State') {
            teams[key].hTeam = 'Warriors';
        }
        if (teams[key].hTeam in NBATeamsNickNames) {
          teams[key].hTeam = NBATeamsNickNames[teams[key].hTeam]
        }

        if (teams[key].AwTeam in NBATeamsNickNames) {
          teams[key].AwTeam = NBATeamsNickNames[teams[key].AwTeam]
        }
      }
}