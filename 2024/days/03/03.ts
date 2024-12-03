// https://adventofcode.com/2024/day/3

import { Grid } from "../../util/Grid";
import { p } from "../../util/utils";

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let sum = 0;
        lines.forEach((line: string) => {

        const regexp = /mul\((\d{1}|\d{2}|\d{3}),(\d{1}|\d{2}|\d{3})\)/g;
        const matches = line.matchAll(regexp);
        p(matches);


        for (const match of matches) {
            sum += Number(match[1])* Number(match[2]);
        }

    });
    return sum;
}
