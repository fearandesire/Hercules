import _12FromTo24Hours from '12fromto24hours';
const lockPredictorMngr = container.cronhandler3;
import {
    container
} from '@sapphire/pieces';
import { yellow } from 'colorette';
import { logthis } from '../../lib/hercConfig';
import {
    SapDiscClient
} from '../../Hercules.js';
export function QuePredictorClosing(time){
    const newTime = "0" + time + " PM";
    const convertedTo24Hr = _12FromTo24Hours(newTime);
    const convertedTimeSplit = convertedTo24Hr.split(':');
    const convertedHrGrab = convertedTimeSplit[0]
    const convertedMinGrab = convertedTimeSplit[1]
    const crontime = `${convertedMinGrab} ${convertedHrGrab} * * *`
    const DatabaseEntry = container.dbVal;
    const predictorChan = DatabaseEntry[`PredictorChan`]
    const predictorChan2 = DatabaseEntry[`PredictorChan2`]
    const lockPredictorMngr = container.cronhandler3;
    const predictorRole = DatabaseEntry[`PredictorRole`]
    const botchannel = DatabaseEntry[`botChannel`]
    const client = SapDiscClient;
    lockPredictorMngr.add('lockPredictionChannelTimerV2', crontime, () => {
        logthis(yellow(`- -  Predictor Channel / Lineup \nSetup Logs - -   `))
        //? Channel override - deleting the predictor role to hide the channel.
        /* 
        ! Predictor Transition: Change Perms & Name of Predictor Channel to #2 (close channel) - Predictor #2 becomes #1, automatically open?
        */
        var PredictorChannel1 = client.channels.cache.get(`${predictorChan}`);
        PredictorChannel1.edit({
            name: "predictor channel 2"
        })
        PredictorChannel1.permissionOverwrites
            .create(predictorRole, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false
            });
        var PredictorChannel2 = client.channels.cache.get(`${predictorChan2}`);
        const chanfind = client.channels.cache.get(botchannel);
        logthis(yellow(`The first NBA Game of the night has started - The <#${PredictorChannel1.name}> has been locked from user's view.`));
        logthis(yellow(`The first NBA Game of the night has started - The <#${PredictorChannel2.name}> has been unlocked from user's view.`));
        chanfind.send(`The first NBA Game of the night has started - The <#${PredictorChannel1.name}> has been locked from user's view.`)
        chanfind.send(`The first NBA Game of the night has started - The <#${PredictorChannel2.name}> has been unlocked from user's view.`)

        //? If the game by date accuracy can be fixed, we can use this part to lock the predictor (in addition with the lineup setup). TODO: Monitor API to see if dev updates.
        PredictorChannel2.edit({
            name: "predictor channel"
        })
    })
    lockPredictorMngr.start(`lockPredictionChannelTimerV2`)
}