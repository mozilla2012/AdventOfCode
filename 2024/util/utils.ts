/**
 * Given a 2D array of any type, print each line of the grid.
 * Each row gets joined together and printed as one long string.
 */
export function printGrid(grid: any[][]) {
    grid.forEach((s)=> console.log(s.join('')));
    console.log();
}

/**
 * Given a 2D array of any type, create a hash string that represents the grid.
 * Can be used to check if grids are equal.
 * @returns a hashed string representing a 2D array
 */
export function hashGrid(grid: any[][]): number {
    const gridStr = grid.map((row: any[])=>row.join('')).join('');
    return hashString(String(gridStr));
}

/**
 * Given a string, return a hash representing that string.
 * This function copied shamelessly from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * @param str to be hashed
 * @param seed an integer that can be supplied to change the hash
 * @returns a hashed version of the supplied string
 */
export const hashString = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

/**
 * Given a 2D array of any type, swap the rows and columns.
 * In other words, mirror the array over the diagnonal and return a copy.
 */
export function transpose(grid: any[][]): any[][] {
    return grid[0]!.map((_, colIndex) => grid.map(row => row[colIndex]))
}

/**
 * Given a 2D array of any type, rotate the grid clockwise.
 */
export function rotateCw(grid: any[][]): any[][] {
    return grid[0]!.map((_, colIndex) => grid.map(row => row[colIndex]).reverse())
}
/**
 * Given a 2D array of any type, rotate the grid counterclockwise.
 */
export function rotateCcw(grid: any[][]): any[][] {
    return rotateCw(rotateCw(rotateCw(grid))); // Yeah this should probably be done the right way
}