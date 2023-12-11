// https://adventofcode.com/2023/day/11

const rowsToAdd = 1000000 - 1;
export function adventMain(input: string): any {
    const lines = input.split('\n');
    const space: string[][] = lines.map((line: string) => line.split('')); // Read in input.
    const emptyRows: number[] = []; // Count empty rows.
    for(let r = 0; r < space.length; r++) {
        if (!space[r]!.includes('#')) {
            emptyRows.push(r);
        }
    }
    const emptyCols: number[] = []; // Count empty rows.
    for(let c = 0; c < space[0]!.length; c++) {
        if(!space.some((row: string[]) => row[c] === '#')) {
            emptyCols.push(c);
        }
    }
    const stars: [number, number][] = []; // Make a list of all stars.
    for(let r = 0; r < space.length; r++) {
        for(let c = 0; c < space[0]!.length; c++) {
            if(space[r]![c]! === '#'){
                stars.push([r, c]);
            }
        }
    }
    let sum = 0;
    for(let startStar of stars) { // Do some math to calculate distance between stars.
        for(let targStar of stars) {
            sum += Math.abs(startStar[0] - targStar[0]) + Math.abs(startStar[1] - targStar[1])
            for(let row of emptyRows) {
                if((startStar[0] < row && targStar[0] > row) || (startStar[0] > row && targStar[0] < row)) {
                    sum += rowsToAdd;
                }
            }
            for(let col of emptyCols) {
                if((startStar[1] < col && targStar[1] > col) || (startStar[1] > col && targStar[1] < col)) {
                    sum += rowsToAdd;
                }
            }
        }
    }
    return sum/2;
}

// Part 1
// const GAL = '#';

// export function adventMain(input: string): any {
//     const lines = input.split('\n');
    
//     // Read in input.
//     const space: string[][] = [];
//     for(let line of lines) {
//         space.push(line.split(''));
//     }

//     // printGrid(space);
//     // Expand space. Rows first.
//     for(let r = 0; r < space.length; r++) {
//         const line: string[] = space[r]!;
//         if (!line.includes(GAL)) {
//             space.splice(r, 0, [...line]);
//             r++;
//         }
//     }

//     // Then expand columns.
//     for(let c = 0; c < space[0]!.length; c++) {
//         let includesGal = false;
//         for(let r = 0; r < space.length; r++) {
//             if(space[r]![c] === GAL) {
//                 includesGal = true;
//                 break;
//             }
//         }
//         if(!includesGal) {
//             // Add column
//             for (let row of space){
//                 row.splice(c, 0, '.');
//             }
//             c++;
//         }
//     }

//     // Make a list of all stars.
//     const stars: [number, number][] = [];

//     for(let r = 0; r < space.length; r++) {
//         for(let c = 0; c < space[0]!.length; c++) {
//             if(space[r]![c]! === GAL){
//                 stars.push([r, c]);
//             }
//         }
//     }

//     let sum = 0;
//     // Do some math to calculate distance between stars.
//     for(let startStar of stars) {
//         for(let targStar of stars) {
//             sum += Math.abs(startStar[0]-targStar[0]) + Math.abs(startStar[1]-targStar[1])
//         }
//     }
//     return sum/2;
// }
