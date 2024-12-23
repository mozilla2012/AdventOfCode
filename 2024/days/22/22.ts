// https://adventofcode.com/2024/day/22

export function adventMain(input: string): any {
    return input.split('\n').reduce((sum, line) => sum + Array.from(Array(2000)).reduce((liner) => s3(s2(s1(liner))), parseInt(line)), 0);
}

function s1(n: number): number {
    return mixNPrune(n, n * 64);
}

function s2(n: number): number {
    return mixNPrune(n, Math.floor(n/32));
}

function s3(n: number): number {
    return mixNPrune(n, n * 2048);
}

function mixNPrune(s: number, n1: number): number {
    return ((s ^ n1) >>> 0) % 16777216;
}
