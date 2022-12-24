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
        let distanceMatch = instructions.match(/([0-9]+)*/);
        let distance = parseInt(distanceMatch![1]!);
        instructions = instructions.slice(`${distance}`.length);        

        while(distance-- > 0 && moveIfPossible(grid));
        
        // If no direction, then break.
        if(instructions.length <= 0) {
            break;
        }

        // Then parse and set direction (get next char)
        let newDir = `${instructions}`.charAt(0);
        instructions = instructions.slice(1);
        if (newDir === 'R') {
            curDir = (curDir === 3) ? 0 : (curDir + 1);
        } else {
            curDir = (curDir === 0) ? 3 : (curDir - 1);
        }
    }

    // Calculate the return value
    return (1000 * (curRow+1)) + (4 * (curCol+1)) + curDir;
}

function moveIfPossible(grid: number[][]): boolean {
    if(curDir === UP) {
        let newRow: number = curRow;
        if (newRow === 0 || grid[(newRow - 1)]![curCol] === VOID) {
            while (newRow < ROWS && grid[++newRow]![curCol] !== VOID);
            if (newRow === ROWS) {
                newRow++;
            }
        }
        if (grid[(newRow - 1)]![curCol] === WALL) {
            return false;
        }
        if (grid[(newRow - 1)]![curCol] === OPEN) {
            curRow = newRow - 1;
            return true;
        }
    } else if(curDir === LEFT) {
        let newCol: number = curCol;
        if (newCol === 0 || grid[curRow]![(newCol - 1)] === VOID) {
            while (newCol < COLS && grid[curRow]![++newCol] !== VOID);
            if (newCol === COLS) {
                newCol++;
            }
        }
        
        if (grid[curRow]![(newCol - 1)] === WALL) {
            return false;
        }
        if (grid[curRow]![(newCol - 1)] === OPEN) {
            curCol = newCol - 1;
            return true;
        }
    } else if(curDir === DOWN) {
        let newRow: number = curRow;
        if (newRow === ROWS || grid[(newRow + 1)]![curCol] === VOID) {
            while (newRow > 0 && grid[--newRow]![curCol] !== VOID);
            if (newRow === 0) {
                newRow--;
            }
        }
        if (grid[(newRow + 1)]![curCol] === WALL) {
            return false;
        }
        if (grid[(newRow + 1)]![curCol] === OPEN) {
            curRow = newRow + 1;
            return true;
        }
    } else if(curDir === RIGHT) {
        let newCol: number = curCol;
        if (newCol === COLS || grid[curRow]![(newCol + 1)] === VOID) {
            while (newCol > 0 && grid[curRow]![--newCol] !== VOID);
            if (newCol === 0) {
                newCol--;
            }
        }
        if (grid[curRow]![(newCol + 1)] === WALL) {
            return false;
        }
        if (grid[curRow]![(newCol + 1)] === OPEN) {
            curCol = newCol + 1;
            return true;
        }
    }
    console.log('Error')
    exit();
}