import {
    Command
} from '@sapphire/framework';
import { WhatsNewGithubCall } from '../utils/WhatsNewGitCall.js';

export class WhatsNew extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'whatsnew',
            aliases: ['wn', 'changelog'],
            description: 'whats new'
        });
    }

    async messageRun(message) {
WhatsNewGithubCall(message)
return
    }
}