// https://adventofcode.com/2024/day/3

import { Grid } from "../../util/Grid";
import { p } from "../../util/utils";

// Part 2
export function adventMain(input: string): any {
    const lines = input.split('\n');
    let sum = 0;
    let enabled = true;
    lines.forEach((line: string) => {

        const regexp = /((mul\((\d{1}|\d{2}|\d{3}),(\d{1}|\d{2}|\d{3})\))|(don't\(\))|(do\(\)))/g;
        const matches = line.matchAll(regexp);
        p(matches);


        for (const match of matches) {
            p(match)
            if(match[0] === 'don\'t()') {
                enabled = false;
            } else if (match[0] === 'do()') {
                enabled = true;
            } else if (enabled) {
                sum += Number(match[3])* Number(match[4]);
            }
        }

    });
    return sum;
}

// Part 1
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     let sum = 0;
//         lines.forEach((line: string) => {

//         const regexp = /mul\((\d{1}|\d{2}|\d{3}),(\d{1}|\d{2}|\d{3})\)/g;
//         const matches = line.matchAll(regexp);
//         p(matches);


//         for (const match of matches) {
//             sum += Number(match[1])* Number(match[2]);
//         }

//     });
//     return sum;
// }
