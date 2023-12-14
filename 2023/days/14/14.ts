// https://adventofcode.com/2023/day/14

import { hashGrid, rotateCcw, rotateCw } from "../../util/utils";

export function adventMain(input: string): any {
    const lines = input.split('\n');
    const init: string[][] = [];
    for(let line of lines) {
        init.push(line.split(''));
    }
    let grid = rotateCcw(init); // Rotate so north is left at first.
    let hash = 0;
    const checkStart = 200;
    for(let c = 0; c < checkStart; c++) { // Get some ways into the cycle before checking.
        grid = runCycle(grid);
        hash = hashGrid(grid);
    }
    const originalCycle: Set<number> = new Set<number>(); // Detect cycle length. Just run for a while and get the set size. 
    for(let c = 0; c < 100; c++) { // I don't think this is really a correct way to detect a cycle but it works for this case?
        grid = runCycle(grid);
        hash = hashGrid(grid);
        originalCycle.add(hash);
    }
    const cycleSize = originalCycle.size; 
    grid = rotateCcw(init); // STARTING OVER.
    let lastSeenHashes: number[] = [];
    let hashScores: number[] = [];
    let cycleStart = 0;
    for(let c = 0; c < checkStart; c++) { // Determine WHERE cycle starts.
        grid = runCycle(grid);
        hash = hashGrid(grid);
        lastSeenHashes.push(hash);
        hashScores.push(calcLoad(grid));
        if(lastSeenHashes.length > originalCycle.size) {
            lastSeenHashes.shift();
            hashScores.shift();
        }
        if(Array.from(originalCycle).every((cycleHash: number)=>lastSeenHashes.includes(cycleHash))) {
            cycleStart = (c - cycleSize) + 1;
            break;
        }
    }
    return hashScores[(1000000000 - cycleStart - 1) % cycleSize];
}

function runCycle(g: string[][]): string[][] {
    let grid: string[][] = JSON.parse(JSON.stringify(g));
    for(let i = 0; i < 4; i++) {
        slideGrid(grid);
        grid = rotateCw(grid);
    }
    return grid;
}

function slideGrid(grid: string[][]) {
    for(let line of grid) {
        let lastEmpty = 0;
        for (let i = 0;  i < line.length; i++) {
            if(line[i] === 'O' && i > lastEmpty) {
                line[i] = '.';
                line[lastEmpty] = 'O';
                lastEmpty += 1;
            } else if(line[i] === 'O') {
                lastEmpty++;
            } else if (line[i] === '#') {
                lastEmpty = i+1;
            }
        }
    }
}

function calcLoad(grid: string[][]) {
    let sum = 0;
    for(let line of grid) {
        for (let i = 0;  i < line.length; i++) {
            if(line[i] === 'O') {
                sum += (line.length - i);
            }
        }
    }
    return sum;
}

// Part 1

// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     const grid: string[][] = [];
//     for(let line of lines) {
//         grid.push(line.split(''));
//     }
//     const rotated = rotateCcw(grid);
//     printGrid(grid);
//     printGrid(rotated);

//     let sum = 0;
//     for(let line of rotated) {
//         console.log('checking', line.join(''));
//         let foundRocks = 1;
//         let start = 0;
//         for (let i = 0;  i < line.length; i++) {
//             if(line[i] === 'O') {
//                 console.log('Found r at i', foundRocks, i);
//                 sum += (1 + line.length - (start) - foundRocks++);
//                 console.log('Sum is now', sum);
//             }
//             if(line[i] === '#') {
//                 start = i+1;
//                 foundRocks = 1;
//             }
//         }
//     }

//     return sum;
// }

// function rotateCcw(thing: any[][]): any[][] {
//     return rotateCw(rotateCw(rotateCw(thing)));
// }

// function rotateCw(thing: any[][]): any[][] {
//     return thing[0]!.map((_, colIndex) => thing.map(row => row[colIndex]).reverse())
// }

// function printGrid(grid: any[][]) {
//     grid.forEach((s)=> console.log(s.join('')));
//     console.log();
// }
