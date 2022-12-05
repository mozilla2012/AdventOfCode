// https://adventofcode.com/2022/day/3

export function adventMain(input: string): number {
    console.log('Running day 03...');

    const rucksacks: string[] = input.split('\n');
    let sum: number = 0;
    
    // Part 1 ================================
    // rucksacks.forEach((rucksack)=>{
    //     if(rucksack.length % 2 !== 0) {
    //         throw new Error(`We have an odd number of items in a sack: ${rucksack}`);
    //     }
    //     const left: string[]  = rucksack.slice(0, rucksack.length / 2).split('');
    //     const right: string[] = rucksack.slice(rucksack.length / 2, rucksack.length).split('');

    //     for(const item of left) {
    //         if (right.includes(item)) {
    //             sum += getItemValue(item);
    //             break;
    //         }
    //     };
    // });
    // Part 1 ================================

    // Part 2 ================================
    if(rucksacks.length % 3 !== 0) {
        throw new Error(`We don't have the proper number of elves; must be divisible by 3.`);
    }

    for (let i = 2; i < rucksacks.length; i += 3) {
        // For each elf in this group, get unique items in their pack.
        const elf1Set: Set<string> = new Set();
        const elf2Set: Set<string> = new Set();
        const elf3Set: Set<string> = new Set();
        rucksacks[i-2]!.split('').forEach(element => { elf1Set.add(element)});
        rucksacks[i-1]!.split('').forEach(element => { elf2Set.add(element)});
        rucksacks[i-0]!.split('').forEach(element => { elf3Set.add(element)});

        // Combine sets into one array, then count the instances of each item in that array.
        const allItems: string[] = Array.from(elf1Set).concat(Array.from(elf2Set), Array.from(elf3Set));
        const counts: any = {};
        for(const item of allItems) { 
            counts[item] = (counts[item] || 0) + 1; 
            if (counts[item] === 3) {
                sum += getItemValue(item);
            }
        };
    }
    // Part 2 ================================
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

