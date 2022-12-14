// https://adventofcode.com/2022/day/14

const SAND = 2;
const ROCK = 1;
const VOID = 0;

export function adventMain(input: string): any {
    const lines = input.split('\n');
    // First, read in all lines. Find the smallest and largest X and Y values.
    let maxRow = 0;
    let maxCol = 0;
    let rockFormations: number[][][] = [];
    for(let inputLine of lines) {
        let strRockLine: string[] = inputLine.split(' -> ');
        let rockLine: number[][] = [];
        for(let strPoint of strRockLine) {
            let point: number[] = strPoint.split(',').map(strNum => parseInt(strNum)); // point[] = [col, row]
            let row = point[1]!;
            let col = point[0]!;
            if(row > maxRow) { maxRow = row; }
            if(col > maxCol) { maxCol = col; }
            rockLine.push(point);
        }
        rockFormations.push(rockLine);
    }
    // Then initialize a grid of size maxRow * maxCol and draw the rock lines.
    let cave: number[][] = [];

    for(let row = 0; row < maxRow+2; row++) { // Add two to the height just to be safe
        let line = [];
        for(let col = 0; col < maxCol+2; col++) { // Add two to the width just to be safe
            line.push(0);
        }
        cave.push(line);
    }
    cave = drawRockLines(cave, rockFormations);
    return simulateCave(cave);
}

function drawRockLines(cave: number[][], rockFormations: number[][][]): number[][] {
    for(let formation of rockFormations) {
        for(let i = 0; i < formation.length - 1; i++) {
            let point1 = formation[i]!;
            let point2 = formation[i+1]!;
            let row1 = point1[1]!;
            let col1 = point1[0]!;
            let row2 = point2[1]!;
            let col2 = point2[0]!;
            cave[row1]![col1] = ROCK;
            cave[row2]![col2] = ROCK;
            if(row1 === row2) {
                // Draw a horizontal line
                let coli = col1;
                do {
                    cave[row1]![coli] = ROCK;
                    coli = (col1 < col2) ? coli + 1 : coli - 1;
                } while(coli !== col2);
            } else if(col1 === col2) {
                // Draw a vertical line
                let rowi = row1;
                do {
                    cave[rowi]![col1] = ROCK;
                    rowi = (row1 < row2) ? rowi + 1 : rowi - 1;
                } while(rowi !== row2);
            }
        }
    }
    return cave;
}
function simulateCave(cave: number[][]): number {
    
    let iterations = 0;
    const sandOriginRow = 0;
    const sandOriginCol = 500;
    while(true) { // Generate sand constantly
        let sandRow = sandOriginRow;
        let sandCol = sandOriginCol;

        while(true) { // Move the sand until it stops or falls off
            if(sandRow + 1 === cave.length) {
                // WE HAVE SAND FALLING OFF! 
                return countSand(cave);
            }
            if(cave[sandRow+1]![sandCol] === VOID) { // can move straight down, do so
                sandRow++;
            } else if (cave[sandRow+1]![sandCol-1] === VOID) { // can move down left, do so
                sandRow++;
                sandCol--;
            } else if (cave[sandRow+1]![sandCol+1] === VOID) { // can move down right, do so
                sandRow++;
                sandCol++;
            } else { // CAN'T MOVE DOWN; FREEZE and make new sand
                cave[sandRow]![sandCol] = SAND;
                break;
            }
        }
    }
}

function countSand(cave: number[][]): number {
    let count = 0;
    for(let row of cave) {
        for (let section of row) {
            if (section === SAND) {
                count++;
            }
        }
    }
    return count;
}
