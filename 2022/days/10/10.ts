// https://adventofcode.com/2022/day/10

let regX: number;
let cycle: number;
let sumStrength: number;
let screen: string[][];

export function adventMain(input: string): any {
    regX = 1;
    cycle = 1;
    sumStrength = 0;
    screen = [new Array(40), new Array(40), new Array(40), new Array(40), new Array(40), new Array(40)];
    const lines = input.split('\n');

    for(let line of lines) {
        if (line === "noop") {
            incrementCycleAndCalcStrength();
            continue;
        } else {
            incrementCycleAndCalcStrength();
            incrementCycleAndCalcStrength();
            let val = parseInt(line.split(' ')[1]!);
            regX += val;
        }
    }   
    for(let row of screen) {
        console.log(row.join(''));
    }
    return sumStrength;
}

function incrementCycleAndCalcStrength(): void{
    screen[Math.floor((cycle-1) / 40)]![((cycle-1) % 40)] =  (regX === ((cycle-1) % 40) || (regX - 1) === ((cycle-1) % 40) || (regX + 1) === ((cycle-1) % 40)) ? 'X' : '.'; // Update the screen.
    if( ((cycle + 20) % 40) === 0 && cycle <= 220) {
        let strength = (regX * cycle);
        sumStrength += strength;
    }
    cycle++;
}