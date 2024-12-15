// https://adventofcode.com/2024/day/7

import { p } from "../../util/utils";

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let valid = 0;
    lines.forEach((line: string) => {
        const parts = line.split(':');
        const ans: number = parseInt(parts[0]);
        const nums: number[] = parts[1].trim().split(' ').map(s => parseInt(s));
        valid += isLineValid(ans, nums, []) ? ans : 0;
    });
    return valid;
}

function isLineValid(ans: number, nums: number[], ops: string[]): boolean {
    if (ops.length !== (nums.length - 1)) {
        return isLineValid(ans, nums, [...ops, '+'])
        || isLineValid(ans, nums, [...ops, '*']);
    } else {
        return (ans === nums.reduce((res: number, n: number, i: number)=>{
            if(i === ops.length) {
                return res;
            }
            let op: string = ops[i];
            let nextNum = nums[i+1];
            return (op === '+') ? res + nextNum : res * nextNum;
        }, nums[0]));
    }
}
