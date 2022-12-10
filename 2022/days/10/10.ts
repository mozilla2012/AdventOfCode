// https://adventofcode.com/2022/day/10

let regX: number;
let cycle: number;
let sumStrength: number;

export function adventMain(input: string): any {
    regX = 1;
    cycle = 1;
    sumStrength = 0;
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
    return sumStrength;
}

function incrementCycleAndCalcStrength(): void{
    if( ((cycle + 20) % 40) === 0 && cycle <= 220) {
        console.log(cycle);
        let strength = (regX * cycle);
        console.log(strength);
        sumStrength += strength;
    }
    cycle++;
}