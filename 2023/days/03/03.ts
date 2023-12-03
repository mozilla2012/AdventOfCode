// https://adventofcode.com/2023/day/3

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let grid: string[][] = [];
    for(let line of lines) {
        let lineArray = [];
        for (let char of line) {
            lineArray.push(char);
        }
        grid.push(lineArray);
    }

    const length: number = grid.length;
    const width: number = grid[0]!.length;
    let sum = 0;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            const currentChar: string = grid[x]![y]!;
            const originalY = y;
            if(!Number.isNaN(parseInt(currentChar))) {
                let compoundNum: string = currentChar;
                while(y < width - 1 && !Number.isNaN(parseInt(grid[x]![y+1]!))) {
                    compoundNum += grid[x]![++y];
                }
                sum += (isValidPartNumber(grid, length, width, x, originalY, compoundNum.length))
                    ? parseInt(compoundNum)
                    : 0;
            }
        }
    }
    return sum;
}
function isValidPartNumber(grid: string[][], length: number, width: number, numX: number, numY: number, numberLength: number): boolean {
    const startingX = Math.max(0, numX - 1);
    const endingX = Math.min(width - 1, numX + 1);
    const startingY = Math.max(0, numY - 1);
    const endingY = Math.min(length - 1, numY + numberLength);

    for (let x = startingX; x <= endingX; x++) {
        for (let y = startingY; y <= endingY; y++) {
            const charToAnalyze = grid[x]![y]!;
            if(charToAnalyze === '.' || !Number.isNaN(parseInt(charToAnalyze))) {
                continue;
            } else {
                return true;
            }
        }
    }
    return false;
}

