import {
    Command
} from '@sapphire/framework';
import now from 'performance-now';
var start = now();
var end = now();
export class testperformance extends Command {
    constructor(context, options) {  
      super(context, {
        ...options,
        name: 'testperformance',
        aliases: ['testperf'],
        description: 'test performance',
        requiredUserPermissions: ['KICK_MEMBERS']
      });
    }
async messageRun(message) {
console.log(start.toFixed(3));
console.log((start-end).toFixed(3));

}
}