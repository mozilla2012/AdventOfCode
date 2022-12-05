// https://adventofcode.com/2022/day/3

export function adventMain(input: string): number {
    console.log('Running day 03...');

    const rucksacks: string[] = input.split('\n');
    let sum: number = 0;
    
    rucksacks.forEach((rucksack)=>{
        if(rucksack.length % 2 !== 0) {
            throw new Error(`We have an odd number of items in a sack: ${rucksack}`);
        }
        const left: string[]  = rucksack.slice(0, rucksack.length / 2).split('');
        const right: string[] = rucksack.slice(rucksack.length / 2, rucksack.length).split('');

        for(const item of left) {
            if (right.includes(item)) {
                sum += getItemValue(item);
                break;
            }
        };
    });
    
    return sum;
}

function getItemValue(item: string) {
    const asciiVal = item.charCodeAt(0);
    if(asciiVal >= 'a'.charCodeAt(0) && 'z'.charCodeAt(0)) {
        return asciiVal - 'a'.charCodeAt(0) + 1;
    } else if(asciiVal >= 'A'.charCodeAt(0) && asciiVal <= 'Z'.charCodeAt(0)) {
        return asciiVal - 'A'.charCodeAt(0) + 27;
    }
    throw new Error(`Item [${item}] has a weird value.`);
}

