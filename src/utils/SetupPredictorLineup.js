import {
  bold, cborder, cyanBright,
  //? standard
  logthis, magentaBright
} from '../lib/hercConfig.js';
//! REPLACE CONFIG VARIABLE
import {
  SapDiscClient
} from '../Hercules.js';
export function SetupPredictorLineup(LineupResponse){
  /*const NewLineup = [];
  var realArrayLength = LineupResponse.length;
  for (var i = 0; i < realArrayLength; i++) {
    NewLineup.push(LineupResponse[i])

  }*/
//   ServerCache.channels.cache
//   .find((channel) => channel.id === config.predictorchan2).edit({
//   name: "predictor-channel", position: storedPosition3
// })
  logthis(magentaBright(cborder))
  logthis(cyanBright(bold(`[Game Scheduling]\nSetting up Lineup for Predictor Channel`)))
  let NewLineupNoCommas = LineupResponse.join('\n')
  SapDiscClient.channels.cache.find((channel) => channel.name === "predictor-channel").send(`\`\`\`${NewLineupNoCommas}\`\`\``)
  logthis(cyanBright(bold(`Lineup for today sent to predictor channel #1.`)))
}