// https://adventofcode.com/2022/day/22

import { exit } from "process";

const VOID = 0;
const OPEN = 1;
const WALL = 2;
const ROWS = 201; 
const COLS = 151;
const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;
let curRow: number;
let curCol: number;
let curDir: number;

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
            grid[row]![col]! = (cols[col] === ' ') ? VOID : 
                               (cols[col] === '.') ? OPEN :
                               (cols[col] === '#') ? WALL : VOID;
        }
        row++;
    }
    
    let instructions = lines[lines.length - 1]!;

    // Read the directions into a single string. Then do Regex matching, alternating between finding the direction and number. Then pop off the found string and repeat until out of directions. Make one regex for finding the next number, and for direction you can just remove the first character.
    
    curRow = 0;
    curCol = 0;
    curDir = RIGHT;
    while(grid[curRow]![curCol] !== OPEN) { // Find the first location.
        curCol++;
    }

    while(true) {
        let distanceMatch = instructions.match(/([0-9]+)*/);
        let distance = parseInt(distanceMatch![1]!);
        instructions = instructions.slice(`${distance}`.length);

        while(distance-- > 0 && moveIfPossibleCube(grid));
        
        // If no direction, then break.
        if(instructions.length <= 0) {
            break;
        }

        // Then parse and set direction (get next char)
        let newDir = `${instructions}`.charAt(0);
        instructions = instructions.slice(1);
        curDir = (newDir === 'R') ? 
                 (curDir === 3) ? 0 : (curDir + 1) :
                 (curDir === 0) ? 3 : (curDir - 1);
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
    if(curRow === 0 && curCol < 100 && curDir === UP) { // Side 1 -> 10
        curDir = RIGHT;
        curRow = 150 + (curCol % 50); 
        curCol = 0;
    } else if (curRow === 0 && curCol >= 100 && curDir === UP) { // Side 2 -> 9
        curDir = UP;
        curCol = 0 + (curCol % 50); // Not sure if this should be inverted...
        curRow = (200-1);
    } else if (curCol === (150-1) && curDir === RIGHT) { // Side 3 -> 6
        curDir = LEFT;
        curRow = (150-1) - (curRow % 50); 
        curCol = (100-1);
    } else if (curRow === (50-1) && curDir === DOWN) { // Side 4 -> 5
        curDir = LEFT;
        curRow = 50 + (curCol % 50); 
        curCol = (100-1);
    } else if (curRow < 100 && curCol === (100-1) && curDir === RIGHT) { // Side 5 -> 4
        curDir = UP;
        curCol = 100 + (curRow % 50); 
        curRow = (50-1);
    } else if (curRow >= 100 && curCol === (100-1) && curDir === RIGHT) { // Side 6 -> 3
        curDir = LEFT;
        curRow = (50-1) - (curRow % 50); 
        curCol = (150-1);
    } else if (curRow === (150-1) && curCol > 40 && curDir === DOWN) { // Side 7 -> 8
        curDir = LEFT;
        curRow = 150 + (curCol % 50); 
        curCol = (50-1);
    } else if (curRow > 140 && curCol === (50-1) && curDir === RIGHT) { // Side 8 -> 7
        curDir = UP;
        curCol = 50 + (curRow % 50); 
        curRow = (150-1);
    } else if (curRow === (200-1) && curDir === DOWN) { // Side 9 -> 2
        curDir = DOWN;
        curCol = 100 + (curCol % 50); 
        curRow = 0;
    } else if (curRow >= 150 && curCol === 0 && curDir === LEFT) { // Side 10 -> 1
        curDir = DOWN;
        curCol = 50 + (curRow % 50); 
        curRow = 0;
    } else if (curRow < 150 && curCol === 0 && curDir === LEFT) { // Side 11 -> 14
        curDir = RIGHT;
        curRow = (50-1) - (curRow % 50); 
        curCol = 50;
    } else if (curRow === 100 && curDir === UP) { // Side 12 -> 13
        curDir = RIGHT;
        curRow = 50 + (curCol % 50); 
        curCol = 50;
    } else if (curRow >= 50 && curCol === 50 && curDir === LEFT) { // Side 13 -> 12
        curDir = DOWN;
        curCol = 0 + (curRow % 50); 
        curRow = 100;
    } else if (curRow < 50 && curCol === 50 && curDir === LEFT) { // Side 14 -> 11
        curDir = RIGHT;
        curRow = (150-1) - (curRow % 50); 
        curCol = 0;
    } else {
        console.log(`Unknown rollover! Currently at [${curRow},${curCol}], heading ${curDir}`);
    }
}
