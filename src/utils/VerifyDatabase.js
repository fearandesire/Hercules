import {
    container
} from '@sapphire/pieces';
import {
    red,
    yellowBright,
    green,
    bold,
    logthis,
    noDbLoadedMsg
} from '../lib/hercConfig.js'

export function VerifyDatabase() {
    var serverlocalornot = container.WhichServer;
    if (serverlocalornot == 'LOCAL') {
        return 'LOCAL'
    } else
    if (serverlocalornot == 'NBAC') {
        return 'NBAC'
    } else
    if (serverlocalornot != 'LOCAL' || serverlocalornot != 'NBAC') {
        return 'No Database is loaded'
    }
}