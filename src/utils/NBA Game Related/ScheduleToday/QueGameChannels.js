import {
    container
} from "@sapphire/pieces";
import { SapDiscClient } from "../../../Hercules.js";
import { SendGameStartingSoon } from "../GameStartingSoon.js";



export function QueGameChannels(gameparent, GameChanTopic, CronGameTime, ServerCache, HomeTeam, AwayTeam, startsAt) {
    const gamemngr = container.hercGameSchedMngr;
    const gameSchedList = container.gameSchedList
    const teamArray = [
        `${HomeTeam}`,
        `${AwayTeam}`
    ];
    const gctitle = AwayTeam + "-vs-" + HomeTeam;
    const LowerCaseTitle = gctitle.toLowerCase();
    const gcArrayTitle = `${AwayTeam} vs. ${HomeTeam}`

    gamemngr.add(`${LowerCaseTitle}`, `${CronGameTime} * * *`, () => {
        ServerCache.channels.create(`${gctitle}`, {
            parent: `${gameparent}`,
            topic: `${GameChanTopic}`,
        }).then((channel) => {
            const id = channel.id
            channel.lockPermissions();
            SendGameStartingSoon(id)
            //  SapDiscClient.channels.cache.get(id).send(`Want to bet on NBA Games? **Check out <#${predictorchan}>**!`)
            // const chanID = SapDiscClient.channels.cache.find(channel => channel.name === gctitle);
            //? Selecting a random team to say good luck to, no bias :)
            var randomTeam = teamArray[Math.floor(Math.random() * teamArray.length)];
            //? Lowercase
            var AwayTeamNameLowercase = AwayTeam.toLowerCase();
            var HomeTeamNameLowercaase = HomeTeam.toLowerCase();
            var FindHomeTeamEmoji = SapDiscClient.emojis.cache.find(emoji => emoji.name === `${HomeTeamNameLowercaase}`);
            var FindAwayTeamEmoji = SapDiscClient.emojis.cache.find(emoji => emoji.name === `${AwayTeamNameLowercase}`);
            var basketballEmoji = SapDiscClient.emojis.cache.find(emoji => emoji.name === `basketball`);
            const HomeTeamEmoji = FindHomeTeamEmoji ? FindHomeTeamEmoji : basketballEmoji
            const AwayTeamEmoji = FindAwayTeamEmoji ? FindAwayTeamEmoji : basketballEmoji
            //logthis(`Emojis: {\nHome: ${HomeTeamEmoji}\nAway:${AwayTeamEmoji}}`)

            SapDiscClient.channels.cache.get(id).send(`Good luck ${randomTeam}!`).then((message) => {
                message.react(HomeTeamEmoji.id).then(() =>
                    message.react(AwayTeamEmoji.id))
            })
        })

    })
    //? Adding the game to an array which will display all the games scheduled today in an embed.
    gameSchedList.push(`${gcArrayTitle} opening at: ${startsAt}`)
    gamemngr.start(`${LowerCaseTitle}`);
}