import { Grid } from "./Grid";

/**
 * Given a string, return a hash representing that string.
 * This function copied shamelessly from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * @param str to be hashed
 * @param seed an integer that can be supplied to change the hash
 * @returns a hashed version of the supplied string
 */
export const hashString = (str: string, seed = 0): number => {
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
 * Simple wrapper of console.log(), for brevity.
 */
export function p(...args: any[]) {
    if(Array.isArray(args) && args.length === 1 && args[0] instanceof Grid) {
        console.log('Defaulting to grid.print():');
        args[0].print();
    } else {
        console.log(...args);
    }
}