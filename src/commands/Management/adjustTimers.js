import {
    Command
} from '@sapphire/framework';
import { sortTargetCell } from '../../utils/SQL/sortTargetCell.js';
import { SendErrorEmbed } from './../../utils/Send Embeds/ErrorReplyEmbed.js';
export class adjustTimers extends Command {
constructor(context, options) {
super(context, {
...options,
name: 'adjustTimers',
aliases: ['adjtime', 'changetimers', 'dailytimers', 'adt', 'adjustimers'],
description: 'Description',
requiredUserPermissions: ['KICK_MEMBERS']
});
}
async messageRun(message, args) {
const TargetCell = await args.pick("string").catch(() => null);
const NewCronTime = await args.pick("string").catch(() => null);
if (TargetCell === null){
    SendErrorEmbed(message, `Please provide the specific timer you wish to adjust. Options: *games*, *standing* and *todaysgames*`)
    return;
}
if (!TargetCell.toLowerCase().match(/^(games|standings|todaysgames)$/i)){
    SendErrorEmbed(message, `Please provide the specific timer you wish to adjust. Options: *games*, *standing* and *todaysgames*`)
    return;
}
if (NewCronTime === null){
    SendErrorEmbed(`Please provide the new cron time you wish to use.`, message)
    return;
}
//? loose safety check to make sure the user is providing a valid cron time
var verifyFormat = NewCronTime.includes('*')
if (!verifyFormat){
    SendErrorEmbed(message, `Please provide a valid time. Example: 3 AM would translate as '0 3 * * *'`)
    return;
}
sortTargetCell(TargetCell, NewCronTime, message)
}
}