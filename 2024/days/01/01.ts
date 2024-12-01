// https://adventofcode.com/2024/day/1

import { Grid } from "../../util/Grid";

// Part 2, with Grid class:
export function adventMain(input: string): any {
    const g: Grid<number> = Grid.fromString(input, '   ');
    g.transpose();
    return g.data[0].reduce((sum: number, val: number) => sum + g.data[1].filter((val2)=>val===val2).length * val, 0);
}

// // Part 1, with Grid class:
// export function adventMain(input: string): any {
//     const g: Grid<number> = Grid.fromString(input, '   ');
//     // Because I don't have .eachCol or .eachRow made yet I have to transpose twice.
//     g.transpose(); 
//     g.data.forEach((row: number[])=> {
//         row = row.sort();
//     });
//     g.transpose();
//     return g.data.reduce((sum: number, row: number[]) => {
//         return sum + Math.abs(row[0]-row[1]);
//     }, 0);
// }

// // Part 2, golfed
// export function adventMain(input: string): any {
//     const [l, r] = [input.split('\n').map((l) => Number(l.split('  ')[0]!)), input.split('\n').map((l) => Number(l.split('  ')[1]!))];
//     return l.reduce((sum: number, val: number) => sum + r.filter((rightVal: number) => (rightVal === val)).length * val, 0);
// }

// Part 2
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     const left: number[] = [];
//     const right: number[] = [];
//     lines.forEach((line: string) => {
//         const numbers: number[] = line.split('  ').map(s => Number(s));
//         left.push(numbers[0]!);
//         right.push(numbers[1]!);
//     });
//     left.sort();
//     right.sort();
//     console.log(left);
//     console.log(right);

//     const countMap: Map<number, number> = new Map();
//     let sum = 0;
//     left.forEach((val: number)=>{
//         const cached: number | undefined = countMap.get(val);
//         if (cached) {
//             sum += cached;
//         } else {
//             const count = right.filter((rightVal: number) => (rightVal === val)).length;
//             countMap.set(val, count * val);
//             sum += count * val;
//         }
//         console
//     });
//     console.log(countMap);
//     return sum;
// }

// Part 1
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     const left: number[] = [];
//     const right: number[] = [];
//     lines.forEach((line: string) => {
//         const numbers: number[] = line.split('  ').map(s => Number(s));
//         left.push(numbers[0]!);
//         right.push(numbers[1]!);
//     });
//     left.sort();
//     right.sort();
//     console.log(left);
//     console.log(right);

//     let sum = 0;
//     for (let i=0; i < left.length; i++) {
//         const dist = Math.abs(left[i]!-right[i]!);
//         console.log(dist);
//         sum += dist;
//     }
//     return sum;
// }
