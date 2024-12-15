// https://adventofcode.com/2024/day/7

export function adventMain(input: string): any {
    return input.split('\n').reduce((sum, line: string) => {
        const parts = line.split(':');
        const ans: number = parseInt(parts[0]);
        const nums: number[] = parts[1].trim().split(' ').map(s => parseInt(s));
        return sum + (isLineValid(ans, nums, []) ? ans : 0);
    }, 0);
}

function isLineValid(ans: number, nums: number[], ops: string[]): boolean {
    if (ops.length !== (nums.length - 1)) { // Recursively build out all possibilities.
        return isLineValid(ans, nums, [...ops, '+'])
            || isLineValid(ans, nums, [...ops, '*'])
            || isLineValid(ans, nums, [...ops, '||']);
    }
    return (ans === nums.reduce((result: number, n: number, i: number) => {
        if (i === ops.length) {
            return result;
        }
        let op: string = ops[i];
        let nextNum = nums[i+1];
        return (op === '+') ? (result + nextNum)
        : (op === '*') ? (result * nextNum)
        : parseInt(`${String(result)}${String(nextNum)}`);
    }, nums[0]));
}

// Part 1
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     let valid = 0;
//     lines.forEach((line: string) => {
//         const parts = line.split(':');
//         const ans: number = parseInt(parts[0]);
//         const nums: number[] = parts[1].trim().split(' ').map(s => parseInt(s));
//         valid += isLineValid(ans, nums, []) ? ans : 0;
//     });
//     return valid;
// }

// function isLineValid(ans: number, nums: number[], ops: string[]): boolean {
//     if (ops.length !== (nums.length - 1)) {
//         return isLineValid(ans, nums, [...ops, '+'])
//         || isLineValid(ans, nums, [...ops, '*']);
//     } else {
//         // p('doing: ', nums, ops);
//         return (ans === nums.reduce((res: number, n: number, i: number)=>{
//             if(i === ops.length) {
//                 return res;
//             }
//             let op: string = ops[i];
//             let nextNum = nums[i+1];
//             // p('Eval:', res, op, nextNum);
//             return (op === '+') ? res + nextNum : res * nextNum;
//         }, nums[0]));
//     }
// }