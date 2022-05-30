import {
    container
} from '@sapphire/pieces';
import {
    SapDiscClient
} from '../../Hercules.js';

export function CreateNow(message, chanName, teamArray, team1, team2, GameParent, GameChatTopic) {
    const client = SapDiscClient
    const crmanager = container.crmngr;
    const GameScheduleManager = container.hercGameSchedMngr;
    const timestamp = new Date();
    let currentseconds = timestamp.getSeconds();
    let currentminutes = timestamp.getMinutes();
    let currenthour = timestamp.getHours();
    let foursecondsahead = currentseconds + 4;
    const crtime = `${currenthour}${currentminutes}`
    message.channel.send(
        `**Creating: ` +
        chanName +
        "** now. *Please wait 5 seconds*. "
    );
    container.createGameTimes.push(crtime)
   // console.log(container.createGameTimes)
    crmanager.add(chanName, `${foursecondsahead} ${currentminutes} ${currenthour} * * *`, () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createdChannel = message.guild.channels
            .create(chanName, {
                parent: GameParent,
                topic: GameChatTopic,
            }).then((channel) => {
                const id = channel.id
                console.log(channel.id)
                channel.lockPermissions();
                var randomTeam = teamArray[Math.floor(Math.random() * teamArray.length)];
                var HomeTeamName = team1.toLowerCase();
                var AwayTeamName = team2.toLowerCase();
                var predictorchan = container.dbVal[`PredictorChan`]
                const HomeTeamEmoji = client.emojis.cache.find(emoji => emoji.name === `${HomeTeamName}`);
                const AwayTeamEmoji = client.emojis.cache.find(emoji => emoji.name === `${AwayTeamName}`);
                client.channels.cache.get(id).send(`Want to bet on who will win? **Check out <#${predictorchan}>**!`)
                client.channels.cache.get(id).send(`Good luck ${randomTeam}!`).then((message) => {
                    message.react(HomeTeamEmoji.id)
                    message.react(AwayTeamEmoji.id)
                })
            });
        return;
    })
    crmanager.start(chanName)
    //GameScheduleManager.start(chanName)
    return;
}