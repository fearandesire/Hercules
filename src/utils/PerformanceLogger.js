import now from 'performance-now';
import prettyMilliseconds from 'pretty-ms';
import { LogGreen } from "./ConsoleLogging.js";

export function ReturnPerformance(start, fileName)
{
    var end = now();
    var endTimev1 = (start - end.toFixed(3));
    var timetoString = JSON.stringify(endTimev1);
    var endTimePrePretty = timetoString.replace(/'|"|-/gm, '');
    var endTimeInt = parseInt(endTimePrePretty)
    var endTime = prettyMilliseconds(endTimeInt, {formatSubMilliseconds: true});
    LogGreen(`[${fileName}.js] Performance Time: ${endTime}`)
}