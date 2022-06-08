import {
    Command
} from '@sapphire/framework';
import {
    AboutEmbed
} from '../lib/CommandListEmbed/AboutEmbed.js';

export class AboutHercules extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'about',
            aliases: ['info', 'github'],
            description: 'Description',
        });
    }
    async messageRun(message) {
        AboutEmbed(message)
        return;
    }
}