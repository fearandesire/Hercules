<div align="center" id="top"> 
  <img src="https://i.imgur.com/3ITeih6.gifv" alt="NBAC LOGO" />

  &#xa0;

</div>

<h1 align="center">Hercules</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/fearandesire/Hercules?color=green">

  <img alt="NBAC Discord Users" src="https://img.shields.io/badge/NBAC%20Users-149%2C588-blue">

  <img alt="License" src="https://img.shields.io/github/license/fearandesire/Hercules">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/fearandesire/src?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/fearandesire/src?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/fearandesire/src?color=56BEB8" /> -->
</p>



<h4 align="center">
	<!-- 🚧  Hercules  🚀 Under construction.  🚧 -->
</h4> 

<hr> 

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-current-roadmap">Current Roadmap</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Packages</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-change-log">Change Log</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/fearandesire" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

Hercules works every day to connect the NBA fanbase closer to the sport. Built for Discord: currently, Hercules can provide accurate live-game scores on-demand, with automatic game-channel scheduling, standings, and more NBA-related content. The goal is to create a bridge where NBA Fans can stay within Discord (NBA Chat) and retrieve NBA information without leaving the app - retaining engagement and providing ease of access/QoL.

For details on each file and their purpose - please review the full [About Page](About.md)

## :sparkles: Current Roadmap ##

The list below will be a brief overview of the main planned features.
For a full overview, please view my [Hercules Project!](https://github.com/users/fearandesire/projects/3)

- Retrieve Player & Team Record Stats on-demand
- External Score Command (for channels outside the game channel)

## Statistics: ##

Hercules will capture usage stats for the common commands/functions such as but not limited to:

- Score
- Today's Games (Viewing schedule with ($tg, $todaysgames)
- Create Games
- Standings


## :rocket: Technologies ##

Packages & Tools that were key in achieving what I needed in this project.

- [Sapphire Framework](https://github.com/sapphiredev/framework)
- [Node.js](https://nodejs.org/en/)
- [Puppeteer](https://www.npmjs.com/package/puppeteer)
- [postgreSQL](https://www.postgresql.org)

## :white_check_mark: Change Log ##

You can view the [Change Log here](ChangeLog.md)

## :checkered_flag: Starting ##

This process is mainly noted for fellow NBA Chat staff.

1. After downloading the latest [Release](https://github.com/fearandesire/Hercules/releases), please do the following:

2. **Run:** ```npm install``` in terminal/directory of Hercules.js


3. **Add:** an .env file that has the following variables:
  - TOKEN (for the NBAC Bot and NOT the local version of the bot)
  - SQLusername
  - SQLiPAddress
  - SQLPass
  - SQLPort

4. **Run:** ```Hercules.js``` with either node.js or your own option.

5. After turning Hercules on, please use the ```$ld``` command (load database) to acquire the settings & info for the NBAC Server. This is required

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](https://github.com/fearandesire/Hercules/blob/local/LICENSE) file.


Made with :heart: by <a href="https://github.com/fearandesire" target="_blank">FENIX</a>

&#xa0;

<a href="#top">Back to top</a>
