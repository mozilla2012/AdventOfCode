// https://adventofcode.com/2022/day/12
// let shortestPath: number;

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let heights: number[][] = [];
    let distance: number[][] = [];
    let start: [number, number] = [-1, -1];
    let goal: [number, number] = [-1, -1];
    for(let row = 0; row < lines.length; row++) {
        let intRow: number[] = [];
        let distRow: number[] = [];
        for (let col = 0; col < lines[0]!.length; col++) {
            if(lines[row]!.charAt(col) === 'S') { // Start point
                start = [row, col];
                intRow.push(1);
            } else if(lines[row]!.charAt(col) === 'E') { // End goal point
                goal = [row, col];
                intRow.push(26);
            } else {
                intRow.push(lines[row]!.charCodeAt(col) - 'a'.charCodeAt(0) + 1);
            }
            distRow.push(9999);
        }
        heights.push(intRow);
        distance.push(distRow);
    }

    distance[start[0]]![start[1]] = 0;
    let cellsToPaintNext: [number, number][] = [];
    cellsToPaintNext.push(start);

    while(cellsToPaintNext.length > 0) {
        cellsToPaintNext = cellsToPaintNext.concat(paintNeighbors(cellsToPaintNext[0]!, heights, distance));
        cellsToPaintNext.shift();
    }
    return distance[goal[0]]![goal[1]]!;
}

function paintNeighbors(current: [number, number], heights: number[][], distance: number[][]): [number,number][] {
    const curRow: number = current[0];
    const curCol: number = current[1];
    const curHeight: number = heights[curRow]![curCol]!;
    const curDistance: number = distance[curRow]![curCol]!;
    let cellsToPaintNext: [number, number][] = [];
    // Then traverse...
    if((curRow-1) >= 0 // Spot is in grid
        && ( heights[curRow-1]![curCol]! <= (curHeight + 1)) // It is accessible
        && (distance[curRow-1]![curCol]! > curDistance + 1)) { // Is the distance greater than the current or a peer?
            distance[curRow-1]![curCol]! = curDistance + 1;
            cellsToPaintNext.push([curRow-1, curCol]); // UP
    }
    if((curRow+1) <= (heights.length-1)  // Spot is in grid
        && ( heights[curRow+1]![curCol]! <= (curHeight + 1)) // It is accessible
        && (distance[curRow+1]![curCol]! > curDistance + 1)) { // Is the distance greater than the current or a peer?
            distance[curRow+1]![curCol]! = curDistance + 1;
            cellsToPaintNext.push([curRow+1, curCol]); // DOWN
    }
    if((curCol-1) >= 0  // Spot is in grid
        && ( heights[curRow]![curCol-1]! <= (curHeight + 1)) // It is accessible
        && (distance[curRow]![curCol-1]! > curDistance + 1)) { // Is the distance greater than the current or a peer?
            distance[curRow]![curCol-1]! = curDistance + 1;
            cellsToPaintNext.push([curRow, curCol-1]); // LEFT
    }
    if((curCol+1) <= (heights[0]!.length-1) // Spot is in grid
        && ( heights[curRow]![curCol+1]! <= (curHeight + 1)) // It is accessible
        && (distance[curRow]![curCol+1]! > curDistance + 1)) { // Is the distance greater than the current or a peer?
            distance[curRow]![curCol+1]! = curDistance + 1;
            cellsToPaintNext.push([curRow, curCol+1]); // RIGHT
    }
    return cellsToPaintNext;
}

function arePointsEqual(x: [number, number], y: [number, number]) {
    return ((x[0] === y[0]) && (x[1] === y[1]));
}
