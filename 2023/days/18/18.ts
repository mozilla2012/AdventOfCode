// https://adventofcode.com/2023/day/18

// https://adventofcode.com/2023/day/18

import { transpose } from "../../util/utils";

interface Segment {
    dir: String;
    distance: number;
    color: string;
}

interface Hole {
    dug: boolean;
    color: string;
    counted: boolean;
}

// First hole is of blank color. Then every hole dug in the direction takes the color.

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let maxUp = 0;
    let maxDown = 0;
    let maxRight = 0;
    let maxLeft = 0;
    const segments: Segment[] = [];
    // Parse the input into segment objects.
    for(let line of lines) {
        const parts = line.split(' ');
        // const dir: string = parts[0]!;
        // const distance: number = parseInt(parts[1]!);
        const color: string = parts[2]!;
        const distStr: string = color.substring(2, color.length-2);
        const distance: number = parseInt(distStr, 16);
        const dirStr: string = color.charAt(color.length-2);
        const dir = (dirStr === '0') ? 'R' :
            (dirStr === '1') ? 'D' :
            (dirStr === '2') ? 'L' : 'U';

        segments.push({dir, distance, color});
        if (dir === 'U') { maxUp += distance; }
        if (dir === 'D') { maxDown += distance; }
        if (dir === 'L') { maxLeft += distance; }
        if (dir === 'R') { maxRight += distance; }
    }

    // Shoelace formula. Yay.
    // https://en.wikipedia.org/wiki/Shoelace_formula
    // First, create a list of points from the segments.

    // Set up the initial grid.
    const startRow = maxUp + maxDown;
    const startCol = maxLeft + maxRight;
    const grid: Hole[][] = [];

    
    console.log(startRow, startCol);

    for(let row = 0; row < (startRow * 2); row++) {
        let rowToAdd: Hole[] = [];
        for(let col = 0; col < (startCol * 2); col++) {
            rowToAdd.push({
                dug: false,
                color: '',
                counted: false,
            });
        }
        grid.push(rowToAdd);
    }

    // Start digging!
    let curRow = startRow;
    let curCol = startCol;
    grid[curRow]![curCol]!.dug = true;
    segments.forEach((segment: Segment)=> {
        switch(segment.dir) {
            case 'U': {
                const newRow = curRow - segment.distance;
                for(let rowI = curRow - 1; rowI >= newRow; rowI--) {
                    grid[rowI]![curCol]!.dug = true;
                    grid[rowI]![curCol]!.color = segment.color;
                }
                curRow = newRow;
                break;
            }
            case 'D': {
                const newRow = curRow + segment.distance;
                for(let rowI = curRow + 1; rowI <= newRow; rowI++) {
                    grid[rowI]![curCol]!.dug = true;
                    grid[rowI]![curCol]!.color = segment.color;
                }
                curRow = newRow;
                break;
            }
            case 'L': {
                const newCol = curCol - segment.distance;
                for(let colI = curCol - 1; colI >= newCol; colI--) {
                    grid[curRow]![colI]!.dug = true;
                    grid[curRow]![colI]!.color = segment.color;
                }
                curCol = newCol;
                break;
            }
            case 'R': {
                const newCol = curCol + segment.distance;
                for(let colI = curCol + 1; colI <= newCol; colI++) {
                    grid[curRow]![colI]!.dug = true;
                    grid[curRow]![colI]!.color = segment.color;
                }
                curCol = newCol;
                break;
            }
            default: throw new Error('Unknown direction');
        }
    });


    // Trim bounds.
    let firstRow = -1;
    let lastRow = -1;
    grid.forEach((row: Hole[], index) => {
        if(row.some((hole: Hole) => hole.dug) && firstRow === -1) {
            firstRow = index - 1;
        }
        if(!row.some((hole: Hole) => hole.dug) && firstRow !== -1 && lastRow === -1) {
            lastRow = index + 1;
        }
    });
    console.log(firstRow, lastRow);
    const transPuz = transpose(grid);
    let firstCol = -1;
    let lastCol = -1;
    transPuz.forEach((col: Hole[], index) => {
        if(col.some((hole: Hole) => hole.dug) && firstCol === -1) {
            firstCol = index - 1;
        }
        if(!col.some((hole: Hole) => hole.dug) && firstCol !== -1 && lastCol === -1) {
            lastCol = index + 1;
        }
    });

    const trimmedGrid: Hole[][] = [];
    for(let row = firstRow; row < lastRow; row++) {
        let rowToAdd: Hole[] = [];
        for(let col = firstCol; col < lastCol; col++) {
            rowToAdd.push(grid[row]![col]!);
        }
        trimmedGrid.push(rowToAdd);
    }


    // console.log(startRow, startCol);
    // Flood fill the outside.
    // const countOutside = countNeighbors(grid, 0, 0);
    const countOutside = fillGrid(trimmedGrid);

    const gridSize = trimmedGrid.length * trimmedGrid[0]!.length;
    trimmedGrid.forEach((row: Hole[]) => {
        console.log(row.map((hole: Hole) => hole.dug ? 'X' : hole.counted ? '0' :'.').join(''))
    });

    return gridSize - countOutside;

    // Print grid
    // trimmedGrid.forEach((row: Hole[]) => {
    //     console.log(row.map((hole: Hole) => hole.dug?'X':'.').join(''))
    // });

    // // Count up dug sections
    // return grid.reduce((ac1, row: Hole[]) => {
    //     return ac1 + row.reduce((ac2, hole: Hole) => {return ac2 + (hole.dug ? 1 :0 )}, 0);
    // }, 0);
}

function countNeighbors(grid: Hole[][], row: number, col: number): number {
    // console.log(row, col);
    // grid.forEach((row: Hole[]) => {
    //     console.log(row.map((hole: Hole) => hole.dug ? 'X' : hole.counted ? '0' :'.').join(''))
    // });
    // console.log();


    if(grid[row]![col]!.counted || grid[row]![col]!.dug) {
        return 0;
    }
    let sum = 1;
    grid[row]![col]!.counted = true;
    if(row < grid.length - 1 && !(grid[row+1]![col]!.counted || grid[row+1]![col]!.dug)) { // Down
        sum += countNeighbors(grid, row+1, col);
    }
    if(col > 0 && !(grid[row]![col-1]!.counted || grid[row]![col-1]!.dug)) { // Left
        sum += countNeighbors(grid, row, col-1);
    }
    if(col < grid[0]!.length - 1 && !(grid[row]![col+1]!.counted || grid[row]![col+1]!.dug)) { // Right
        sum += countNeighbors(grid, row, col+1);
    }
    if(row > 0 && ! (grid[row-1]![col]!.counted || grid[row-1]![col]!.dug)) { // Up
        sum += countNeighbors(grid, row-1, col);
    }
    return sum;
}

// Flood fill algorithm implemented with a stack on the heap
// This algorithm will also work with big size matrixes
function fillGrid(grid: Hole[][]): number
{
    let row = 0;
    let col = 0;
    const fillStack: [number, number][] = [];
    fillStack.push([row, col]);
    let filled = 0;

    while(fillStack.length > 0)
    {
        let [row, col] = fillStack.pop()!;

        if (!validCoordinates(grid, row, col)) {
            continue;
        }

        if (grid[row]![col]!.counted === true  || grid[row]![col]!.dug === true) {
            continue;
        }

        grid[row]![col]!.counted = true;
        filled++;

        fillStack.push([row + 1, col]);
        fillStack.push([row - 1, col]);
        fillStack.push([row, col + 1]);
        fillStack.push([row, col - 1]);
    }
    return filled;
}

// Returns true if specified row and col coordinates are in the matrix
function validCoordinates(grid: Hole[][], row: number, col: number)
{
    return (row >= 0 && row < grid.length && col >= 0 && col < grid[row]!.length);
}


// Part 1
// import { transpose } from "../../util/utils";

// interface Segment {
//     dir: String;
//     distance: number;
//     color: string;
// }

// interface Hole {
//     dug: boolean;
//     counted: boolean;
// }

// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     let maxUp = 0;
//     let maxDown = 0;
//     let maxRight = 0;
//     let maxLeft = 0;
//     const segments: Segment[] = [];
//     // Parse the input into segment objects.
//     for(let line of lines) {
//         const parts = line.split(' ');
//         const dir: string = parts[0]!;
//         const distance: number = parseInt(parts[1]!);
//         const color: string = parts[2]!;
//         segments.push({dir, distance, color});
//         if (dir === 'U') { maxUp += distance; }
//         if (dir === 'D') { maxDown += distance; }
//         if (dir === 'L') { maxLeft += distance; }
//         if (dir === 'R') { maxRight += distance; }
//     }

//     // Set up the initial grid.
//     const startRow = maxUp + maxDown;
//     const startCol = maxLeft + maxRight;
//     const grid: Hole[][] = [];

//     for(let row = 0; row < (startRow * 2); row++) {
//         let rowToAdd: Hole[] = [];
//         for(let col = 0; col < (startCol * 2); col++) {
//             rowToAdd.push({
//                 dug: false,
//                 counted: false,
//             });
//         }
//         grid.push(rowToAdd);
//     }

//     // Start digging!
//     let curRow = startRow;
//     let curCol = startCol;
//     grid[curRow]![curCol]!.dug = true;
//     segments.forEach((segment: Segment)=> {
//         switch(segment.dir) {
//             case 'U': {
//                 const newRow = curRow - segment.distance;
//                 for(let rowI = curRow - 1; rowI >= newRow; rowI--) {
//                     grid[rowI]![curCol]!.dug = true;
//                 }
//                 curRow = newRow;
//                 break;
//             }
//             case 'D': {
//                 const newRow = curRow + segment.distance;
//                 for(let rowI = curRow + 1; rowI <= newRow; rowI++) {
//                     grid[rowI]![curCol]!.dug = true;
//                 }
//                 curRow = newRow;
//                 break;
//             }
//             case 'L': {
//                 const newCol = curCol - segment.distance;
//                 for(let colI = curCol - 1; colI >= newCol; colI--) {
//                     grid[curRow]![colI]!.dug = true;
//                 }
//                 curCol = newCol;
//                 break;
//             }
//             case 'R': {
//                 const newCol = curCol + segment.distance;
//                 for(let colI = curCol + 1; colI <= newCol; colI++) {
//                     grid[curRow]![colI]!.dug = true;
//                 }
//                 curCol = newCol;
//                 break;
//             }
//         }
//     });

//     // Trim bounds.
//     let firstRow = -1;
//     let lastRow = -1;
//     grid.forEach((row: Hole[], index) => {
//         if(row.some((hole: Hole) => hole.dug) && firstRow === -1) {
//             firstRow = index - 1;
//         }
//         if(!row.some((hole: Hole) => hole.dug) && firstRow !== -1 && lastRow === -1) {
//             lastRow = index + 1;
//         }
//     });
//     const transPuz = transpose(grid);
//     let firstCol = -1;
//     let lastCol = -1;
//     transPuz.forEach((col: Hole[], index) => {
//         if(col.some((hole: Hole) => hole.dug) && firstCol === -1) {
//             firstCol = index - 1;
//         }
//         if(!col.some((hole: Hole) => hole.dug) && firstCol !== -1 && lastCol === -1) {
//             lastCol = index + 1;
//         }
//     });

//     const trimmedGrid: Hole[][] = [];
//     for(let row = firstRow; row < lastRow; row++) {
//         let rowToAdd: Hole[] = [];
//         for(let col = firstCol; col < lastCol; col++) {
//             rowToAdd.push(grid[row]![col]!);
//         }
//         trimmedGrid.push(rowToAdd);
//     }
//     const countOutside = fillGrid(trimmedGrid);
//     const gridSize = trimmedGrid.length * trimmedGrid[0]!.length;
//     return gridSize - countOutside;
// }

// function fillGrid(grid: Hole[][]): number
// {
//     let row = 0;
//     let col = 0;
//     const fillStack: [number, number][] = [];
//     fillStack.push([row, col]);
//     let filled = 0;

//     while(fillStack.length > 0)
//     {
//         let [row, col] = fillStack.pop()!;

//         if (!validCoordinates(grid, row, col)) {
//             continue;
//         }

//         if (grid[row]![col]!.counted === true  || grid[row]![col]!.dug === true) {
//             continue;
//         }

//         grid[row]![col]!.counted = true;
//         filled++;

//         fillStack.push([row + 1, col]);
//         fillStack.push([row - 1, col]);
//         fillStack.push([row, col + 1]);
//         fillStack.push([row, col - 1]);
//     }
//     return filled;
// }

// // Returns true if specified row and col coordinates are in the grid
// function validCoordinates(grid: Hole[][], row: number, col: number)
// {
//     return (row >= 0 && row < grid.length && col >= 0 && col < grid[row]!.length);
// }
