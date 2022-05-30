
import { SapphireClient } from '@sapphire/framework';
import '@sapphire/plugin-hmr/register';
import { RateLimitManager } from '@sapphire/ratelimits';
import 'dotenv/config';
import { bold, green, logthis, yellowBright } from './lib/hercConfig.js';

console.log(yellowBright(bold(`[Startup]: Launching Hercules`)))

// Sapphire framework
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

async function LoginHercules() {
  const envTOKEN = process.env.TOKEN
   SapDiscClient.login(envTOKEN)
   logthis(green(`[Startup] Hercules is now online!`))
}
LoginHercules();

export { SapDiscClient };
export { RateLimitManager };

