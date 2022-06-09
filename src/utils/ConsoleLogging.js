import { blueBright, bold, cborder, green, magentaBright, red, yellow } from "../lib/hercConfig.js";
export function LogBorder(){
    return console.log(magentaBright(bold(`\n ${cborder} \n`)));
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