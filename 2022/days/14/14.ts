// https://adventofcode.com/2022/day/14

export function adventMain(input: string): any {
    const lines = input.split('\n');
    // First, read in all lines. Find the largest X and Y values.
    let maxRow = 0;
    let rockFormations: number[][][] = [];
    for(let inputLine of lines) {
        let strRockLine: string[] = inputLine.split(' -> ');
        let rockLine: number[][] = [];
        for(let strPoint of strRockLine) {
            let point: number[] = strPoint.split(',').map(strNum => parseInt(strNum)); // point[] = [col, row]
            if((point[1]!) > maxRow) { maxRow = (point[1]!); }
            rockLine.push(point);
        }
        rockFormations.push(rockLine);
    }

    // Part 2
    rockFormations.push([[0, maxRow+2], [999999, maxRow+2]]);
    maxRow += 2;
    // end Part 2

    // Then initialize a grid of size maxRow * maxCol and draw the rock lines.
    let cave: number[][] = [];
    for(let row = 0; row < maxRow+2; row++) { // Add two to the height just to be safe
        let line = [];
        for(let col = 0; col < 999999+2; col++) { // Add two to the width just to be safe
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
            cave[((formation[i]!)[1]!)]![((formation[i]!)[0]!)] = 1;
            cave[((formation[i+1]!)[1]!)]![((formation[i+1]!)[0]!)] = 1;
            if(((formation[i]!)[1]!) === ((formation[i+1]!)[1]!)) {
                // Draw a horizontal line
                let coli = ((formation[i]!)[0]!);
                do {
                    cave[((formation[i]!)[1]!)]![coli] = 1;
                    coli = (((formation[i]!)[0]!) < ((formation[i+1]!)[0]!)) ? coli + 1 : coli - 1;
                } while(coli !== ((formation[i+1]!)[0]!));
            } else if(((formation[i]!)[0]!) === ((formation[i+1]!)[0]!)) {
                // Draw a vertical line
                let rowi = ((formation[i]!)[1]!);
                do {
                    cave[rowi]![((formation[i]!)[0]!)] = 1;
                    rowi = (((formation[i]!)[1]!) < ((formation[i+1]!)[1]!)) ? rowi + 1 : rowi - 1;
                } while(rowi !== ((formation[i+1]!)[1]!));
            }
        }
    }
    return cave;
}

function simulateCave(cave: number[][]): number {
    while(true) { // Generate sand constantly
        let sandRow = -1;
        let sandCol = 500;
        while(true) { // Move the sand until it stops or falls off
            if(++sandRow + 1 === cave.length || cave[0]![500] === 2) {
                // WE HAVE 2 FALLING OFF! OR WE'RE PLUGGED UP!
                return cave.reduce((acc1, currentRow)=> acc1 + currentRow.reduce((acc2, section)=>acc2 + ((section === 2) ? 1 : 0)), -1);;
            }
            if(cave[sandRow+1]![sandCol] === 0) {}
            else if (cave[sandRow+1]![sandCol-1] === 0) { // can move down left, do so
                sandCol--;
            } else if (cave[sandRow+1]![sandCol+1] === 0) { // can move down right, do so
                sandCol++;
            } else { // CAN'T MOVE DOWN; FREEZE and make new sand
                cave[sandRow]![sandCol] = 2;
                break;
            }
        }
    }
}