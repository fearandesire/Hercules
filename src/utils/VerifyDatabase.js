import {
    container
} from '@sapphire/pieces';

export function VerifyDatabase() {
    var serverlocalornot = container.WhichServer;
    if (serverlocalornot == 'Local') {
        return 'Local'
    } else
    if (serverlocalornot == 'NBAC') {
        return 'NBAC'
    } else
    if (serverlocalornot != 'Local' || serverlocalornot != 'NBAC') {
        return 'No Database is loaded'
    }
}