// https://adventofcode.com/2024/day/22

import { p } from "./../../util/utils";


export function adventMain(input: string): any {
    const lines = input.split('\n');
    let highest = 0;

    for(let one = -9; one <= 9; one++) {
        for(let two = -9; two <= 9; two++) {
            for(let three = -9; three <= 9; three++) {
                for(let four = -9; four <= 9; four++) {
                    const seq: number[] = [one, two, three, four];
                    if(three === -9 && four === -9) {
                        p(seq);
                    }
                    let sum = 0;
                    lines.forEach((line: string) => {
                        let num = parseInt(line);
                        let salePrice = 0;
                        const prices: number[] = [];
                        const changes: number[] = [];
                        for(let i = 0; i < 2000; i++) {
                            prices.push(num % 10);
                            if (prices.length > 4) { prices.shift() };
                            if(prices.length > 1) { changes.push(prices[prices.length-1] - prices[prices.length-2]) }
                            if (changes.length > 4) { changes.shift() }
                            // p(`${line}: ${num}, prices: ${[prices]}, changes ${changes}`);
                            if(seq[0] === changes[0] && seq[1] === changes[1] && seq[2] === changes[2] && seq[3] === changes[3]) {
                                salePrice = prices.pop() as number;
                                // p(`Sequence found! Price: ${salePrice}`);
                                break;
                            }
                            // Get the next secret number
                            num = s1(num);
                            num = s2(num);
                            num = s3(num);
                        }
                        sum += salePrice;
                    });
                    highest = Math.max(highest, sum);
                }
            }
        }
    }
    return highest;
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

// Part 1
// export function adventMain(input: string): any {
//     return input.split('\n').reduce((sum, line) => sum + Array.from(Array(2000)).reduce((liner) => s3(s2(s1(liner))), parseInt(line)), 0);
// }

// function s1(n: number): number {
//     return mixNPrune(n, n * 64);
// }

// function s2(n: number): number {
//     return mixNPrune(n, Math.floor(n/32));
// }

// function s3(n: number): number {
//     return mixNPrune(n, n * 2048);
// }

// function mixNPrune(s: number, n1: number): number {
//     return ((s ^ n1) >>> 0) % 16777216;
// }
