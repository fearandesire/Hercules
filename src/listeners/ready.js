import { container, Listener } from '@sapphire/framework';
import { statcord } from '../Hercules.js';
container.dbVal = {};
const logthis = console.log;
export class ReadyListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: true,
      event: 'ready'
    });
  }
  run(SapDiscClient) {
    const {
      username, // eslint-disable-line
      id // eslint-disable-line
    } = SapDiscClient.user;
  }
}

statcord.autopost();

statcord.on("autopost-start", () => {
  // Emitted when statcord autopost starts
  console.log("[Statcord] Started autopost");
});

statcord.on("post", status => {
  // status = false if the post was successful
  // status = "Error message" or status = Error if there was an error
  if (!status) console.log("[Statcord] Successful post");
  else console.error(status);
});

logthis(`readyjs loaded`);