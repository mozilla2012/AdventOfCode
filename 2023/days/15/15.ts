// https://adventofcode.com/2023/day/15

export function adventMain(input: string): any {
    const lines = input.split('\n');
    const line = lines[0]!;
    let sum = 0;
    for(let str of line.split(',')) {
        sum += hash(str);
    }
    return sum;
}

function hash(str: string) {
    let val = 0;
    for (let i = 0; i < str.length; i++) {
        val += str.charCodeAt(i);
        val *= 17;
        val %= 256;
    }
    return val;
}