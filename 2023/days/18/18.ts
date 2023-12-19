// https://adventofcode.com/2023/day/18

import { transpose } from "../../util/utils";

interface Segment {
    dir: String;
    distance: number;
    color: string;
}

interface Hole {
    dug: boolean;
    counted: boolean;
}

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
        const dir: string = parts[0]!;
        const distance: number = parseInt(parts[1]!);
        const color: string = parts[2]!;
        segments.push({dir, distance, color});
        if (dir === 'U') { maxUp += distance; }
        if (dir === 'D') { maxDown += distance; }
        if (dir === 'L') { maxLeft += distance; }
        if (dir === 'R') { maxRight += distance; }
    }

    // Set up the initial grid.
    const startRow = maxUp + maxDown;
    const startCol = maxLeft + maxRight;
    const grid: Hole[][] = [];

    for(let row = 0; row < (startRow * 2); row++) {
        let rowToAdd: Hole[] = [];
        for(let col = 0; col < (startCol * 2); col++) {
            rowToAdd.push({
                dug: false,
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
                }
                curRow = newRow;
                break;
            }
            case 'D': {
                const newRow = curRow + segment.distance;
                for(let rowI = curRow + 1; rowI <= newRow; rowI++) {
                    grid[rowI]![curCol]!.dug = true;
                }
                curRow = newRow;
                break;
            }
            case 'L': {
                const newCol = curCol - segment.distance;
                for(let colI = curCol - 1; colI >= newCol; colI--) {
                    grid[curRow]![colI]!.dug = true;
                }
                curCol = newCol;
                break;
            }
            case 'R': {
                const newCol = curCol + segment.distance;
                for(let colI = curCol + 1; colI <= newCol; colI++) {
                    grid[curRow]![colI]!.dug = true;
                }
                curCol = newCol;
                break;
            }
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
    const countOutside = fillGrid(trimmedGrid);
    const gridSize = trimmedGrid.length * trimmedGrid[0]!.length;
    return gridSize - countOutside;
}

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

// Returns true if specified row and col coordinates are in the grid
function validCoordinates(grid: Hole[][], row: number, col: number)
{
    return (row >= 0 && row < grid.length && col >= 0 && col < grid[row]!.length);
}
