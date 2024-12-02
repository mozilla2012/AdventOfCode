// https://adventofcode.com/2024/day/2

import { triggerAsyncId } from "async_hooks";
import { Grid } from "../../util/Grid";
import { p } from "../../util/utils";

// Part 2, legible
export function adventMain(input: string): any {
    return input.split('\n').reduce((safeRows: number, row: string) => {
        const levelNums: number[] = row.split(' ').map(s => parseInt(s));    
        return safeRows + ((
            testLevel(levelNums) || levelNums.some((_, index) => testLevel(levelNums.toSpliced(index, 1)))
        ) ? 1 : 0);
    }, 0);
}

function testLevel(nums: number[]): boolean {
    return nums.every((_, i: number) => {
        if(i === nums.length) {
            return true;
        }
        let diff = nums[i + 1] - nums[i];
        return !(diff === 0 || Math.abs(diff) > 3 || (diff/(nums[1] - nums[0])) < 0);
    });
}

// // Part 2, in one line
// export function adventMain(input: string): number {
//     return input.split('\n').reduce((u, w) => u + ((w.split(' ').map((s) => parseInt(s)).every((_, i) => (i === w.split(' ').map((s) => parseInt(s)).length) || !((w.split(' ').map((s) => parseInt(s))[i+1] - w.split(' ').map((s) => parseInt(s))[i]) === 0 || Math.abs((w.split(' ').map((s) => parseInt(s))[i+1] - w.split(' ').map((s) => parseInt(s))[i])) > 3 || ((w.split(' ').map((s) => parseInt(s))[i+1] - w.split(' ').map((s) => parseInt(s))[i])/(w.split(' ').map((s) => parseInt(s))[1] - w.split(' ').map((s) => parseInt(s))[0])) < 0)) || w.split(' ').map((s) => parseInt(s)).some((_, d) =>  w.split(' ').map((s) => parseInt(s)).toSpliced(d, 1).every((_, i) => (i === w.split(' ').map((s) => parseInt(s)).toSpliced(d, 1).length) || !((w.split(' ').map((s) => parseInt(s)).toSpliced(d, 1)[i+1] - w.split(' ').map((s) => parseInt(s)).toSpliced(d, 1)[i]) === 0 || Math.abs((w.split(' ').map((s) => parseInt(s)).toSpliced(d, 1)[i+1] - w.split(' ').map((s) => parseInt(s)).toSpliced(d, 1)[i])) > 3 || ((w.split(' ').map((s) => parseInt(s)).toSpliced(d, 1)[i+1] - w.split(' ').map((s) => parseInt(s)).toSpliced(d, 1)[i])/(w.split(' ').map((s) => parseInt(s)).toSpliced(d, 1)[1] - w.split(' ').map((s) => parseInt(s)).toSpliced(d, 1)[0])) < 0)))) ? 1 : 0), 0);
// }

// // Part 2
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     lines.forEach((line: string) => {

//     });

//     const g: Grid<string> = Grid.fromString<string>(input, ' ');
//     g.print(' ');

//     let count = 0;
//     g.data.forEach((row: string[]) => {
//         const nums = row.map((s) => parseInt(s));
        
//         const success = testLevel(nums, false) || nums.some((element: number, index) => {
//             const numsCopy = [...nums];
//             numsCopy.splice(index, 1);
//             return testLevel(numsCopy, false);
//         });
       
//         if(success) {
//             p('Safe!')
//             count++;
//         }
//         p();
//     });
//     return count;
// }

// function testLevel(nums: number[], canRemove: boolean): boolean {
//     let sameDir = true;
//     let dir = nums[1] - nums[0];
//     p('testing...', nums, dir);
//     let changeBad = false;
//     for (let i=1; i < nums.length; i++) {
//         let second = nums[i];
//         let first = nums[i-1];
//         p(first, second);
//         let diff = second - first;
//         p('diff', diff);
//         if(diff === 0 || Math.abs(diff) > 3) {
//             changeBad = true;
//         }
//         p('dir:', diff/dir);
//         if(diff/dir < 0) {
//             sameDir = false;
//         }
//         if (!sameDir || changeBad) {
//             return false;
//         } 
//     }
//     return (true);
// }

// Part 1
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     lines.forEach((line: string) => {

//     });

//     const g: Grid<string> = Grid.fromString<string>(input, ' ');
//     g.print(' ');

//     let count = 0;
//     g.data.forEach((row: string[]) => {
//         const nums = row.map((s) => parseInt(s));
//         let sameDir = true;
//         let dir = nums[1] - nums[0];
//         p(nums, dir);
//         let changeBad = false;
//         for (let i=1; i < nums.length; i++) {
//             let second = nums[i];
//             let first = nums[i-1];
//             p(first, second);
//             let diff = second - first;
//             p('diff', diff);
//             if(diff === 0 || Math.abs(diff) > 3) {
//                 changeBad = true;
//                 break;
//             }
//             p('dir:', diff/dir);
//             if(diff/dir < 0) {
//                 sameDir = false;
//                 break;
//             }
//         }
//         p(sameDir, changeBad);
//         if(sameDir && !changeBad) {
//             p('Safe!')
//             count++;
//         }
//         p();
//     });
//     return count;
// }
