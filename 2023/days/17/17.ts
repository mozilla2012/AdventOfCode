// https://adventofcode.com/2023/day/17

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

const maxSteps = 3;

let numRows: number;
let numCols: number;

class Node {
    row: number;
    col: number;
    value: number;
    heatLoss: number[];
    visited: boolean[];

    constructor(row: number, col: number, value: number) {
        this.row = row;
        this.col = col;
        this.value = value;
        this.heatLoss = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
        this.visited = [false, false, false, false];
    }
}

export function adventMain(input: string): any {
    const lines = input.split('\n');
    const grid: Node[][] = [];
    lines.forEach((line, row) => {
        grid.push(line.split('').map((value, col) => new Node(row, col, parseInt(value))));
    });
    numRows = grid.length;
    numCols = grid[0]!.length;

    // grid.forEach((row: Node[]) => row.forEach((node: Node)=> console.log(node)));

    // markNeighborsRecursive(grid, grid[0]![0]!, 0, 0, 0); // Uncomment this for the recursive method that has a call stack overflow.
    grid[0]![0]!.heatLoss = [0,0,0,0];
    markNeighbors(grid, grid[0]![0]!, 1, 0, 0); // IDEA FOR TOMORROW: Make "visited" and "heatloss" and array of arrays. The first array is indexed by direcion, and the second array is indexed by number of visits.

    // grid.forEach((row: Node[]) => row.forEach((node: Node)=> console.log(node)));

    // grid.forEach((row: Node[]) => console.log(row.map((node: Node) => String(node.heatLoss).padStart(3, ' ')).join(' ')));
    // grid.forEach((row: Node[]) => console.log(row.map((node: Node) => node.heatLoss).join(' ')));


    return Math.min(...grid[numRows-1]![numCols-1]!.heatLoss) - grid[0]![0]!.value;
    // return 0; //todo - figure out how to return the smallest heat loss number.
}

function markNeighbors(grid: Node[][], node: Node, direction: number, stepsInDirection: number, previousHeat: number): void {
    node.visited[direction] = true;
    const rowAbove = node.row - 1;
    const rowBelow = node.row + 1;
    const colBefore = node.col - 1;
    const colAfter = node.col + 1;
    if(rowAbove >= 0 && (direction != UP || stepsInDirection < maxSteps) && direction !== DOWN) {
        const neighborNode = grid[rowAbove]![node.col]!;
        neighborNode.heatLoss[UP] = Math.min(neighborNode.heatLoss[UP]!, node.heatLoss[direction]! + neighborNode.value);
    }
    if(rowBelow < numRows && (direction != DOWN || stepsInDirection < maxSteps) && direction !== UP) {
        const newStepsInDir = (direction === DOWN) ? stepsInDirection + 1 : 1;
        markNeighborsRecursive(grid, grid[rowBelow]![node.col]!, DOWN, newStepsInDir, node.heatLoss[direction]!);
    }
    if(colBefore >= 0 && (direction != LEFT || stepsInDirection < maxSteps) && direction !== RIGHT) {
        const newStepsInDir = (direction === LEFT) ? stepsInDirection + 1 : 1;
        markNeighborsRecursive(grid, grid[node.row]![colBefore]!, LEFT, newStepsInDir, node.heatLoss[direction]!);
    }
    if(colAfter < numCols && (direction != RIGHT || stepsInDirection < maxSteps) && direction !== LEFT) {
        const newStepsInDir = (direction === RIGHT) ? stepsInDirection + 1 : 1;
        markNeighborsRecursive(grid, grid[node.row]![colAfter]!, RIGHT, newStepsInDir, node.heatLoss[direction]!);
    }
}


function markNeighborsRecursive(grid: Node[][], node: Node, direction: number, stepsInDirection: number, previousHeat: number): void {
    let oneThree = false;

    const newHeatLoss: number = node.value + previousHeat;
    const betterHeatloss: boolean = newHeatLoss <= node.heatLoss[direction]!;
    // if(node.row === 1 && node.col === 3) {
    //     console.log('At 1,3', node, direction, stepsInDirection, previousHeat, newHeatLoss, betterHeatloss);
    //     oneThree = true;
    // }
    // if(node.row === 1 && node.col === 4) {
    //     console.log('At 1,4', node, direction, stepsInDirection, previousHeat, newHeatLoss, betterHeatloss);
    // }

    if(betterHeatloss) {
        node.heatLoss[direction] = newHeatLoss; // Set the new value
        // Check the neighbors.
        const rowAbove = node.row - 1;
        const rowBelow = node.row + 1;
        const colBefore = node.col - 1;
        const colAfter = node.col + 1;
        if(rowAbove >= 0 && (direction != UP || stepsInDirection < maxSteps) && direction !== DOWN) {
            const newStepsInDir = (direction === UP) ? stepsInDirection + 1 : 1;
            // console.log('At', node, 'checking', direction);
            markNeighborsRecursive(grid, grid[rowAbove]![node.col]!, UP, newStepsInDir, node.heatLoss[direction]!);
        } else {
            if (oneThree) {console.log('Skipping going up;', direction, stepsInDirection, node.heatLoss);}
        }
        if(rowBelow < numRows && (direction != DOWN || stepsInDirection < maxSteps) && direction !== UP) {
            const newStepsInDir = (direction === DOWN) ? stepsInDirection + 1 : 1;
            // console.log('At', node, 'checking', direction);

            markNeighborsRecursive(grid, grid[rowBelow]![node.col]!, DOWN, newStepsInDir, node.heatLoss[direction]!);
        } else {
            if (oneThree) {console.log('Skipping going down;', direction, stepsInDirection, node.heatLoss);}
        }
        if(colBefore >= 0 && (direction != LEFT || stepsInDirection < maxSteps) && direction !== RIGHT) {
            const newStepsInDir = (direction === LEFT) ? stepsInDirection + 1 : 1;
            // console.log('At', node, 'checking', direction);

            markNeighborsRecursive(grid, grid[node.row]![colBefore]!, LEFT, newStepsInDir, node.heatLoss[direction]!);
        } else {
            if (oneThree) {console.log('Skipping going left;', direction, stepsInDirection, node.heatLoss);}
        }
        if(colAfter < numCols && (direction != RIGHT || stepsInDirection < maxSteps) && direction !== LEFT) {
            const newStepsInDir = (direction === RIGHT) ? stepsInDirection + 1 : 1;
            if (oneThree) {console.log('Going right!!', direction, stepsInDirection, node.heatLoss[direction]!);}
            // console.log('At', node, 'checking', direction);

            markNeighborsRecursive(grid, grid[node.row]![colAfter]!, RIGHT, newStepsInDir, node.heatLoss[direction]!);
        } else {
            if (oneThree) {console.log('Skipping going right;', direction, stepsInDirection, node.heatLoss);}
        }
    }
}

