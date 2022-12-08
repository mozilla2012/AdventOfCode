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
    // console.log(numVisibleTrees);

    // THE GRID; THE DIGITAL FRONTIER 
    for(let row = 1; row < numRows - 1; row++) {
        for(let col = 1; col < numCols - 1; col++) {
            if(visibleLeft(row, col, grid) || visibleRight(row, col, grid) || visibleTop(row, col, grid) || visibleBot(row, col, grid)){
                numVisibleTrees++;
            }
        }
    }
    
    return numVisibleTrees;
}

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