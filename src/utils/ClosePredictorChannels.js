import { container } from '@sapphire/framework';
import {
    SapDiscClient
} from '../Hercules.js';
import {
    bold, cborder, cyanBright,
    logthis, magentaBright, red, yellow
} from '../lib/hercConfig.js';
export function ClosePredictionChannels() {
    const botchannel = container.dbVal[`botChannel`]
    const predictorChan = container.dbVal[`PredictorChan`]
    const predictorChan2 = container.dbVal[`PredictorChan2`]
    const predictorRole = container.dbVal[`PredictorRole`]
    const serverid = container.loadedServerID
    logthis(magentaBright(cborder))
    const EarliestGameTime = container.FirstGameTime;
    const botChan = SapDiscClient.channels.cache.get(botchannel);
    const lockPredictorMngr = container.predictorMngr;
    const PDTitle = `PredictorPermissionTask`
    const timestamp = new Date();
    let currentminutes = timestamp.getMinutes();
    let currenthour = timestamp.getHours();
    let currentseconds = timestamp.getSeconds();
    const parseSecondsv2 = parseInt(currentseconds)
    let SixSecondsAheadv2 = parseSecondsv2 + parseInt("8");
    //? Converting the smallest start time from the NBA Game Schedule into a string
    //const ETGameTimeString = EarliestGameTime.toString();
    const removePMRegex = /[ PM]/g;
    const ETGameTimeString = EarliestGameTime.replace(removePMRegex, "");
    //? Adding a colon
    const colon = ":";
    //? Adding a colon to the smallest start time.
    const ETColon = ETGameTimeString.substring(0, 1) + colon + ETGameTimeString.substring(2,3)
    //? Again, ETColon is basically a grab of the time the earliest NBA game is for the day.
    //? Putting it into a 12-hr/PM time format to log into our shcedule embed.
   // logthis(`ET COLON (REAL): ${ETColon}`)
    logthis(magentaBright(cborder))
    let ETPlusZero = ETColon+`0 PM`
    //? Troubleshooting/Debugging - this will show us the time input we've gathered with the colon, and adding PM at the end.
    logthis(cyanBright(bold`[Game Scheduling]\nET Colon: ${ETPlusZero}`))
    container.ETConvert = ETPlusZero;     //_12FromTo24Hours(ETPlusZero);
    var gameTimeParts24Hr = ETColon.split(colon);
    var HRGrab24Hr = gameTimeParts24Hr[0];
    var MinGrab24Hr = gameTimeParts24Hr[1];
    const RightNowv3 = `${SixSecondsAheadv2} ${currentminutes} ${currenthour} * * *`
    const ServerCache = SapDiscClient.guilds.cache.get(serverid);
    //! This variable is the time the earliest game starts; in cron format so we can close the predictor channel.
    const earliestGameCron = `${MinGrab24Hr} ${HRGrab24Hr} * * *`;

    lockPredictorMngr.add(PDTitle, earliestGameCron, () => {
        logthis(yellow(`- -  Predictor Channel / Lineup \nSetup Logs - -   `))
        /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
        /*                                                            //! Predictor 1 -> to #2⁡                                                         */
        /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
        
        //! It's important to note: Currently, the Predictor Channel Bot (real name Accuracy Challenge Bot) isn't taking commands from my bot as of yet.
        //! Cause of this especially, we are leaving the channel that becomes predictor-channel (when we re-name predictor #2 -> to 1) permissions alone;
        //! This is because likely, #2 has the next-day's game's scheduled, but we don't know at what time as it is done manually.
        //! With bot integration, we can have a set schedule of when to change the permissions for both channels. But for now, only todays games (predictor 1) will close.
        var predictorChannel1 = SapDiscClient.channels.cache.get(`${predictorChan}`);
        const P1Name = predictorChannel1.name;
        var predictorChannel2 = SapDiscClient.channels.cache.get(`${predictorChan2}`);
        const P2Name = predictorChannel2.name


        if (P1Name == `predictor-channel`) {
            let storedPosition = parseInt(predictorChannel1.position) + parseInt("1");
            logthis(`P1 Channel Position: ${storedPosition}`)
            ServerCache.channels.cache
                .find((channel) => channel.id === predictorChan).edit({
                    name: "predictor-channel-2", position: storedPosition
                })
                logthis(red("CHANGED P-CHANNEL 1 TO #2 (ADDED NUMBER 2"))
            ////botChan.send(`<#${predictorChannel1.name}> renamed. Viewing Permissions revoked.`)
            predictorChannel1.permissionOverwrites
                .create(predictorRole, {
                    VIEW_CHANNEL: false,
                    SEND_MESSAGES: false
                });
        } else if (P1Name == "predictor-channel-2") {
            let storedPosition2 = parseInt(predictorChannel1.position) - parseInt("1");
            logthis(`P1 Channel Position: ${storedPosition2}`)
            //! If (what is originally predictor-channel(1)) Predictor Channel 1 isn't named predictor-channel-1, then it must be called predictor-channel-2
            //! So, we re-name it to predictor-channel(1) then. Permissions left alone.
            predictorChannel1.edit({
                name: "predictor-channel", position: storedPosition2
            })
            predictorChannel1.setName(`predictor-channel`)
            logthis(red("CHANGED P-CHANNEL #2 TO 1 (REMOVED NUMBER 2)"))
            ////chanfind.send(`<#${predictorChannel1.name}> renamed.`)
        }

        //? If the game by date accuracy can be fixed, we can use this part to lock the predictor (in addition with the lineup setup). TODO: Monitor API to see if dev updates.
        /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
        /*                                                            //! Predictor #2 -> to 1                                                           */
        /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
        if (P2Name == `predictor-channel-2`) {

            let storedPosition3 = parseInt(predictorChannel2.position) - parseInt("1");
            logthis(`P2 Channel Position: ${storedPosition3}`)
            ServerCache.channels.cache
                .find((channel) => channel.id === predictorChan2).edit({
                name: "predictor-channel", position: storedPosition3
            })
            predictorChannel2.setName(`predictor-channel`)
            predictorChannel2.fetch(true);
            logthis(red("CHANGED P-CHANNEL #2 TO 1 (REMOVED NUMBER 2)!!"))
           //// botChan.send(`<#${predictorChannel2.name}> renamed. Viewing Permissions revoked.`)

            } else if (P2Name == `predictor-channel`){
                let storedPosition4 = parseInt(predictorChannel2.position) + parseInt("1");
                logthis(`P2 Channel Position: ${storedPosition4}`)
                //! If Predictor #2 isn't named predictor-channel-2, then it must be called predictor-channel(1)
                //! So, we re-name it to predictor-channel-2
                predictorChannel2.edit({
                    name: "predictor-channel-2", position: storedPosition4
                })
                predictorChannel2.permissionOverwrites
                .create(predictorRole, {
                    VIEW_CHANNEL: false,
                    SEND_MESSAGES: false
                });
                logthis(red("CHANGED P-CHANNEL 1 TO #2 (ADDED NUMBER 2"))
        }
        logthis(yellow(`-----    -----    ----`))
        logthis(yellow(`The first NBA Game of the night has started - Predictor Channel permissions task has been executed.`));
    })
    lockPredictorMngr.start(PDTitle)
    //logthis(earliestGameCron)

}