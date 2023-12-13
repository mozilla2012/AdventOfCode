// https://adventofcode.com/2023/day/13

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let grid: string[][] = [];
    let sum = 0;
    for(let i = 0; i < lines.length; i++) {
        if (lines[i]!.length < 1) {
            sum += findValForGrid(grid);
            grid = [];
        } else {
        grid.push(lines[i]!.split(''));     
        }
    }
    return sum;
}

function transpose(thing: any[][]): any[][] {
    return thing[0]!.map((_, colIndex) => thing.map(row => row[colIndex]))
}


function printGrid(grid: string[][]) {
    grid.forEach((row: string[]) => console.log(row.join('')));
}

function findValForGrid(grid: string[][]): number {
    // console.log('Searching grid:');
    // printGrid(grid);
    let retVal = 0;

    // find vertical mirrors:
    for(let i = 0; i < grid.length-1; i++) {
        const row: string = grid[i]!.join('');
        const nextRow: string = grid[i+1]!.join('');
        if(row === nextRow) {
            // Potential match found! Check for mirroring.
            // Check below
            let k = i;
            let actualMirror = true;
            for(let j = i+1; (j < grid.length && k >= 0); j++) {
                const rowU: string = grid[k]!.join('');
                const rowD: string = grid[j]!.join('');
                // console.log('Comparing', rowU, rowD);
                if(rowU !== rowD) {
                    // console.log('Not a true mirror');
                    actualMirror = false;
                    break;
                }
                k--;
            }
            if (actualMirror) {
                // console.log('adding1', 100*(i+1));
                retVal += 100*(i+1);
            }
        }
    }

    // console.log('Done checking horizontal');
    const transGrid = transpose(grid);
    // Check horizontal mirror
    for(let i = 0; i < transGrid.length-1; i++) {
        const row: string = transGrid[i]!.join('');
        const nextRow: string = transGrid[i+1]!.join('');
        if(row === nextRow) {
            // Potential match found! Check for mirroring.
            // Check below
            let k = i;
            let actualMirror = true;
            for(let j = i+1; (j < transGrid.length && k >= 0); j++) {
                const rowU: string = transGrid[k]!.join('');
                const rowD: string = transGrid[j]!.join('');
                // console.log('Comparing', rowU, rowD);
                if(rowU !== rowD) {
                    // console.log('Not a true mirror');
                    actualMirror = false;
                    break;
                }
                k--;
            }
            if (actualMirror) {
                // console.log('adding2', i+1);
                retVal += i+1;
            }
        }
    }

    // console.log('Returning', retVal);
    return retVal;
}
