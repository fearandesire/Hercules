import {
  SapphireClient
} from '@sapphire/framework';
import '@sapphire/plugin-hmr/register';
import {
  RateLimitManager
} from '@sapphire/ratelimits';
import 'dotenv/config';
import Statcord from "statcord.js";
import { LogGreen, LogYellow } from './utils/ConsoleLogging.js';

LogYellow(`[Startup]: Launching Hercules`)

//? Sapphire Framework -> Client Setup
const SapDiscClient = new SapphireClient({
  caseInsensitiveCommands: true,
  ignoreBots: false,
  intents: ["GUILDS", "GUILD_MESSAGES"],
  presence: {
    status: 'Online!'
  },
  typing: true
});

SapDiscClient.fetchPrefix = () => "$";

//? Statcord Setup
const statcord = new Statcord.Client({
  client: SapDiscClient,
  key: process.env.STATCORD_KEY,
  postCpuStatistics: true,
  postMemoryStatistics: true,
  postGpuStatistics: true,
})



async function LoginHercules() {
  const envTOKEN = process.env.TOKEN
  SapDiscClient.login(envTOKEN)
  LogGreen(`[Startup]: Hercules is now logged into Discord & online!`)
}
LoginHercules();

export {
  SapDiscClient
};
export {
  RateLimitManager
};
export {
  statcord
};

