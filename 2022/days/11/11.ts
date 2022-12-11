// https://adventofcode.com/2022/day/11

import { exit } from "process";

class Monke {
    items: number[];
    operand: string;
    opVal: number;
    testDiv: number;
    trueMonkey: number;
    falseMonkey: number;
    inspections: number;

    constructor(items: number[], operand: string, opVal: number, testDiv: number, trueMonkey: number, falseMonkey: number,) {
        this.items = items;
        this.operand = operand;
        this.opVal = opVal;
        this.testDiv = testDiv;
        this.trueMonkey = trueMonkey;
        this.falseMonkey = falseMonkey
        this.inspections = 0;
    }
}

export function adventMain(input: string): any {
    const lines = input.split('\n');
    
    let lcm = 1;
    // First, make the monkeys
    let monkeList: Monke[] = [];
    for(let i = 0; i < lines.length; i+=7) {
        let items: number[] = lines[i + 1]!.substring(18).split(', ').map(strNumber => parseInt(strNumber));
        let operand: string = lines[i + 2]!.charAt(23);
        let opVal: number = (lines[i + 2]!.substring(25) === 'old') ? -1 : parseInt(lines[i + 2]!.substring(25)); // Using -1 to signify 'old'
        let testDiv: number = parseInt(lines[i + 3]!.substring(21));
        lcm *= testDiv;
        let trueMonkey: number = parseInt(lines[i + 4]!.substring(29));
        let falseMonkey: number = parseInt(lines[i + 5]!.substring(30));
        monkeList.push(new Monke(items, operand, opVal, testDiv, trueMonkey, falseMonkey));
    }

    for(let round = 1; round <= 10000; round++) {
        for(let monke of monkeList) {
            for(let item of monke.items) {
                monke.inspections++;
                let worry = item;
                if(monke.operand === '*') {
                    worry *= (monke.opVal === -1) ? worry : monke.opVal;
                } else { // operand === +
                    worry += monke.opVal;
                }
                // worry = Math.floor(worry / 3);
                worry %= lcm;
                if (worry % monke.testDiv === 0) {
                    monkeList[monke.trueMonkey]!.items.push(worry);
                } else {
                    monkeList[monke.falseMonkey]!.items.push(worry);
                }
                monke.items = [];
            }
        }
    }

    const inspections: number[] = monkeList.map(monke => monke.inspections);
    inspections.sort((a, b) => a - b);

    return (inspections[inspections.length - 1]! * inspections[inspections.length - 2]!);
}
