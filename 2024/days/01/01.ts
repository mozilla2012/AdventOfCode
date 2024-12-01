// https://adventofcode.com/2024/day/1

// Part 2, golfed
export function adventMain(input: string): any {
    const [l, r] = [input.split('\n').map((l) => Number(l.split('  ')[0]!)), input.split('\n').map((l) => Number(l.split('  ')[1]!))];
    return l.reduce((sum: number, val: number) => sum + r.filter((rightVal: number) => (rightVal === val)).length * val, 0);
}

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
