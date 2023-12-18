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
    // visited: boolean;
    heatLoss: number;
    // visited: number; // How many times has this node been visited?

    constructor(row: number, col: number, value: number) {
        this.row = row;
        this.col = col;
        this.value = value;
        // this.visited = false;
        this.heatLoss = Number.MAX_SAFE_INTEGER;
        // this.visited = 0;
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

    markNeighbors(grid, grid[0]![0]!, 0, 0, 0);

    // grid.forEach((row: Node[]) => row.forEach((node: Node)=> console.log(node)));

    // grid.forEach((row: Node[]) => console.log(row.map((node: Node) => node.heatLoss).join(' ')));


    return grid[numRows-1]![numCols-1]!.heatLoss - grid[0]![0]!.heatLoss;
}

function markNeighbors(grid: Node[][], node: Node, direction: number, stepsInDirection: number, previousHeat: number): void {
    let oneThree = false;

    const newHeatLoss: number = node.value + previousHeat;
    const betterHeatloss: boolean = newHeatLoss <= node.heatLoss;
    // if(node.row === 1 && node.col === 3) {
    //     console.log('At 1,3', node, direction, stepsInDirection, previousHeat, newHeatLoss, betterHeatloss);
    //     oneThree = true;
    // }
    // if(node.row === 1 && node.col === 4) {
    //     console.log('At 1,4', node, direction, stepsInDirection, previousHeat, newHeatLoss, betterHeatloss);
    // }

    if(betterHeatloss) {
        node.heatLoss = newHeatLoss; // Set the new value
        // Check the neighbors.
        const rowAbove = node.row - 1;
        const rowBelow = node.row + 1;
        const colBefore = node.col - 1;
        const colAfter = node.col + 1;
        if(rowAbove >= 0 && (direction != UP || stepsInDirection < maxSteps)) {
            const newStepsInDir = (direction === UP) ? stepsInDirection + 1 : 1;
            // console.log('At', node, 'checking', direction);
            markNeighbors(grid, grid[rowAbove]![node.col]!, UP, newStepsInDir, node.heatLoss);
        } else {
            if (oneThree) {console.log('Skipping going up;', direction, stepsInDirection, node.heatLoss);}
        }
        if(rowBelow < numRows && (direction != DOWN || stepsInDirection < maxSteps)) {
            const newStepsInDir = (direction === DOWN) ? stepsInDirection + 1 : 1;
            // console.log('At', node, 'checking', direction);

            markNeighbors(grid, grid[rowBelow]![node.col]!, DOWN, newStepsInDir, node.heatLoss);
        } else {
            if (oneThree) {console.log('Skipping going down;', direction, stepsInDirection, node.heatLoss);}
        }
        if(colBefore >= 0 && (direction != LEFT || stepsInDirection < maxSteps)) {
            const newStepsInDir = (direction === LEFT) ? stepsInDirection + 1 : 1;
            // console.log('At', node, 'checking', direction);

            markNeighbors(grid, grid[node.row]![colBefore]!, LEFT, newStepsInDir, node.heatLoss);
        } else {
            if (oneThree) {console.log('Skipping going left;', direction, stepsInDirection, node.heatLoss);}
        }
        if(colAfter < numCols && (direction != RIGHT || stepsInDirection < maxSteps)) {
            const newStepsInDir = (direction === RIGHT) ? stepsInDirection + 1 : 1;
            if (oneThree) {console.log('Going right!!', direction, stepsInDirection, node.heatLoss);}
            // console.log('At', node, 'checking', direction);

            markNeighbors(grid, grid[node.row]![colAfter]!, RIGHT, newStepsInDir, node.heatLoss);
        } else {
            if (oneThree) {console.log('Skipping going right;', direction, stepsInDirection, node.heatLoss);}
        }
    }
}

