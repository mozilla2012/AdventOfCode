// https://adventofcode.com/2023/day/16

const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;

class Space {
    symbol: string;
    lit: boolean;

    constructor(symbol: string) {
        this.symbol = symbol;
        this.lit = false;
    }
}

class Lazor {
    row: number;
    col: number;
    dir: number;
    constructor(row: number, col: number, dir: number) {
        this.row = row;
        this.col = col;
        this.dir = dir;
    }
}

export function adventMain(input: string): any {
    const lines = input.split('\n');
    const grid: Space[][] = [];
    lines.forEach((line: string) => { // Parse input
        const row: Space[] = [];
        line.split('').forEach((char: string) => row.push(new Space(char)));
        grid.push(row);
    })
    let max = 0;
    for(let row = 0; row < grid.length; row++) {
        max = Math.max(max, getValForStartingLazor(grid, new Lazor(row, 0, RIGHT)));
    }
    for(let row = 0; row < grid.length; row++) {
        max = Math.max(max, getValForStartingLazor(grid, new Lazor(row, grid[0]!.length-1, LEFT)));
    }
    for(let col = 0; col < grid[0]!.length; col++) {
        max = Math.max(max, getValForStartingLazor(grid, new Lazor(0, col, DOWN)));
    }
    for(let col = 0; col < grid[0]!.length; col++) {
        max = Math.max(max, getValForStartingLazor(grid, new Lazor(grid.length-1, col, UP)));
    }
    return max;
}

function getValForStartingLazor(grid: Space[][], startingLazor: Lazor) {
    const lazors: Lazor[] = [startingLazor]; // Lazor queue: Pop() and Unshift(new Lazor)
    const lazorHist: Lazor[] = [];
    while (lazors.length > 0) { // Iterate through all lazors
        const lazor = lazors.pop()!;
        if (lazorHist.some((oldSpot: Lazor) => lazor.row === oldSpot.row && lazor.col === oldSpot.col && lazor.dir === oldSpot.dir)) {
            continue; // If Lazor was seen before, break out.
        }
        if (lazor.row < 0 || lazor.col < 0 || lazor.row >= grid.length || lazor.col >= grid[0]!.length) {
            continue; // If Lazor is about to exit the grid, break out.
        }
        // Otherwise, the lazor should be valid. So mark the spot as true and move on to the next location.
        const curSpot: Space = grid[lazor.row]![lazor.col]!;
        curSpot.lit = true;
        lazorHist.push(new Lazor(lazor.row, lazor.col, lazor.dir));
        const symbol = curSpot.symbol;
        switch (symbol) {
            case '.': {
                switch (lazor.dir) {
                    case UP: {
                        lazor.row--;
                        break;
                    }
                    case DOWN: {
                        lazor.row++;
                        break;
                    }
                    case LEFT: {
                        lazor.col--;
                        break;
                    }
                    case RIGHT: {
                        lazor.col++;
                        break;
                    }
                }
                break;
            }
            case '/': {
                switch (lazor.dir) {
                    case UP: {
                        lazor.col++;
                        lazor.dir = RIGHT;
                        break;
                    }
                    case DOWN: {
                        lazor.col--;
                        lazor.dir = LEFT;
                        break;
                    }
                    case LEFT: {
                        lazor.row++;
                        lazor.dir = DOWN;
                        break;
                    }
                    case RIGHT: {
                        lazor.row--;
                        lazor.dir = UP;
                        break;
                    }
                }
                break;
            }
            case '\\': {
                switch (lazor.dir) {
                    case DOWN: {
                        lazor.col++;
                        lazor.dir = RIGHT;
                        break;
                    }
                    case UP: {
                        lazor.col--;
                        lazor.dir = LEFT;
                        break;
                    }
                    case RIGHT: {
                        lazor.row++;
                        lazor.dir = DOWN;
                        break;
                    }
                    case LEFT: {
                        lazor.row--;
                        lazor.dir = UP;
                        break;
                    }
                }
                break;
            }
            case '-': {
                switch (lazor.dir) {
                    case UP: // Intentionally fall through
                    case DOWN: {
                        lazors.unshift(new Lazor(lazor.row, lazor.col - 1, LEFT)); // Make a new lazor going left
                        lazor.col++;
                        lazor.dir = RIGHT;
                        break;
                    }
                    case LEFT: {
                        lazor.col--;
                        break;
                    }
                    case RIGHT: {
                        lazor.col++;
                        break;
                    }
                }
                break;
            }
            case '|': {
                switch (lazor.dir) {
                    case UP: {
                        lazor.row--;
                        break;
                    }
                    case DOWN: {
                        lazor.row++;
                        break;
                    }
                    case LEFT: // Intentionally fall through
                    case RIGHT: {
                        lazors.unshift(new Lazor(lazor.row - 1, lazor.col, UP)); // Make a new lazor going up
                        lazor.row++;
                        lazor.dir = DOWN;
                        break;
                    }
                }
                break;
            }
        }
        lazors.unshift(lazor);
    }
    return grid.reduce((ac1, row: Space[]) => ac1 + row.reduce((ac2, hole: Space) => {
        const retVal = ac2 + (hole.lit ? 1 : 0);
        hole.lit = false;
        return retVal;
    }, 0), 0);
}

// Part 1
// const RIGHT = 0;
// const DOWN = 1;
// const LEFT = 2;
// const UP = 3;

// class Space {
//     symbol: string;
//     lit: boolean;

//     constructor(symbol: string) {
//         this.symbol = symbol;
//         this.lit = false;
//     }
// }

// class Lazor {
//     row: number;
//     col: number;
//     dir: number;
//     constructor(row: number, col: number, dir: number) {
//         this.row = row;
//         this.col = col;
//         this.dir = dir;
//     }
// }

// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     const grid: Space[][] = [];
//     lines.forEach((line: string) => { // Parse input
//         const row: Space[] = [];
//         line.split('').forEach((char: string) => row.push(new Space(char)));
//         grid.push(row);
//     })
//     const lazors: Lazor[] = [new Lazor(0,0, RIGHT)]; // Lazor queue: Pop() and Unshift(new Lazor)
//     const lazorHist: Lazor[] = [];
//     while(lazors.length > 0) { // Iterate through all lazors
//         const lazor = lazors.pop()!;
//         if(lazorHist.some((oldSpot: Lazor) => lazor.row === oldSpot.row && lazor.col === oldSpot.col && lazor.dir === oldSpot.dir)) {
//             continue; // If Lazor was seen before, break out.
//         }
//         if(lazor.row < 0 || lazor.col < 0 || lazor.row >= grid.length || lazor.col >= grid[0]!.length) {
//             continue; // If Lazor is about to exit the grid, break out.
//         }
//         // Otherwise, the lazor should be valid. So mark the spot as true and move on to the next location.
//         const curSpot: Space = grid[lazor.row]![lazor.col]!;
//         curSpot.lit = true;
//         lazorHist.push(new Lazor(lazor.row, lazor.col, lazor.dir));
//         const symbol = curSpot.symbol;
//         switch (symbol) {
//             case '.': {
//                 switch(lazor.dir) {
//                     case UP: {
//                         lazor.row--;
//                         break;
//                     }
//                     case DOWN: {
//                         lazor.row++;
//                         break;
//                     }
//                     case LEFT: {
//                         lazor.col--;
//                         break;
//                     }
//                     case RIGHT: {
//                         lazor.col++;
//                         break;
//                     }
//                 }
//                 break;
//             }
//             case '/': {
//                 switch(lazor.dir) {
//                     case UP: {
//                         lazor.col++;
//                         lazor.dir = RIGHT;
//                         break;
//                     }
//                     case DOWN: {
//                         lazor.col--;
//                         lazor.dir = LEFT;
//                         break;
//                     }
//                     case LEFT: {
//                         lazor.row++;
//                         lazor.dir = DOWN;
//                         break;
//                     }
//                     case RIGHT: {
//                         lazor.row--;
//                         lazor.dir = UP;
//                         break;
//                     }
//                 }
//                 break;
//             }
//             case '\\': {
//                 switch(lazor.dir) {
//                     case DOWN: {
//                         lazor.col++;
//                         lazor.dir = RIGHT;
//                         break;
//                     }
//                     case UP: {
//                         lazor.col--;
//                         lazor.dir = LEFT;
//                         break;
//                     }
//                     case RIGHT: {
//                         lazor.row++;
//                         lazor.dir = DOWN;
//                         break;
//                     }
//                     case LEFT: {
//                         lazor.row--;
//                         lazor.dir = UP;
//                         break;
//                     }
//                 }
//                 break;
//             }
//             case '-': {
//                 switch(lazor.dir) {
//                     case UP: // Intentionally fall through
//                     case DOWN: {
//                         lazors.unshift(new Lazor(lazor.row, lazor.col - 1, LEFT)); // Make a new lazor going left
//                         lazor.col++;
//                         lazor.dir = RIGHT;
//                         break;
//                     }
//                     case LEFT: {
//                         lazor.col--;
//                         break;
//                     }
//                     case RIGHT: {
//                         lazor.col++;
//                         break;
//                     }
//                 }
//                 break;
//             }
//             case '|': {
//                 switch(lazor.dir) {
//                     case UP: {
//                         lazor.row--;
//                         break;
//                     }
//                     case DOWN: {
//                         lazor.row++;
//                         break;
//                     }
//                     case LEFT: // Intentionally fall through
//                     case RIGHT: {
//                         lazors.unshift(new Lazor(lazor.row - 1, lazor.col, UP)); // Make a new lazor going up
//                         lazor.row++;
//                         lazor.dir = DOWN;
//                         break;
//                     }
//                 }
//                 break;
//             }
//         }
//         lazors.unshift(lazor);
//     }
//     return grid.reduce((ac1, row: Space[]) => ac1 + row.reduce((ac2, hole: Space) => ac2 + (hole.lit ? 1 :0 ), 0), 0);
// }
