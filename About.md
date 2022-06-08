
**<h1 align=center> About Hercules </center>**
<p align="center">
*Dedicating a page to explaining the code outside of comments within the script*<br/>
*Simple & || or self-explainatory files will either be skipped or briefly mentioned as self explainatory with some minor
notes.*<br/></center>
🚧 **This will be expanded - TBD** 🚧
<br/><br/>
<p align="center">

  File Breakdown  &#xa0; | &#xa0; 
  Launch Files  &#xa0; | &#xa0; 
  ./Util Folder  &#xa0; | &#xa0; 
  Commands  &#xa0; | &#xa0; 
  Daily Operations
  </p>






# File Breakdown #

## Launch Files ##

𝗛𝗲𝗿𝗰𝘂𝗹𝗲𝘀.𝗷𝘀 - Initiate the bot & log into Discord.

𝗿𝗲𝗮𝗱𝘆.𝗷𝘀 - Launchint right after Hercules.js, ready.js will start the que for all everyday tasks, such as
scheduling NBA Games, screenshot the official schedule and standings. -

# ./Util Folder #

ScrapeGameScore.𝗷𝘀 - Using Puppeteer, ScrapeGameScore.js is responsible for scraping and transcribing the official NBA
schedule. I’ve chosen ESPN for the source of all NBA information for several reasons. ScrapeGameScore.js will grab the
team names & the respective start times for these games. Within this same file, we store this information into arrays
and objects to be further manipulated within this, and other files.

𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗲𝗡𝗕𝗔𝗚𝗮𝗺𝗲𝘀.𝗷𝘀 - Compiles the data from ScrapeGameScore.js with a classic for each loop. This
file will iterate through each game and properly input their information to que their respective game channels.

𝗖𝗹𝗼𝘀𝗲𝗣𝗿𝗲𝗱𝗶𝗰𝘁𝗼𝗿𝗖𝗵𝗮𝗻𝗻𝗲𝗹.js - This will be one of the files that uses information that originated from
ScheduleNBGames.js. In this case, I use the time of the earliest NBA Game that is due for the day, and setup a schedule
for the day to manage the Predictor channels. Additionally, this file will re-name and re-arrange the order of the
Predictor Channels for QoL.

𝗗𝗮𝗶𝗹𝘆𝗚𝗮𝗺𝗲𝗦𝘁𝗮𝗻𝗱𝗶𝗻𝗴𝘀.js - Screenshots ESPN Game Schedule. This is setup on a daily schedule que
(dailyStandingsManager)

𝗚𝗮𝗺𝗲𝗦𝘁𝗮𝗿𝘁𝗶𝗻𝗴𝗦𝗼𝗼𝗻.js - Alert general chat that an NBA Game is starting soon

𝗚𝗿𝗮𝗯𝗟𝗶𝘃𝗲𝗦𝗰𝗼𝗿𝗲.js - Self explainatory.


## Commands ##

**listschedule.js** - This will show the scheduled games list. Schedule collected from Hercules & the $cr command.
- This will display the **index**; basically numbering each game that is scheduled in order of creation.


**deleteq.js** - Deletes a game via the index provided. Usage definition/example; after using ```$ls```, you will see a
numbered list of games/matchups. The numbers associated are the order of when the games were queued, or aka index. The
first game will be 1, and to delete the first game in this example, you would type ```$deleteq 1```. This process is the
exact same for the ```$deletecr``` command



## Daily Operations ##

Hercules has a total of 4 schdeuled daily tasks.

Hercules will collect:
+ Standings (Image)
+ Schedule (Image)

Hercules will schedule:
+ Game Channels
+ Deletion of Game Channels