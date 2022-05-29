import {
  container
} from '@sapphire/pieces';
import {
  green,
  yellow
} from 'colorette';
import {
  MessageEmbed
} from 'discord.js';
import puppeteer from 'puppeteer';
import {
  randomColor
} from '../commands/score.js';
import {
  SapDiscClient
} from '../Hercules.js';
import {
  bold, cborder, cyanBright, logthis, magentaBright, red
} from '../lib/hercConfig.js';
import {SortScoreEmbedColor, WhoWon} from './SortScoreEmbedColor.js'
//* Three Separate Functions will be designed - One if it the score is being called in an active game chat;
//* This will be that first one. This is intended to be able to print the score using just $score
//* There will be another function for to get a score by typing the team names.
//* 2nd Function will need a fail-safe to catch if no results are found. (search active game chat cat, compare to string inputs.)


//? Function to check if the game being called on is on-going or not.
export async function TestIfGameLive(GameChanSplitHomeTeam, GameChanSplitAwayTeam, CurrentChanId) {
  // Args for Puppeteer (minimal settings)
  const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];
  //Same as ESPNURl
  const TestGameLiveURL = `http://www.google.com/search?q=${GameChanSplitAwayTeam}+${GameChanSplitHomeTeam}+score`
  const testLiveBrowser = await puppeteer.launch({
    headless: true,
    args: minimal_args
  });
  const testLivePage = await testLiveBrowser.newPage();
  await testLivePage.goto(
    //? Using todays date formatted in a URL ESPN will accept.
    TestGameLiveURL
  );
  //await testLivePage.setDefaultNavigationTimeout(60000);
  await testLivePage.waitForSelector('#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__stts-l.imso-ani.imso_mh__stts-l-cont > div > span')
  let testLiveSelector = await testLivePage.$('#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__stts-l.imso-ani.imso_mh__stts-l-cont > div > span')
  let testLiveElement = await testLivePage.evaluate(el => el.textContent, testLiveSelector)
  console.log(yellow(bold(`[DEBUGGING testliveelement]: ${testLiveElement}`)))
  testLiveBrowser.close();
  return testLiveElement

}
//* ------------------------------------------------------------------------------------------------------------------------------------------------ */
//* ---------------------------------------------------------------- Current Quarter --------------------------------------------------------------- */
export async function CurrentQuarter(GameChanSplitHomeTeam, GameChanSplitAwayTeam, CurrentChanId) {
  const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];
  //Same as ESPNURl
  const CurrentQuarterURL = `http://www.google.com/search?q=${GameChanSplitAwayTeam}+${GameChanSplitHomeTeam}+score`
  const CurrentQuarterBrowser = await puppeteer.launch({
    headless: true,
    args: minimal_args
  });
  const CurrentQuarterPage = await CurrentQuarterBrowser.newPage();
  await CurrentQuarterPage.goto(
    //? Using todays date formatted in a URL ESPN will accept.
    CurrentQuarterURL
  );
    //await testLivePage.setDefaultNavigationTimeout(60000);
    await CurrentQuarterPage.waitForSelector('#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__stts-l.imso-ani.imso_mh__stts-l-cont > div > span', {
      timeout: 1300
    })
    let CurrentQuarterSelector = await CurrentQuarterPage.$('#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__stts-l.imso-ani.imso_mh__stts-l-cont > div > span')
    let CurrentQuarterElement = await CurrentQuarterPage.evaluate(el => el.textContent, CurrentQuarterSelector)
    console.log(yellow(bold(`[DEBUGGING CURRENT QUARTER SCORE ELEMENT]: ${CurrentQuarterElement}`)))
    //CurrentQuarterBrowser.close();
    container.CurrentQuarter = CurrentQuarterElement
    const CRScore = container.CurrentGameQuarter
    return CRScore
}


//* ------------------------------------------------------------------------------------------------------------------------------------------------ */
//* -------------------------------------------------------------- Grabbing Home Score ------------------------------------------------------------- */
async function GrabHomeScore(GameChanSplitHomeTeam, GameChanSplitAwayTeam, CurrentChanId, awayTeamEmoji, homeTeamEmoji) {
  const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];
  const ScoreGoogleURL = `http://www.google.com/search?q=${GameChanSplitAwayTeam}+${GameChanSplitHomeTeam}+score`
  logthis(cyanBright(bold(`[DEBUGGING]: ${ScoreGoogleURL}`)))
  const browser = await puppeteer.launch({
    headless: true,
    args: minimal_args
  });
  const page = await browser.newPage();
  await page.goto(
    //? Using todays date formatted in a URL ESPN will accept.
    ScoreGoogleURL
  );
  let el2 = await page.$(`#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__tm-a-sts > div.imso_mh__wl.imso-ani.imso_mh__tas > div > div.imso_mh__scr-sep > div > div.imso_mh__r-tm-sc.imso_mh__scr-it.imso-light-font`)
  let HOMESCORE = await page.evaluate(el => el.textContent, el2)
  container.HomeScore = HOMESCORE;
  const ObjHOMESCORE = container.HomeScore
  return HOMESCORE;
}
//* ------------------------------------------------------------------------------------------------------------------------------------------------ */
//* ---------------------------------------------------------------- Grab Away Score --------------------------------------------------------------- */
async function GrabAwayScore(GameChanSplitHomeTeam, GameChanSplitAwayTeam, CurrentChanId, awayTeamEmoji, homeTeamEmoji) {
  const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];
  const ScoreGoogleURL = `http://www.google.com/search?q=${GameChanSplitAwayTeam}+${GameChanSplitHomeTeam}+score`
  logthis(cyanBright(bold(`[DEBUGGING]: ${ScoreGoogleURL}`)))
  const browser = await puppeteer.launch({
    headless: true,
    args: minimal_args
  });
  const page = await browser.newPage();
  await page.goto(
    //? Using todays date formatted in a URL ESPN will accept.
    ScoreGoogleURL
  );
  await page.waitForSelector('#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__tm-a-sts > div.imso_mh__wl.imso-ani.imso_mh__tas > div > div.imso_mh__scr-sep > div > div.imso_mh__l-tm-sc.imso_mh__scr-it.imso-light-font')
  let element = await page.$('#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__tm-a-sts > div.imso_mh__wl.imso-ani.imso_mh__tas > div > div.imso_mh__scr-sep > div > div.imso_mh__l-tm-sc.imso_mh__scr-it.imso-light-font')
  let AWAYSCORE = await page.evaluate(el => el.textContent, element)
  container.AwayScore = AWAYSCORE;
  const ObjAWAYSCORE = container.AwayScore;
  return AWAYSCORE;
}
//* ------------------------------------------------------------------------------------------------------------------------------------------------ */
//* Format data grabbed from Puppeteer

export async function GrabScoreInformation(GameChanSplitHomeTeam, GameChanSplitAwayTeam, CurrentChanId, awayTeamEmoji, homeTeamEmoji, UserRequestedID) {
  const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];
  const ScoreGoogleURL = `http://www.google.com/search?q=${GameChanSplitAwayTeam}+${GameChanSplitHomeTeam}+score`
  logthis(cyanBright(bold(`[DEBUGGING]: ${ScoreGoogleURL}`)))
  const browser = await puppeteer.launch({
    headless: false,
    args: minimal_args
  });
  const page = await browser.newPage();
  await page.goto(
    //? Using todays date formatted in a URL ESPN will accept.
    ScoreGoogleURL, { waitUntil: 'domcontentloaded' }
  );
  //? Home Score DIV
  let hScoreSelector = await page.$(`#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__tm-a-sts > div.imso_mh__wl.imso-ani.imso_mh__tas > div > div.imso_mh__scr-sep > div > div.imso_mh__r-tm-sc.imso_mh__scr-it.imso-light-font`)
  let HOMESCORE = await page.evaluate(el => el.textContent, hScoreSelector)
  container.HomeScore = HOMESCORE;
  const ObjHOMESCORE = container.HomeScore
  logthis(magentaBright(cborder))
  logthis(red(bold(`[$score] Logged HOME SCORE: ${ObjHOMESCORE}`)))
  // while (el2 !== null) {
  //   await page.reload({ waitUntil: 'domcontentloaded' })
  //   console.log('reload')
   let AwayScoreSelector = await page.$('#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__tm-a-sts > div.imso_mh__wl.imso-ani.imso_mh__tas > div > div.imso_mh__scr-sep > div > div.imso_mh__l-tm-sc.imso_mh__scr-it.imso-light-font')
    let AWAYSCORE = await  page.evaluate(el => el.textContent, AwayScoreSelector)
    container.AwayScore = AWAYSCORE;
    //--/
    //? Team Names to Uppercase for Embed Displaying
    var AwayTeamNameQuotedString = JSON.stringify(GameChanSplitAwayTeam)
    var HomeTeamNameQuotedString = JSON.stringify(GameChanSplitHomeTeam)
    var ATeamName = AwayTeamNameQuotedString.replace(/\"/g, "")
    var HTeamName = HomeTeamNameQuotedString.replace(/\"/g, "")
    const AwayTeamNameUppercase = ATeamName.charAt(0).toUpperCase() + ATeamName.slice(1);
    const HomeTeamNameUppercase = HTeamName.charAt(0).toUpperCase() + HTeamName.slice(1);
    //--/
    //? Assigning the container into a variable for ease of reading and typing
    var ObjAWAYSCORE = container.AwayScore
    logthis(red(bold(`[$score] Logged AWAY SCORE: ${ObjAWAYSCORE}`)))
    //--/
    //? Grbbing current quarter / 'final' status
    let QuarterOrFinishedSelector = await page.$(`#sports-app > div > div.imso-hov.imso-mh > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__stts-l.imso-ani.imso_mh__stts-l-cont > div > span`)
    let QUARTERorFINISHED = await page.evaluate(el => el.textContent, QuarterOrFinishedSelector)
     if (QUARTERorFINISHED == 'NBA'){
       console.log(`wrong selector was grabbed. grabbing correct one`)
      let QuarterOrFinishedSelectorLive = await page.$(`#sports-app > div > div.imso-hov.imso-mh > div:nth-child(2) > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov > div:nth-child(1) > div.imso_mh__stts-l.imso-ani.imso_mh__stts-l-cont > div > div`)
      let QUARTERorFINISHED = await page.evaluate(el => el.textContent, QuarterOrFinishedSelectorLive)
      container.QTRorFinal = QUARTERorFINISHED;
     } else {
      console.log(`this game should be over.`)
    container.QTRorFinal = QUARTERorFINISHED;
     }
    const ObjQTFinal = container.QTRorFinal;
    logthis(red(bold(`[$score] Logged QUARTER / 'FINAL': ${ObjQTFinal}`)))
    if (ObjQTFinal == 'Final') {
      logthis(magentaBright(cborder))
      logthis(red(bold(`Sending a finished game's score with the following values:`)))
      logthis(red(bold(`Sending A Live Game's score with the following values:\n${HomeTeamNameUppercase} ${ObjHOMESCORE} - ${AwayTeamNameUppercase} ${ObjAWAYSCORE} - Finaal`)))
   SendFinishedGameScore(CurrentChanId, ObjHOMESCORE, ObjAWAYSCORE, awayTeamEmoji, homeTeamEmoji, AwayTeamNameUppercase, HomeTeamNameUppercase, UserRequestedID)
    return;
  } else {
      
 logthis(red(bold(`Sending A Live Game's score with the following values:\n${HomeTeamNameUppercase} ${ObjHOMESCORE} - ${AwayTeamNameUppercase} ${ObjAWAYSCORE}`)))
 SendGameScore(CurrentChanId, ObjHOMESCORE, ObjAWAYSCORE, awayTeamEmoji, homeTeamEmoji, AwayTeamNameUppercase, HomeTeamNameUppercase, UserRequestedID, ObjQTFinal)
 browser.close();
    return;
  }
}
export async function SortScoreData(GameChanSplitHomeTeam, GameChanSplitAwayTeam, CurrentChanId, awayTeamEmoji, homeTeamEmoji, UserRequestedID) {

  const ScorePromise1 = await GrabAwayScore(GameChanSplitHomeTeam, GameChanSplitAwayTeam, CurrentChanId, awayTeamEmoji, homeTeamEmoji);
  const ScorePromise2 = await GrabHomeScore(GameChanSplitHomeTeam, GameChanSplitAwayTeam, CurrentChanId, awayTeamEmoji, homeTeamEmoji)
  // const ScorePromise3 = await CurrentQuarter(GameChanSplitHomeTeam, GameChanSplitAwayTeam, CurrentChanId, awayTeamEmoji, homeTeamEmoji)
  const ScorePromise3 = await CurrentQuarter(GameChanSplitHomeTeam, GameChanSplitAwayTeam, CurrentChanId, awayTeamEmoji, homeTeamEmoji)
  Promise.all([ScorePromise1, ScorePromise2, ]).then((values) => {
    if (container.CurrentQuarter == 'Final') {
      logthis(magentaBright(cborder))
      logthis(red(bold(`Sending a finished game's score with the following values:`)))
      var HScore = container.HomeScore
      var AwScore = container.AwayScore
      var FinishedLabel = 'Final'
      var AwayTeamNameQuotedString = JSON.stringify(GameChanSplitAwayTeam)
      var HomeTeamNameQuotedString = JSON.stringify(GameChanSplitHomeTeam)
      var ATeamName = AwayTeamNameQuotedString.replace(/\"/g, "")
      var HTeamName = HomeTeamNameQuotedString.replace(/\"/g, "")
      var AwayTeamNameUppercase = ATeamName.charAt(0).toUpperCase() + ATeamName.slice(1);
      var HomeTeamNameUppercase = HTeamName.charAt(0).toUpperCase() + HTeamName.slice(1);
      console.log(cyanBright(bold(`${AwayTeamNameUppercase} ${AwScore} - ${HomeTeamNameUppercase} ${HScore} - ${FinishedLabel} `)))
      logthis(magentaBright(cborder))
     SendFinishedGameScore(CurrentChanId, HScore, AwScore, FinishedLabel, awayTeamEmoji, homeTeamEmoji, AwayTeamNameUppercase, HomeTeamNameUppercase, UserRequestedID)
      return;
      //? Otherwise, game is Live and has a score.
    } else {
    //  SendGameScore(CurrentChanId)
    logthis(red(bold(`Sending A Live Game's score with the following values:`)))
    var HScore = container.HomeScore
    var AwScore = container.AwayScore
    var CurrentGameQuarter = values[2]
    var AwayTeamNameQuotedString = JSON.stringify(GameChanSplitAwayTeam)
    var HomeTeamNameQuotedString = JSON.stringify(GameChanSplitHomeTeam)
    var ATeamName = AwayTeamNameQuotedString.replace(/\"/g, "")
    var HTeamName = HomeTeamNameQuotedString.replace(/\"/g, "")
    var AwayTeamNameUppercase = ATeamName.charAt(0).toUpperCase() + ATeamName.slice(1);
    var HomeTeamNameUppercase = HTeamName.charAt(0).toUpperCase() + HTeamName.slice(1);
    var CRScore = container.CurrentQuarter
    SendGameScore(CurrentChanId, HScore, AwScore, awayTeamEmoji, homeTeamEmoji, AwayTeamNameUppercase, HomeTeamNameUppercase, UserRequestedID, CRScore)

    console.log(`${AwScore} - ${HScore} - ${CRScore}`)
      return;
    }
    console.log(values)
  })
  logthis(cyanBright(bold(cborder)))

}
let EmbedMsg = "";
async function SendFinishedGameScore(CurrentChanId, HScore, AwScore, awayTeamEmoji, homeTeamEmoji, AwayTeamNameUppercase, HomeTeamNameUppercase, UserRequestedID, EmbedMsg) {
  console.log(yellow(bold(`Sending Finished Game Score`)))
  var sendEmojiCircle = "Who did you have to win?"
  //? Converting first letter to uppercase for display
  const ChanId = CurrentChanId;
  const sendPing = await SapDiscClient.channels.fetch(ChanId)
  var finishedfooter = `Hercules Bot - Developed By Fenix#7559`
  sendPing.send(`<@${UserRequestedID}>`)
  var EmbedTitle = `**${awayTeamEmoji} ${AwayTeamNameUppercase} ${AwScore} -  ${HomeTeamNameUppercase} ${HScore} ${homeTeamEmoji}**`;
  EmbedMsg = `**Final Score**`;
  if (WhoWon(AwScore, HScore) == `Away`){
  console.log(green(bold(`AWAY TEAM VICTORY`)))
  EmbedMsg = `**:red_circle: Game Over - The ${AwayTeamNameUppercase} won!**`
  }
  if (WhoWon(AwScore, HScore) == `Home`){
    console.log(green(bold(`HOME TEAM VICTORY`)))
    EmbedMsg = `**:red_circle: Game Over - The ${HomeTeamNameUppercase} won!**`
  }
  const ScoreEmbed = new MessageEmbed()
    .setTitle(EmbedTitle)
    .addField("**Current Quarter:**" + "\u200B", EmbedMsg)
    //.addField("Minutes In Quarter:", `**${timeingame}**`)
    .setTimestamp()
    .setColor(SortScoreEmbedColor(AwScore, HScore, AwayTeamNameUppercase, HomeTeamNameUppercase))
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif"
    )
    .setFooter(finishedfooter);

  const chan = await SapDiscClient.channels.fetch(ChanId)
  chan.send({
    embeds: [ScoreEmbed]
  })
  return;
}

let EmbedTitleLive ="";
async function SendGameScore(CurrentChanId, HScore, AwScore, awayTeamEmoji, homeTeamEmoji, AwayTeamNameUppercase, HomeTeamNameUppercase, UserRequestedID, CRScore, EmbedTitleLive) {
  //* CRScore variable stands for 'Current Score'
  console.log(yellow(bold(`Sending Live Game Score`)))
  //? Converting first letter to uppercase for display
  const ChanId = CurrentChanId;
  const sendPing = await SapDiscClient.channels.fetch(ChanId)
  var livescoreFooter = `Hercules Bot - Developed By Fenix#7559`
  sendPing.send(`<@${UserRequestedID}>`)
  var EmbedLiveScoreTitle = `**${awayTeamEmoji} ${AwayTeamNameUppercase} ${AwScore} -  ${HomeTeamNameUppercase} ${HScore} ${homeTeamEmoji}**`;
  var EmbedMsgLive = `:green_circle: **Current Quarter**:`
  var EmbedMsgLiveScore = `**${CRScore}**`;
  const ScoreEmbed = new MessageEmbed()
    .setTitle(EmbedLiveScoreTitle)
    .addField(EmbedMsgLive + "\n", EmbedMsgLiveScore)
    //.addField("Minutes In Quarter:", `**${timeingame}**`)
    .setTimestamp()
    .setColor(SortScoreEmbedColor(AwScore, HScore, AwayTeamNameUppercase, HomeTeamNameUppercase))
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/932065347295645706/932069288704102450/NBA_Chat_Logo_Animated.gif"
    )
    .setFooter(livescoreFooter);

  const chan = await SapDiscClient.channels.fetch(ChanId)
  chan.send({
    embeds: [ScoreEmbed]
  })
  return;
}