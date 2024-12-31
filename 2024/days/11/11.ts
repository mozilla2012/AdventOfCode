// https://adventofcode.com/2024/day/11

type blinksCountMap = Map<number, number>; // If a stone has X blinks left, how many stones will result?
type stoneMap = Map<number, blinksCountMap>; // Given a stone's number, get the blinksCountmap.

const mapping: stoneMap = new Map();
export function adventMain(input: string): any {
    const val = countStones(input.split(' ').map( s => parseInt(s)), (75 - 1));
    return val;
}

function countStones(stones: number[], remainingBlinks: number): number {
    return stones.reduce((sum, stone: number) => {
        let blinkMap: blinksCountMap = new Map();
        if (mapping.has(stone)) {
            blinkMap = mapping.get(stone);
            if (blinkMap.has(remainingBlinks)) {
                return sum + blinkMap.get(remainingBlinks);
            }
        }
        // If we have a cache miss, calculate the new count for the new numbers.
        let newStones: number[] = [];
        const strNum = String(stone);
        if(stone !== 0 && strNum.length % 2 === 0) {
            newStones.push(parseInt(strNum.slice(0, strNum.length/2)));
            newStones.push(parseInt(strNum.slice(strNum.length/2)));
        } else {
            newStones.push((stone === 0) ? 1 : stone * 2024);
        }
        blinkMap.set(remainingBlinks, 
            (remainingBlinks > 0) 
                ? countStones(newStones, remainingBlinks - 1) 
                : newStones.length);
        mapping.set(stone, blinkMap);
        return sum + blinkMap.get(remainingBlinks);
    }, 0);
}
