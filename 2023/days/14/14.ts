// https://adventofcode.com/2023/day/14

// Part 1: 111339

/**
0 87
1 69
2 69
3 69
4 65
5 64
6 65
7 63
8 68
9 69
10 69
 */

export function adventMain(input: string): any {
    const lines = input.split('\n');
    const init: string[][] = [];
    for(let line of lines) {
        init.push(line.split(''));
    }
    let grid = rotateCcw(init); // Rotate so north is left.

    console.log('Start');
    printGridNorm(grid, 1);
    // const newThing = cycle(grid);
    // const newThing2 = cycle(newThing);
    // const newThing3 = cycle(newThing2);
    // printGridNorm(newThing, 1);

    let hash = 0;
    const checkStart = 1000;
    for(let c = 0; c < checkStart; c++) {
        grid = cycle(grid);
        hash = hashGrid(grid);
        // console.log(hash, calcLoad(grid));
    }
    // Time to detect a cycle.
    // const seen: number[] = [];
    // const cycleCheck: number[] = [];
    console.log()
    const originalCycle: Set<number> = new Set<number>();
    // let cycleStart = -1;
    for(let c = 0; c < 10000; c++) {
        grid = cycle(grid);
        hash = hashGrid(grid);
        originalCycle.add(hash);
        // if(seen.includes(hash) && cycleStart === -1) {
        //     cycleStart = c;
        //     cycleCheck.push(hash);
        // } else if (seen.includes(hash)) {

        // }
        // seen.push(hash);
        // console.log(hash);
    }
    const cycleSize = originalCycle.size;
    console.log('Cycle is ', originalCycle.size);

    // Determine where cycle starts.
    console.log('Finding cycle');
    grid = rotateCcw(init); // STARTING OVER.
    let lastSeenHashes: number[] = [];
    let hashScores: number[] = [];
    let cycleStart = 0;
    for(let c = 0; c < checkStart; c++) {
        grid = cycle(grid);
        hash = hashGrid(grid);
        lastSeenHashes.push(hash);
        hashScores.push(calcLoad(grid));
        if(lastSeenHashes.length > originalCycle.size) {
            lastSeenHashes.shift();
            hashScores.shift();
        }
        // console.log(lastSeenHashes);
        if(Array.from(originalCycle).every((cycleHash: number)=>lastSeenHashes.includes(cycleHash))) {
            console.log('Cycle found!', c, originalCycle);
            cycleStart = c-cycleSize + 1;
            console.log('Starts at c = ', cycleStart);
            console.log(hashScores);
            break;
        }
    }

    // Hash seen at ten:
    const target = 1000000000 - 1;
    const index = (target - cycleStart) % cycleSize;
    // const targetHash = lastSeenHashes[index];
    const targetLoad = hashScores[index];


    // NORTH MUST BE UP.
    // return 0;    
    return targetLoad; // DELETE THIS
    // return calcLoad(grid);
}

function hashGrid(grid: string[][]): number {
    const gridStr = grid.map((row: string[])=>row.join('')).join('');
    // console.log(gridStr);
    return hashString(gridStr);
    // for(let row of grid) {
    //     let linhash = hashString(row.join(''));
    //     console.log('hash', linhash);
    //     hash += linhash;
    // }
    // return hash;
}

// Copied from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const hashString = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};


function cycle(grid: string[][]): string[][] {

    slideGrid(grid);
    // console.log('Slide 1');
    // printGridNorm(grid, 1);

    const rotated = rotateCw(grid);
    slideGrid(rotated);
    // console.log('Slide 2');
    // printGridNorm(rotated, 2);

    const rotated2 = rotateCw(rotated);
    slideGrid(rotated2);
    // console.log('Slide 3');
    // printGridNorm(rotated2, 3);

    const rotated3 = rotateCw(rotated2);
    slideGrid(rotated3);
    // console.log('Slide 4');
    // printGridNorm(rotated3, 4);

    const rotated4 = rotateCw(rotated3);
    return rotated4;
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
        // console.log('checking', line.join(''));
        for (let i = 0;  i < line.length; i++) {
            if(line[i] === 'O') {
                // console.log('Found r at i', foundRocks, i);
                sum += (line.length - i);
                // console.log('Sum is now', sum);
            }
        }
    }
    return sum;
}


// function calcLoad(grid: string[][]) {
//     let sum = 0;
//     for(let line of grid) {
//         // console.log('checking', line.join(''));
//         let foundRocks = 1;
//         let start = 0;
//         for (let i = 0;  i < line.length; i++) {
//             if(line[i] === 'O') {
//                 // console.log('Found r at i', foundRocks, i);
//                 sum += (1 + line.length - (start) - foundRocks++);
//                 // console.log('Sum is now', sum);
//             }
//             if(line[i] === '#') {
//                 start = i+1;
//                 foundRocks = 1;
//             }
//         }
//     }
//     return sum;
// }


function rotateCcw(thing: any[][]): any[][] {
    return rotateCw(rotateCw(rotateCw(thing)));
}

function rotateOpp(thing: any[][]): any[][] {
    return rotateCw(rotateCw(thing));
}

function rotateCw(thing: any[][]): any[][] {
    return thing[0]!.map((_, colIndex) => thing.map(row => row[colIndex]).reverse())
}

function printGridNorm(g: string[][], rotate: number) {
    let grid: string[][];
    switch (rotate) {
        case 1:
            grid = rotateCw(g);
            break;
        case 2:
            grid = JSON.parse(JSON.stringify(g));
            break;
        case 3:
            grid = rotateCcw(g);
            break;
        case 0:
        case 4:
            grid = rotateOpp(g);
            break;
    }
    grid!.forEach((s)=> console.log(s.join('')));
    console.log();
}

function printGrid(grid: any[][]) {
    grid.forEach((s)=> console.log(s.join('')));
    console.log();
}

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
