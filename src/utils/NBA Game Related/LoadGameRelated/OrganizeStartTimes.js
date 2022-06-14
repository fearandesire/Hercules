import { container } from "@sapphire/pieces";

export function OrganizeStartTimes(GSTObj, startTimes) {
    for (let index = 0; index < startTimes.length; index++) {
        if (index == 0) {
            GSTObj[0] = startTimes[index]
        } else if (index == 1) {
            GSTObj[2] = startTimes[index]
            container.GameCount = 2;
        } else {
            let newIndex = container.GameCount + 2;
            container.GameCount = newIndex;
            GSTObj[newIndex] = startTimes[index]
        }
    }
}