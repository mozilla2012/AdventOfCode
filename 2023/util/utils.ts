export function printGrid(grid: any[][]) {
    grid.forEach((s)=> console.log(s.join('')));
    console.log();
}

export function hashGrid(grid: any[][]): number {
    const gridStr = grid.map((row: any[])=>row.join('')).join('');
    return hashString(String(gridStr));
}

// This function copied shamelessly from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
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

export function rotateCw(thing: any[][]): any[][] {
    return thing[0]!.map((_, colIndex) => thing.map(row => row[colIndex]).reverse())
}

export function rotateCcw(thing: any[][]): any[][] {
    return rotateCw(rotateCw(rotateCw(thing))); // Yeah this should probably be done the right way
}