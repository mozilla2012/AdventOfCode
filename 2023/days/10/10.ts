// https://adventofcode.com/2023/day/10

const UP = 0;
const LEFT = 1;
const DOWN = 3;
const RIGHT = 4;

export function adventMain(input: string): any {
    const lines = input.split('\n'); // PARSING
    const grid: string[][] = [];
    let start: [number, number] = [0,0];
    for(let i = 0; i < lines.length; i++) {
        const line = lines[i]!;
        if (line.includes('S')) {
            start = [i, line.indexOf('S')];
        }
        const row: string[] = line.split('');
        grid.push(row);
    }
    let iter = [start[0], start[1] + 1, RIGHT]; // I know the tile to the left of S is connected. :)
    let count = 0; // actually count through the path
    while(!(iter[0] === start[0] && iter[1] === start[1])) {
        iter = stepToNextSpace(iter, grid, grid[iter[0]!]![iter[1]!]!);
        count++;
    }
    return (count + 1) / 2;
}

function stepToNextSpace(iter: number[], grid: string[][], symbol: string): number[] {
    const row: number = iter[0]!;
    const col: number = iter[1]!;
    const dir: number = iter[2]!;
    const newDir = getDirForSymbol(dir, symbol);
    switch(newDir) {
        case UP:    return [row-1, col,   newDir];
        case LEFT:  return [row,   col-1, newDir];
        case RIGHT: return [row,   col+1, newDir];
        case DOWN:  return [row+1, col,   newDir];
    }
    throw new Error(`NewDir ${newDir}, iter ${iter}`);
}

function getDirForSymbol(dir: number, symbol: string): number {
    switch(symbol) {
        case 'F': return (dir === LEFT)  ? DOWN  : RIGHT;
        case 'L': return (dir === DOWN)  ? RIGHT : UP;
        case 'J': return (dir === RIGHT) ? UP    : LEFT;
        case '7': return (dir === RIGHT) ? DOWN  : LEFT;
        case '-': return (dir === RIGHT) ? RIGHT : LEFT;
        case '|': return (dir === UP)    ? UP    : DOWN;
        case '.': throw new Error('NO .');
        case 'S': throw new Error('NO S');
    }
    throw new Error(`dir ${dir}, symbol ${symbol}`);
}

