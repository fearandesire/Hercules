import { container } from "@sapphire/pieces";
import { gameArrayDelete } from "../../../lib/hercConfig.js";

export function QueDeleteChannels(gcArrayTitle, gamemngr, gamedeletemngr, LowerCaseTitle, ServerCache, DeleteTime) {
gameArrayDelete.push(`**Deleting: ${gcArrayTitle} channel at: ${container.dt}**`)
//* * Scheduling game channels to be deleted
gamedeletemngr.add(
  `Delete-${LowerCaseTitle}`,
  DeleteTime,
  () => {
    gamemngr.deleteJob(LowerCaseTitle)
    if (
      ServerCache.channels.cache.some(
        (channel) => channel.name === LowerCaseTitle
      )
    ) {
      ServerCache.channels.cache
        .find((channel) => channel.name === LowerCaseTitle)
        .delete();
    } else {
      console.log(
        "Game Chat Deleted Prior - This message is to avoid shutdown"
      );
    }
  }
);
gamedeletemngr.start(`Delete-${LowerCaseTitle}`);

}