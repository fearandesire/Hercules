import {
  Command
} from '@sapphire/framework';
import {
  AboutEmbed
} from '../lib/CommandListEmbed/AboutEmbed.js';
import {
  usermodManagement
} from '../lib/CommandListEmbed/ManagementEmbed.js';
import {
  usermodDefault
} from '../lib/CommandListEmbed/ModEmbed.js';
import {
  usernotmod
} from '../lib/CommandListEmbed/RegularUserEmbed.js';
import {
  usermodScheduling
} from '../lib/CommandListEmbed/SchedulingEmbed.js';
import {
  usermodUtility
} from '../lib/CommandListEmbed/UtilityEmbed.js';
import { WhatsNewGithubCall } from '../utils/WhatsNewGitCall.js';
export class cmdlist extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: "commands",
      aliases: ["cmds", "help"],
      description: "Command List",
    });
  }
  async messageRun(message, args) {
    const permissioncheck = message.member.permissions.has('MANAGE_NICKNAMES');
    const text = await args.rest('string').catch(() => null);
    if (permissioncheck === false) {
      usernotmod(message);
      return;
    }
    if (text === null && permissioncheck === true) {
      usermodDefault(message)
      return;
    }
    const InputLowerCase = text.toLowerCase();
    if (InputLowerCase === "scheduling" || InputLowerCase === "schedule") {
      usermodScheduling(message)
      return;
    }
    if (InputLowerCase === "management" || InputLowerCase === "manage" || InputLowerCase === "mng") {
      usermodManagement(message)
      return;
    }
    if (InputLowerCase === "utility" || InputLowerCase === "util") {
      usermodUtility(message)
      return;
    }
    if (InputLowerCase === "about") {
      AboutEmbed(message)
      return;
    }
    if (InputLowerCase === "whatsnew") {
      WhatsNewGithubCall(message)
      return;
    } else {
      message.reply("Invalid input.")
    }

  }
}