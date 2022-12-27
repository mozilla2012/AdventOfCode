// https://adventofcode.com/2022/day/22

import { exit } from "process";

const VOID = 0;
const OPEN = 1;
const WALL = 2;
const ROWS = 20;//201; 
const COLS = 20;//151;
const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;
let curRow: number;
let curCol: number;
let curDir: number;


// TODO - well this looks like it works. But it needs debugging. 


export function adventMain(input: string): any {
    // First, make a grid that is ROWS x COLS.
    // Fill it with voids.
    let grid: number[][] = [];
    for(let row = 0; row < ROWS; row++) {
        let row: number[] = [];
        for(let col = 0; col < COLS; col++) {
            row.push(VOID);
        }
        grid.push(row);
    }
    // Then populate the open and walls.
    const lines = input.split('\n');
    let row = 0;
    for(let line of lines) {
        if (line.length <= 1) {
            break;
        }
        let cols = line.split('');
        
        for(let col = 0; col < cols.length; col++) {
            const sq = (cols[col] === ' ') ? VOID : 
                       (cols[col] === '.') ? OPEN :
                       (cols[col] === '#') ? WALL : VOID;
            grid[row]![col]! = sq;
        }
        row++;
    }
    
    let instructions = lines[lines.length - 1]!;

    // Read the directions into a single string. Then do Regex matching, alternating between finding the direction and number. Then pop off the found string and repeat until out of directions. Make one regex for finding the next number, and for direction you can just remove the first character.
    
    curRow = 0;
    curCol = 0;
    curDir = RIGHT;
    while(grid[curRow]![curCol] !== OPEN) {
        curCol++;
    }

    while(true) {
        console.log(instructions);
        let distanceMatch = instructions.match(/([0-9]+)*/);
        let distance = parseInt(distanceMatch![1]!);
        console.log('Moving: ' + distance);
        instructions = instructions.slice(`${distance}`.length);
        console.log('before move')
        printGrid(grid);       

        while(distance-- > 0 && moveIfPossibleCube(grid)) {
            printGrid(grid);
        }
        
        // If no direction, then break.
        if(instructions.length <= 0) {
            break;
        }

        // Then parse and set direction (get next char)
        let newDir = `${instructions}`.charAt(0);
        instructions = instructions.slice(1);
        console.log('Rotating:' + newDir);
        if (newDir === 'R') {
            curDir = (curDir === 3) ? 0 : (curDir + 1);
        } else {
            curDir = (curDir === 0) ? 3 : (curDir - 1);
        }

        console.log('Now facing:' + curDir);
    }

    // Calculate the return value
    return (1000 * (curRow+1)) + (4 * (curCol+1)) + curDir;
}

function moveIfPossibleCube(grid: number[][]): boolean {
    let originalRow: number = curRow;
    let originalCol: number = curCol;
    let originalDir: number = curDir;
    if(curDir === UP) {
        if (curRow === 0 || grid[(curRow - 1)]![curCol] === VOID) {
            translateToNewSide(grid);
        } else {
            curRow -= 1;
        }
    } else if(curDir === LEFT) {
        if (curCol === 0 || grid[(curRow)]![(curCol-1)] === VOID) {
            translateToNewSide(grid);
        } else {
            curCol -= 1;
        }
    } else if(curDir === DOWN) {
        if (curRow === ROWS || grid[(curRow + 1)]![curCol] === VOID) {
            translateToNewSide(grid);
        } else {
            curRow += 1;
        }
    } else if(curDir === RIGHT) {
        if (curCol === COLS || grid[(curRow)]![(curCol + 1)] === VOID) {
            translateToNewSide(grid);
        } else {
            curCol += 1;
        }
    }

    // If the potential new spot is a wall, revert it to the original row/col/dir and return false.
    if (grid[curRow]![curCol] === WALL) {
        curRow = originalRow;
        curCol = originalCol;
        curDir = originalDir;
        return false;
    }
    // If the potential new spot is OPEN, keep the new values and just return true.
    if (grid[curRow]![curCol] === OPEN) {
        return true;
    }
    console.log(`Error - why are we registering a void? [${curRow},${curCol}], ${curDir}`)
    exit();
}

function translateToNewSide(grid: number[][]) {
    
    if(curRow === 0 && curDir === UP) { // Side 1 -> 12
        curDir = DOWN;
        curRow = 4;
        let edgeIndex = curCol % 4;
        curCol = (4-1) - edgeIndex;
    } else if (curRow < 4 && curCol === (12-1) && curDir === RIGHT) { // Side 2 -> 5
        curDir = LEFT;
        curCol = (16-1);
        let edgeIndex = curRow % 4;
        curRow = (12-1) - edgeIndex;
    } else if (curRow >= 4  && curCol === (12-1) && curDir === RIGHT) { // Side 3 -> 4
        curDir = DOWN;
        let edgeIndex = curRow % 4;
        curCol = (16-1) - edgeIndex;
        curRow = 8;
    } else if (curRow === 8 && curDir === UP) { // Side 4 -> 3
        curDir = LEFT;
        let edgeIndex = curCol % 4;
        curRow = (8-1) - edgeIndex;
        curCol = (12-1);
    } else if (curCol === (16-1) && curDir === RIGHT) { // Side 5 -> 2
        curDir = LEFT;
        curCol = (12-1);
        let edgeIndex = curRow % 4;
        curRow = (4-1) - edgeIndex;
    } else if (curRow === (12-1) && curCol >= 12 && curDir === DOWN) { // Side 6 -> 11
        curDir = RIGHT;
        let edgeIndex = curCol % 4;
        curRow = (8-1) - edgeIndex; 
        curCol = 0;
    } else if (curRow === (12-1) && curCol <  12 && curDir === DOWN) { // Side 7 -> 10
        curDir = UP;
        let edgeIndex = curCol % 4;
        curCol = (4-1) - edgeIndex; 
        curRow = (8-1);
    } else if (curRow < 4 && curCol === 8 && curDir === LEFT) { // Side 8 -> 9
        curDir = UP;
        let edgeIndex = curRow % 4;
        curCol = (8-1) - edgeIndex; 
        curRow = (8-1);
    } else if (curRow === (8-1)  && curCol >=  4 && curDir === DOWN) { // Side 9 -> 8
        curDir = RIGHT;
        let edgeIndex = curCol % 4;
        curRow = (12-1) - edgeIndex; 
        curCol = (8-1);
    } else if (curRow === (8-1)  && curCol <   4 && curDir === DOWN) { // Side 10 -> 7
        curDir = UP;
        let edgeIndex = curCol % 4;
        curCol = (12-1) - edgeIndex; 
        curRow = (12-1);
    } else if (curCol === 0 && curDir === LEFT) { // Side 11 -> 6
        curDir = UP;
        let edgeIndex = curRow % 4;
        curCol = (16-1) - edgeIndex; 
        curRow = (12-1);
    } else if (curRow === 4 && curCol < 4 && curDir === UP) { // Side 12 -> 1
        curDir = DOWN;
        let edgeIndex = curCol % 4;
        curCol = (12-1) - edgeIndex; 
        curRow = 0;
    } else if (curRow === 4 && curCol >= 4 && curDir === UP) { // Side 13 -> 14
        curDir = RIGHT;
        let edgeIndex = curCol % 4;
        curRow = edgeIndex; 
        curCol = 8;
    } else if (curRow >= 8 && curCol === 8 && curDir === LEFT) { // Side 14 -> 13
        curDir = DOWN;
        let edgeIndex = curRow % 4;
        curCol = (8-1) - edgeIndex; 
        curRow = 4;
    } else {
        console.log(`Unknown rollover! Currently at [${curRow},${curCol}], heading ${curDir}`);
    }
}

// I'm pretty sure this all needs to be changed for Part 2.
// function moveIfPossible(grid: number[][]): boolean {
//     if(curDir === UP) {
//         let newRow: number = curRow;
//         if (newRow === 0 || grid[(newRow - 1)]![curCol] === VOID) {
//             while (newRow < ROWS && grid[++newRow]![curCol] !== VOID);
//             if (newRow === ROWS) {
//                 newRow++;
//             }
//         }
//         if (grid[(newRow - 1)]![curCol] === WALL) {
//             return false;
//         }
//         if (grid[(newRow - 1)]![curCol] === OPEN) {
//             curRow = newRow - 1;
//             return true;
//         }
//     } else if(curDir === LEFT) {
//         let newCol: number = curCol;
//         if (newCol === 0 || grid[curRow]![(newCol - 1)] === VOID) {
//             while (newCol < COLS && grid[curRow]![++newCol] !== VOID);
//             if (newCol === COLS) {
//                 newCol++;
//             }
//         }
//         if (grid[curRow]![(newCol - 1)] === WALL) {
//             return false;
//         }
//         if (grid[curRow]![(newCol - 1)] === OPEN) {
//             curCol = newCol - 1;
//             return true;
//         }
//     } else if(curDir === DOWN) {
//         let newRow: number = curRow;
//         if (newRow === ROWS || grid[(newRow + 1)]![curCol] === VOID) {
//             while (newRow > 0 && grid[--newRow]![curCol] !== VOID);
//             if (newRow === 0) {
//                 newRow--;
//             }
//         }
//         if (grid[(newRow + 1)]![curCol] === WALL) {
//             return false;
//         }
//         if (grid[(newRow + 1)]![curCol] === OPEN) {
//             curRow = newRow + 1;
//             return true;
//         }
//     } else if(curDir === RIGHT) {
//         let newCol: number = curCol;
//         if (newCol === COLS || grid[curRow]![(newCol + 1)] === VOID) {
//             while (newCol > 0 && grid[curRow]![--newCol] !== VOID);
//             if (newCol === 0) {
//                 newCol--;
//             }
//         }
//         if (grid[curRow]![(newCol + 1)] === WALL) {
//             return false;
//         }
//         if (grid[curRow]![(newCol + 1)] === OPEN) {
//             curCol = newCol + 1;
//             return true;
//         }
//     }
//     console.log('Error')
//     exit();
// }
function printGrid(grid: number[][]) {
    for(let row = 0; row < ROWS; row++) {
        let rowToPrint = [];
        for(let col = 0; col < COLS; col++) {
            if (row === curRow && col === curCol) {
                rowToPrint.push('A');
            } else {
                rowToPrint.push(`${grid[row]![col]}`.replace(`${VOID}`, 'x').replace(`${OPEN}`, '.').replace(`${WALL}`, '#'));
            }
        }   
        console.log(rowToPrint.join(''));
    }
    console.log('');
}