<h1 align="center">Change Log</h1>

v2.00

- #general chat will be notified when a game channel opens
- **$cg** or **$cleargames** command: this will remove all scheduled games
- $mg command has another alias called $ms which is it's real name - Manual Screenshot
- $postgames // $pg command has been renamed to **$qg** or **$quegames**
- $tg has an additional response for when there are no games due for the day.
- Added database verification for all commands that need server related data
- Cleaned some code, but a long way to go
- Designed Hercules Logo and solidifying Hercules presence
- ES6 Implementation
- Embed responses for most of the bots output/reply messages
- New Command: **$about** command to provide info on the bot
- New Command: **$ls** or **$listschedule** will list the games currently scheduled by Hercules and from $cr
    - [Review About.md](About.md) for a clear understanding on how to delete games now
- New Command: **$whatsnew** (aliases: **$wn** or **$changelogs**)
    - displays an embed of any updates in [What's New](WhatsNew.md)
- New command: **$vs** (verify server). This will check if the server's database is loaded or not
- Organize file tree
- Replaced a majority of plain text responses & errors from Hercules into pretty embed responses.
- Re-worked **$deleteq** - we can now type the number a game's ID number ($vg ids) and delete it via that to save typing
    - $deletecr or $deletecreatedgame which will delete any game made with $cr
- SQL Database Integration -- Must run $ld (load database) command when the bot is restarted to load the server settings
- Score command re-written. Disbanded rapidAPI use and now using Puppeteer
    - Response time decreased to ~3 seconds
    - The embed color for score's response will reflect the *winning team's colors* (if the game tied, it will be random)
- Usage Stats for all commonly used commands
- Validity & Response for $tg and if Hercules was successful in collecting the schedule image