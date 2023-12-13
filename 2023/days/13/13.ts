// https://adventofcode.com/2023/day/13

const TARGET_DIFFERENCE = 1; // Change this to zero for part 1
export function adventMain(input: string): any {
    const lines = input.split('\n');
    let grid: string[][] = [];
    let sum = 0;
    for(let i = 0; i < lines.length; i++) {
        if (lines[i]!.length < 1) {
            sum += findValForGrid(grid);
            grid = [];
        } else {
            grid.push(lines[i]!.split(''));
        }
    }
    return sum;
}

function transpose(thing: any[][]): any[][] {
    return thing[0]!.map((_, colIndex) => thing.map(row => row[colIndex]))
}

function countDifferingChars(s1: string, s2: string): number {
    let diff = 0;
    for(let i = 0; i < s1.length; i++) {
        if(s1[i] !== s2[i]) {
            diff++;
        }
    }
    return diff;
}

function findValForGrid(grid: string[][]): number {
    let retVal = 0;
    for(let i = 0; i < grid.length-1; i++) { // find vertical mirrors:
        let numDifferentCharacters = 0;
        for(let j = i+1, k = i; (j < grid.length && k >= 0); j++, k--) {
            numDifferentCharacters += countDifferingChars(grid[k]!.join(''), grid[j]!.join(''));
        }
        if (numDifferentCharacters === TARGET_DIFFERENCE) {
            retVal += 100*(i+1);
        }
    }
    const transGrid = transpose(grid);    // Check horizontal mirror
    for(let i = 0; i < transGrid.length-1; i++) {
        let numDifferentCharacters = 0;
        for(let j = i+1, k = i; (j < transGrid.length && k >= 0); j++, k--) {
            numDifferentCharacters += countDifferingChars(transGrid[k]!.join(''), transGrid[j]!.join(''));
        }
        if (numDifferentCharacters === TARGET_DIFFERENCE) {
            retVal += i+1;
        }
    }
    return retVal;
}
