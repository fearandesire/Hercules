import { blueBright, bold, cborder, cyanBright, green, magentaBright, red, yellow } from "../lib/hercConfig.js";
export function LogBorder(){
    return console.log(magentaBright(bold(`${cborder}`)));
}

export function LogGreen(text){
    return console.log(green(bold(text)));
}

export function LogYellow(text){
    return console.log(yellow(bold(text)));
}

export function LogRed(text){
    return console.log(red(bold(text)));
}

export function LogBlue(text){
    return console.log(blueBright(bold(text)));
}

export function LogCyan(text){
    return console.log(cyanBright(bold(text)));
}