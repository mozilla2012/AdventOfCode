// https://adventofcode.com/2023/day/3

class Gear {
    x: number;
    y: number;
    numbers: Set<number>; // adjacent part numbers

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.numbers = new Set();
      }
}

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let grid: string[][] = [];
    for(let line of lines) {
        let lineArray = [];
        for (let char of line) {
            lineArray.push(char);
        }
        grid.push(lineArray);
    }

    const length: number = grid.length;
    const width: number = grid[0]!.length;
    let gearList: Gear[] = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            const currentChar: string = grid[x]![y]!;
            const originalY = y;
            if(!Number.isNaN(parseInt(currentChar))) {
                let compoundNum: string = currentChar;
                while(y < width - 1 && !Number.isNaN(parseInt(grid[x]![y+1]!))) {
                    compoundNum += grid[x]![++y];
                }
                gearList = [...gearList, ...getAdjacentGears(grid, length, width, x, originalY, compoundNum)];
            }
        }
    }
    
    // Consolidate gears
    let gearSet: Gear[] = [];
    gearList.forEach((potentialGear: Gear) => {
        const validGear: Gear | undefined = gearSet.find((validGear) => validGear.x == potentialGear.x && validGear.y == potentialGear.y);
        if(validGear) {
            potentialGear.numbers.forEach((adjacentNumber: number) => {
                validGear.numbers.add(adjacentNumber);
            });
        } else {
            gearSet.push(potentialGear);
        }
    })

    // For gears with 2 adjacent neighbors, add to the ratio.
    let ratioSum = 0;
    gearSet.forEach((gear: Gear) => {
        if(gear.numbers.size === 2) {
            const adjacentParts: number[] = Array.from(gear.numbers.values());
            ratioSum += adjacentParts[0]! * adjacentParts[1]!;
        }
    });

    return ratioSum;
}

function getAdjacentGears(grid: string[][], length: number, width: number, numX: number, numY: number, compoundNum: string): Gear[] {
    const startingX = Math.max(0, numX - 1);
    const endingX = Math.min(width - 1, numX + 1);
    const startingY = Math.max(0, numY - 1);
    const endingY = Math.min(length - 1, numY + compoundNum.length);

    let adjacentGears: Gear[] = [];
    for (let x = startingX; x <= endingX; x++) {
        for (let y = startingY; y <= endingY; y++) {
            if(grid[x]![y]! === '*' ) {
                const newGear: Gear  = new Gear(x, y);
                newGear.numbers.add(Number(compoundNum));
                adjacentGears.push(newGear);
            }
        }
    }
    return adjacentGears;
}

// Part 1

// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     let grid: string[][] = [];
//     for(let line of lines) {
//         let lineArray = [];
//         for (let char of line) {
//             lineArray.push(char);
//         }
//         grid.push(lineArray);
//     }

//     const length: number = grid.length;
//     const width: number = grid[0]!.length;
//     let sum = 0;
//     for (let x = 0; x < width; x++) {
//         for (let y = 0; y < width; y++) {
//             const currentChar: string = grid[x]![y]!;
//             const originalY = y;
//             if(!Number.isNaN(parseInt(currentChar))) {
//                 let compoundNum: string = currentChar;
//                 while(y < width - 1 && !Number.isNaN(parseInt(grid[x]![y+1]!))) {
//                     compoundNum += grid[x]![++y];
//                 }
//                 sum += (isValidPartNumber(grid, length, width, x, originalY, compoundNum.length))
//                     ? parseInt(compoundNum)
//                     : 0;
//             }
//         }
//     }
//     return sum;
// }
// function isValidPartNumber(grid: string[][], length: number, width: number, numX: number, numY: number, numberLength: number): boolean {
//     const startingX = Math.max(0, numX - 1);
//     const endingX = Math.min(width - 1, numX + 1);
//     const startingY = Math.max(0, numY - 1);
//     const endingY = Math.min(length - 1, numY + numberLength);

// for (let x = startingX; x <= endingX; x++) {
//     for (let y = startingY; y <= endingY; y++) {
//         const charToAnalyze = grid[x]![y]!;
//         if(charToAnalyze === '.' || !Number.isNaN(parseInt(charToAnalyze))) {
//             continue;
//         } else {
//             return true;
//         }
//     }
// }
//     return false;
// }
