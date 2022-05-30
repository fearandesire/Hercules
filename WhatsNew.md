- #general chat msg when game channel opens
- **$cleargames** - removes all scheduled games
- **$deletecr** - same as above
- **$deleteq** - re-worked for simplicity. See [About.md](https://github.com/fearandesire/Hercules/blob/main/About.md)
- **$ls** - clearly lists all scheduled games. No code jargon.
- **$qg** - command: re-named the $pg // $postgames command
- **$score** command rewritten - Hercules will individually handle the scraping for all NBA Data now.
  - ~3s response time with vastly improved accuracy
  - embed re-designed & its color will be of the current team that is winning.
  - halftime & game over responses
- **$tg** - will correctly respond when there are no games for the day.
- **$whatsnew** - command displays any new updates summarized within an embed.
- Converted // Implemented ES6
- Database Implementation - A majority of data Hercules will use for its main functions has been placed into an SQL Database. This was to create a way to customize Hercules on the fly without restarting the bot and affecting current Game Channels already open.
- Designed a logo for Hercules
- Hercules presence/info/docs:
  - **$about** command
  - added $help as another alias for $cmds
  - Designed a logo for Hercules
- Usage stats - Hercules will collect and store statistics for the most common operations. This is mostly for data and statistical purposes and will allow for tracking growth, usage & more.



