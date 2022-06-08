- #general chat msg when game channel opens
- **$about** cmd
- **$cleargames** - removes all scheduled games
- **$deletecr** - same as above
- **$deleteq** - re-worked for simplicity. See [About.md](About.md)
- **$help** cmd (alias for $cmds)
- **$ls** - lists all scheduled games.
- **$qg** - cmd: re-named the $pg // $postgames commands
- **$score** cmd rewritten - Hercules scrapes for all NBA Data now.
  - ~3s resp time with vastly improved accuracy
  - embed re-designed & color will be of the current team that is winning.
  - halftime & game over responses
- **$tg** - response for no games today
- Database Implementation - A majority of data Hercules uses has been placed into an SQL Database. Allows for on-the-fly customization.
- Usage stats - Collecting stats on common cmds.


