// https://adventofcode.com/2022/day/0

const UNKNOWN = 2;
const ROCK = 0;
const AIR = 1;
const MAX = 21;
export function adventMain(input: string): any {
    const lines = input.split('\n');
    
    let grid: number[][][] = [];
    for(let x = 0; x <= MAX; x++) {
        let square = [];
        for(let y = 0; y <= MAX; y++) {
            let line = [];
            for(let z = 0; z <= MAX; z++) {
                line.push(UNKNOWN);
            }
            square.push(line);
        }
        grid.push(square);
    }

    for(let line of lines) {
        let v: string[] = line.split(',');
        let x = parseInt(v[0]!)+1;
        let y = parseInt(v[1]!)+1;
        let z = parseInt(v[2]!)+1;
        grid[x]![y]![z]! = ROCK;
    }
    return getSurfaceArea(grid);
}

function getSurfaceArea(grid: number[][][]): number {
    let sa = 0;
    for(let x = 0; x <= MAX; x++) {
        fillInAir(grid[x]!);
        // printSquare(grid[x]!);
    }
    for(let x = 0; x <= MAX; x++) {
        for(let y = 0; y <= MAX; y++) {
            for(let z = 0; z <= MAX; z++) {
                sa += calcSa(x, y, z, grid);
            }
        }
    }
    return sa;
}

function fillInAir(sq: number[][]) {
    sq[0]![0] = AIR;
    for(let x = 0; x <= MAX; x++) {
        for(let y = 0; y <= MAX; y++) {
            if (shouldBeAir(x, y, sq)) {
                sq[x]![y] = AIR;
            }
        }
    }
}

function shouldBeAir(x: number, y: number, sq: number[][]): boolean {
    return (sq[x]![y]! === UNKNOWN);
}

function calcSa(x: number, y: number, z: number, grid: number[][][]): number {
    if(grid[x]![y]![z]! !== ROCK) {
        return 0;
    }
    let sa = 0;
    if (grid[x]![y]![z-1]! === AIR) { sa++; }
    if (grid[x]![y]![z+1]! === AIR) { sa++; }
    if (grid[x]![y-1]![z]! === AIR) { sa++; }
    if (grid[x]![y+1]![z]! === AIR) { sa++; }
    if (grid[x-1]![y]![z]! === AIR) { sa++; }
    if (grid[x+1]![y]![z]! === AIR) { sa++; }
    return sa;
}
