import puppeteer from 'puppeteer';
import { SendEmbedResp } from './SQL/Embeds/SendEmbed.js';
export async function WhatsNewGithubCall(message){
const accessGithub = async () => {
    const GithubBrowser = await puppeteer.launch({
        headless: false,
        userDataDir: '../../src/lib/Puppeteer'
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
