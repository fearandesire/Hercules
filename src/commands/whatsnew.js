import {
    Command
} from '@sapphire/framework';
import puppeteer from 'puppeteer';
import { SendEmbedResp } from '../utils/SQL/Embeds/SendEmbed.js';
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
        const accessGithub = async () => {
            const GithubBrowser = await puppeteer.launch({
                headless: false,
                userDataDir: '../lib/Puppeteer/'
            });
            const GitPage = await GithubBrowser.newPage();
            await GitPage.goto('https://raw.githubusercontent.com/fearandesire/Hercules/main/WhatsNew.md');
            await GitPage.waitForSelector('body > pre')
            const rawText = await GitPage.$eval('body > pre', element => element.textContent);
            var embedTitle = `**What's New**`;
            var embedText = rawText
            SendEmbedResp(message, embedTitle, embedText)
            GithubBrowser.close();
            return
        }
        accessGithub();

    }
}