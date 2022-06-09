import { container, Listener } from '@sapphire/framework';
container.dbVal = {};
const logthis = console.log;
export class ReadyListener extends Listener {
  run(SapDiscClient) {
    const {
      username, // eslint-disable-line
      id // eslint-disable-line
    } = SapDiscClient.user;
  }
}



logthis(`readyjs loaded`);