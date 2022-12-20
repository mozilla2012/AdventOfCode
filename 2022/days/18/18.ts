// https://adventofcode.com/2022/day/18

const UNKNOWN = 2;
const ROCK = 0;
const AIR = 1;
const MAX = 21;
export function adventMain(input: string): any {
    // Parse input
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
    // Determine what is external air
    grid[0]![0]![0] = AIR;
    markAllAir(grid);
    // Count SA
    return getSurfaceArea(grid);
}

function getSurfaceArea(grid: number[][][]): number {
    let sa = 0;
    for(let x = 0; x <= MAX; x++) {
        for(let y = 0; y <= MAX; y++) {
            for(let z = 0; z <= MAX; z++) {
                sa += calcSa(x, y, z, grid);
            }
        }        
    }
    return sa;
}

function calcSa(x: number, y: number, z: number, grid: number[][][]): number {
    if(grid[x]![y]![z]! !== ROCK) {
        return 0; // Only count SA for rocks
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

function markAllAir(grid: number[][][]): void {
    let prevUnknown = Number.MAX_SAFE_INTEGER;
    let currentUnknown = countUnknown(grid);
    // This is stupid but I was having issues with recursion. For every space that is still UNKNOWN and any direct neighbors are air, mark the voxel as air. Repeat this process until the number of UNKNOWN voxels stops changing.
    while(prevUnknown != currentUnknown) {
        for(let x = 0; x <= MAX; x++) {
            for(let y = 0; y <= MAX; y++) {
                for(let z = 0; z <= MAX; z++) {
                    if (grid[x]![y]![z] === UNKNOWN && anyNeighborsAreAir(x,y,z,grid)){
                        grid[x]![y]![z]! = AIR;
                    }
                }
            }
        }
        prevUnknown = currentUnknown;
        currentUnknown = countUnknown(grid);
    }
}

// Count how many voxels are "UNKNOWN" within the blob.
function countUnknown(grid: number[][][]) {
    let unknownCount = 0;
    for(let x = 0; x <= MAX; x++) {
        for(let y = 0; y <= MAX; y++) {
            for(let z = 0; z <= MAX; z++) {
                if (grid[x]![y]![z] === UNKNOWN){
                    unknownCount++;
                }
            }
        }
    }
    return unknownCount;
}

// Return true if on any edge or if any non-diagonal neighbor is air.
function anyNeighborsAreAir(x: number, y: number, z: number, grid: number[][][]): boolean {
    return ( x === 0 || y === 0 || z === 0 ||
        x === MAX || y === MAX || z === MAX ||
        grid[x+1]![y]![z]! === AIR ||
        grid[x-1]![y]![z]! === AIR ||
        grid[x]![y+1]![z]! === AIR ||
        grid[x]![y-1]![z]! === AIR ||
        grid[x]![y]![z+1]! === AIR ||
        grid[x]![y]![z-1]! === AIR
    );
}
