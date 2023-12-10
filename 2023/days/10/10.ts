// https://adventofcode.com/2023/day/10

const UP = 0;
const LEFT = 1;
const DOWN = 3;
const RIGHT = 4;
const UNVISITED = '.';

export function adventMain(input: string): any {
    const lines = input.split('\n');
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
    const visited = grid.map((row: string[]) => row.map((c: string) => UNVISITED));
    visited[start[0]!]![start[1]!] = 'S';
    let iter = [start[0], start[1] + 1, RIGHT]; // I know the tile to the left of S is connected.

    // Mark all visited spots.
    let count = 0;
    while(!(iter[0] === start[0] && iter[1] === start[1])) {
        // console.log(iter);
        visited[iter[0]!]![iter[1]!] = 'x';
        iter = stepToNextSpace(iter, grid, grid[iter[0]!]![iter[1]!]!);
        count++;
    }
    // return (count+1) / 2; // Part 1
    
    // Then, loop through again and flood fill both sides of the pipe.
    iter = [start[0], start[1] + 1, RIGHT]; // I know the tile to the left of S is connected.
    while(!(iter[0] === start[0] && iter[1] === start[1])) {
        const currentSymbol = grid[iter[0]!]![iter[1]!]!;
        floodFillBothSides(iter, visited, currentSymbol)
        iter = stepToNextSpace(iter, grid, currentSymbol);
    }

    printGrid(visited);
    const count1 = visited.reduce((acc, row: string[]) =>{
        const toAdd = row.reduce((rowAcc, value: string) => {
            return rowAcc + (value === '1' ? 1: 0)
        }, 0);
        return toAdd + acc; 
    }, 0);
    const count2 = visited.reduce((acc, row: string[]) =>{
        const toAdd = row.reduce((rowAcc, value: string) => {
            return rowAcc + (value === '2' ? 1: 0)
        }, 0);
        return toAdd + acc; 
    }, 0);
    console.log(count1, count2);
    return (visited[0]![0] === '1') ? count2 : count1;
}

function stepToNextSpace(iter: number[], grid: string[][], symbol: string): number[] {
    const row: number = iter[0]!;
    const col: number = iter[1]!;
    const dir: number = iter[2]!;
    
    const newDir = getDirForSymbol(dir, symbol);
    switch(newDir) {
        case UP: return [row-1, col, newDir];
        case LEFT: return [row, col-1, newDir];
        case RIGHT: return [row, col+1, newDir];
        case DOWN: return [row+1, col, newDir];
    }
    throw new Error(`NewDir ${newDir}, iter ${iter}`);
}

function getDirForSymbol(dir: number, symbol: string): number {
    // console.log(symbol);
    switch(symbol) {
        case 'F': return (dir === LEFT) ? DOWN : RIGHT;
        case 'L': return (dir === DOWN) ? RIGHT : UP;
        case 'J': return (dir === RIGHT) ? UP : LEFT;
        case '7': return (dir === RIGHT) ? DOWN : LEFT;
        case '-': return (dir === RIGHT) ? RIGHT : LEFT;
        case '|': return (dir === UP) ? UP : DOWN;
        case '.': throw new Error('NO .');
        case 'S': throw new Error('NO S');
    }
    throw new Error(`dir ${dir}, symbol ${symbol}`);
}
function printGrid(g: string[][]) {
    g.forEach(r => console.log(r.join('')));
}

function floodFillBothSides(iter: number[], visited: string[][], symbol: string): void {
    const row: number = iter[0]!;
    const col: number = iter[1]!;
    const dir: number = iter[2]!;

    visited[row]![col] = symbol;
    switch(symbol) {
        // Assuming we're going counter clockwise. 1 is inside, 2 is outside.
        case 'F': { 
            //   222
            //   2F.
            //   2.1
            floodFill(visited, row-1, col-1, (dir === LEFT) ? '2' : '1');
            floodFill(visited, row-1, col,   (dir === LEFT) ? '2' : '1');
            floodFill(visited, row-1, col+1, (dir === LEFT) ? '2' : '1');
            floodFill(visited, row,   col-1, (dir === LEFT) ? '2' : '1');
            floodFill(visited, row+1, col-1, (dir === LEFT) ? '2' : '1');
            floodFill(visited, row+1, col+1, (dir === LEFT) ? '1' : '2');
            break;
        }
        case 'L': {
            //   2.1
            //   2L.
            //   222
            floodFill(visited, row-1, col-1, (dir === DOWN) ? '2' : '1');
            floodFill(visited, row-1, col+1, (dir === DOWN) ? '1' : '2');
            floodFill(visited, row,   col-1, (dir === DOWN) ? '2' : '1');
            floodFill(visited, row+1, col-1, (dir === DOWN) ? '2' : '1');
            floodFill(visited, row+1, col,   (dir === DOWN) ? '2' : '1');
            floodFill(visited, row+1, col+1, (dir === DOWN) ? '2' : '1');
            break;
        }
        case 'J': {  
            //   1.2
            //   .J2
            //   222
            floodFill(visited, row-1, col-1, (dir === RIGHT) ? '1' : '2');
            floodFill(visited, row-1, col+1, (dir === RIGHT) ? '2' : '1');
            floodFill(visited, row,   col+1, (dir === RIGHT) ? '2' : '1');
            floodFill(visited, row+1, col-1, (dir === RIGHT) ? '2' : '1');
            floodFill(visited, row+1, col,   (dir === RIGHT) ? '2' : '1');
            floodFill(visited, row+1, col+1, (dir === RIGHT) ? '2' : '1');
            break;
        }
        case '7': { 
            //   222
            //   .72
            //   1.2 
            floodFill(visited, row-1, col-1, (dir === UP) ? '2' : '1');
            floodFill(visited, row-1, col,   (dir === UP) ? '2' : '1');
            floodFill(visited, row-1, col+1, (dir === UP) ? '2' : '1');
            floodFill(visited, row,   col+1, (dir === UP) ? '2' : '1');
            floodFill(visited, row+1, col-1, (dir === UP) ? '1' : '2');
            floodFill(visited, row+1, col+1, (dir === UP) ? '2' : '1');
            break;
        }
        case '-': {  
            //   1
            //   -
            //   2
            floodFill(visited, row-1, col, (dir === RIGHT) ? '1' : '2');
            floodFill(visited, row+1, col, (dir === RIGHT) ? '2' : '1');
            break;
        }
        case '|': {  
            // 1|2
            floodFill(visited, row, col-1, (dir === UP) ? '1' : '2');
            floodFill(visited, row, col+1, (dir === UP) ? '2' : '1');
            break;
        }
        case '.': {  
            throw new Error('NO .');
        }
        case 'S': {  
            throw new Error('NO S'); 
        }
    }
}

function floodFill(visited: string[][], row: number, col: number, symbolToFill: string) {
    if (row < 0 || col < 0 || row >= visited.length || col >= visited[0]!.length) {
        return;
    }

    if (visited[row]![col]! === '.') {
        visited[row]![col]! = symbolToFill;
        floodFill(visited, row-1, col-1, symbolToFill);
        floodFill(visited, row-1, col,   symbolToFill);
        floodFill(visited, row-1, col+1, symbolToFill);
        floodFill(visited, row,   col-1, symbolToFill);
        floodFill(visited, row,   col+1, symbolToFill);
        floodFill(visited, row+1, col-1, symbolToFill);
        floodFill(visited, row+1, col,   symbolToFill);
        floodFill(visited, row+1, col+1, symbolToFill);
    } else if((symbolToFill === '1' && visited[row]![col]! === '2') || (symbolToFill === '2' && visited[row]![col]! === '1')) {
        printGrid(visited);
        console.log(row, col, symbolToFill);
        throw new Error('PANIC');
    }
}
// Part 1
// const UP = 0;
// const LEFT = 1;
// const DOWN = 3;
// const RIGHT = 4;

// export function adventMain(input: string): any {
//     const lines = input.split('\n'); // PARSING
//     const grid: string[][] = [];
//     let start: [number, number] = [0,0];
//     for(let i = 0; i < lines.length; i++) {
//         const line = lines[i]!;
//         if (line.includes('S')) {
//             start = [i, line.indexOf('S')];
//         }
//         const row: string[] = line.split('');
//         grid.push(row);
//     }
//     let iter = [start[0], start[1] + 1, RIGHT]; // I know the tile to the left of S is connected. :)
//     let count = 0; // actually count through the path
//     while(!(iter[0] === start[0] && iter[1] === start[1])) {
//         iter = stepToNextSpace(iter, grid, grid[iter[0]!]![iter[1]!]!);
//         count++;
//     }
//     return (count + 1) / 2;
// }

// function stepToNextSpace(iter: number[], grid: string[][], symbol: string): number[] {
//     const row: number = iter[0]!;
//     const col: number = iter[1]!;
//     const dir: number = iter[2]!;
//     const newDir = getDirForSymbol(dir, symbol);
//     switch(newDir) {
//         case UP:    return [row-1, col,   newDir];
//         case LEFT:  return [row,   col-1, newDir];
//         case RIGHT: return [row,   col+1, newDir];
//         case DOWN:  return [row+1, col,   newDir];
//     }
//     throw new Error(`NewDir ${newDir}, iter ${iter}`);
// }

// function getDirForSymbol(dir: number, symbol: string): number {
//     switch(symbol) {
//         case 'F': return (dir === LEFT)  ? DOWN  : RIGHT;
//         case 'L': return (dir === DOWN)  ? RIGHT : UP;
//         case 'J': return (dir === RIGHT) ? UP    : LEFT;
//         case '7': return (dir === RIGHT) ? DOWN  : LEFT;
//         case '-': return (dir === RIGHT) ? RIGHT : LEFT;
//         case '|': return (dir === UP)    ? UP    : DOWN;
//         case '.': throw new Error('NO .');
//         case 'S': throw new Error('NO S');
//     }
//     throw new Error(`dir ${dir}, symbol ${symbol}`);
// }