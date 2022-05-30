import {
    container
} from '@sapphire/pieces';
import {
    SapDiscClient
} from '../../Hercules.js';
import { SendEmbedResp } from '../SQL/Embeds/SendEmbed.js';
export function CreateFromScheduledTime(message, args, GameCount, GameChanMsg, team1, team2, time) {
    //console.log(LGT2)
    const isCrRan = container.crRan;
    const DatabaseEntry = container.dbVal;
    const client = SapDiscClient
    const crmanager = container.crmngr;
    //const vs = await args.pick("string");
    const SavedGameTime = time;
    const teamArray = [
        `${team1}`,
        `${team2}`
    ];
    console.log("Logging time input for 'last' function:")
    console.log(SavedGameTime)
    const timesplit = time.split(":");
    const mins = timesplit[1];
    const hours = timesplit[0];
    //* Array for displaying the current games scheduled with $ls
    const CrSchedList = container.CrSchedList
    //* Game Channel Titles will be placed in this object with an incrementing number, that way we can delete the games easy.
    const OBJCrgameSched = container.OBJCrgameSched
    const GameParent = DatabaseEntry[`GameParent`]
    const GameChatTopic = DatabaseEntry[`GameChanTopic`]
    //! Converting into 24:00 Hour Time Format
    const convertedhour = 12 + parseInt(hours, 10);
    //let convertedtime = convertedhour + ":" + mins;
    //const channelDate = new Date().toDateString() + " " + convertedtime;
    //const schedule = Date.parse(channelDate) - Date.now();
    const title = `${team1}-vs-${team2}`;
    const chanName = `${team1} vs ${team2}`
    const requestedTimeCronFormat = `${mins} ${convertedhour} * * *`
    //const preConverted = `${hours}${mins}`
    var embedTitle = 'Schedule Management';
    var embedText = `Creating channel: ${title.toLowerCase()} at  ${time}`;
    SendEmbedResp(message, embedTitle, embedText)
    GameCount++;
    //* Assigning an incrementing number per $creategame so we can have an easy way to delete them from the schedule if needed.
    const FormattedArrayTitle = `${chanName} opening at: ${time}`
    OBJCrgameSched[`${GameCount}`] = title
    //* Pushing the Game/Channel Name to an array for displaying.
    CrSchedList.push(FormattedArrayTitle)
    //container.createGameTimes.push(preConverted)
    //console.log(container.createGameTimes)
    crmanager.add(`${title}`, requestedTimeCronFormat, () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createdChannelv2 = message.guild.channels
            .create(chanName, {
                parent: GameParent,
                topic: GameChatTopic,
            }).then((channel) => {
                const id = channel.id
                console.log(channel.id)
                channel.lockPermissions();
                // const chanID = client.channels.cache.find(channel => channel.name === chanName);
                var randomTeam = teamArray[Math.floor(Math.random() * teamArray.length)];
                //var lowerCaseTeam = randomTeam.toLowerCase();
                var HomeTeamName = team1.toLowerCase();
                var AwayTeamName = team2.toLowerCase();
                const HomeTeamEmoji = client.emojis.cache.find(emoji => emoji.name === `${HomeTeamName}`);
                const AwayTeamEmoji = client.emojis.cache.find(emoji => emoji.name === `${AwayTeamName}`);
                client.channels.cache.get(id).send(GameChanMsg)
                client.channels.cache.get(id).send(`Good luck ${randomTeam}!`).then((message) => {
                    message.react(HomeTeamEmoji.id)
                    message.react(AwayTeamEmoji.id)
                })
            })
    })
    crmanager.start(title)
    if (isCrRan == 'false') {
        const isCrRan = 'true';

        return;
    }
    return;
}