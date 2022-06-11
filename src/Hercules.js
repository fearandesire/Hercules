import {
  SapphireClient
} from '@sapphire/framework';
import '@sapphire/plugin-hmr/register';
import {
  RateLimitManager
} from '@sapphire/ratelimits';
import 'dotenv/config';
import Statcord from "statcord.js";
import {
  bold,
  green,
  logthis,
  yellowBright
} from './lib/hercConfig.js';

console.log(yellowBright(bold(`[Startup]: Launching Hercules`)))

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
  logthis(green(`[Startup] Hercules is now online!`))
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

