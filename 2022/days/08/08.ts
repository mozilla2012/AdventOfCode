// https://adventofcode.com/2022/day/8

export function adventMain(input: string): any {
    console.log('Running day 08...');

    let grid: number[][] = []; // Index cells with [row][col]
    const rows = input.split('\n');
    for (let row of rows) {
        grid.push(row.split('').map((str)=>parseInt(str)));
    }
    const numCols = grid[0]!.length;
    const numRows = grid.length;
    
    let numVisibleTrees = (numCols * 2) + (numRows * 2) - 4; // Start by counting the border.

    let highScore = 0;
    // THE GRID; THE DIGITAL FRONTIER 
    for(let row = 1; row < numRows - 1; row++) {
        for(let col = 1; col < numCols - 1; col++) {
            if(visibleLeft(row, col, grid) || visibleRight(row, col, grid) || visibleTop(row, col, grid) || visibleBot(row, col, grid)){
                numVisibleTrees++;
                let score = scoreTree(row, col, grid);
                if(score > highScore) {
                    highScore = score;
                }
            }
        }
    }
    
    // return numVisibleTrees; // Part 1
    return highScore;  // Part 2
}

// All of this crap is highly repeated and could probably be golfed better, but now it's 3am and I don't want to right now :)
function visibleLeft(row: number, col: number, grid: number[][]): boolean {
    const height: number = grid[row]![col]!;
    for(let i = 0; i < col; i++) {
        if (grid[row]![i]! >= height){
            return false;
        }
    }
    return true;
}

function visibleRight(row: number, col: number, grid: number[][]): boolean {
    const height: number = grid[row]![col]!;
    for(let i = grid.length - 1; i > col; i--) {
        if (grid[row]![i]! >= height){
            return false;
        }
    }
    return true;
}

function visibleTop(row: number, col: number, grid: number[][]): boolean {
    const height: number = grid[row]![col]!;
    for(let i = 0; i < row; i++) {
        if (grid[i]![col]! >= height){
            return false;
        }
    }
    return true;
}

function visibleBot(row: number, col: number, grid: number[][]): boolean {
    const height: number = grid[row]![col]!;
    for(let i = grid[0]!.length - 1 ; i > row; i--) {
        if (grid[i]![col]! >= height){
            return false;
        }
    }
    return true;
}

function scoreTree(row: number, col: number, grid: number[][]): number {
    return scoreLeft(row, col, grid) * scoreRight(row, col, grid) * scoreTop(row, col, grid) * scoreBot(row, col, grid);
}

function scoreLeft(row: number, col: number, grid: number[][]): number {
    let score = 0;
    const height: number = grid[row]![col]!;
    for(let i = col - 1; i >= 0; i--) {
        score++;
        if(grid[row]![i]! >= height) {
            return score;
        } 
    }
    return score;
}

function scoreRight(row: number, col: number, grid: number[][]): number {
    let score = 0;
    const height: number = grid[row]![col]!;
    for(let i = col + 1; i < (grid[0]!.length); i++) {
        score++;
        if(grid[row]![i]! >= height) {
            return score;
        } 
    }
    return score;
}

function scoreTop(row: number, col: number, grid: number[][]): number {
    let score = 0;
    const height: number = grid[row]![col]!;
    for(let i = row - 1; i >= 0; i--) {
        score++;
        if(grid[i]![col]! >= height) {
            return score;
        } 
    }
    return score;
}

function scoreBot(row: number, col: number, grid: number[][]): number {
    let score = 0;
    const height: number = grid[row]![col]!;
    for(let i = row + 1; i < (grid.length); i++) {
        score++;
        if(grid[i]![col]! >= height) {
            return score;
        } 
    }
    return score;
}