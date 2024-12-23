// https://adventofcode.com/2024/day/22

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let sum = 0;
    lines.forEach((line: string) => {
        let num = parseInt(line);
        for(let i = 0; i< 2000; i++) {
            num = s1(num);
            num = s2(num);
            num = s3(num);
        }
        sum += num;
    });
    return sum;
}

function s1(n: number): number {
    const n1 = n * 64;
    return prune(mix(n, n1));
}

function s2(n: number): number {
    const n1 = Math.floor(n/32);
    return prune(mix(n, n1));
}

function s3(n: number): number {
    const n1 = n * 2048;
    return prune(mix(n, n1));
}

function mix(s: number, n1: number): number {
    return ((s ^ n1) >>> 0);
}

function prune(n: number): number {
    return n % 16777216;
}