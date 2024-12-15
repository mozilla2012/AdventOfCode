// https://adventofcode.com/2024/day/14

import { Grid } from "../../util/Grid";
import { p } from "../../util/utils";

interface bot {
    row: number;
    col: number;
    rowv: number;
    colv: number;
};
const numRows = 103; // 7
const numCols = 101; // 11

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let bots: bot[] = [];
    lines.forEach((line: string) => {
        const parts = line.replace('p=','').replace('v=','').split(' ');
        bots.push(
            {
                row: parseInt(parts[0].split(',')[1]),
                col: parseInt(parts[0].split(',')[0]),
                rowv: parseInt(parts[1].split(',')[1]),
                colv: parseInt(parts[1].split(',')[0])
            }
        );
    });
    p(bots);
    for(let i = 0; i < 100; i++) {
        bots.forEach((b: bot) => {
            // p('before:', b);
            b.row = (b.row + b.rowv + numRows) % numRows;
            b.col = (b.col + b.colv + numCols) % numCols;
            // p('after:', b,'\n');
        });
    }
    let q1: number = 0;
    let q2: number = 0;
    let q3: number = 0;
    let q4: number = 0;

    bots.forEach((b: bot)=> {
        
       if(b.col < Math.floor(numCols / 2) && b.row < Math.floor(numRows / 2)) {
            q1++;
            p(b, 'q1');
        } else if (b.col > Math.floor(numCols / 2) && b.row < Math.floor(numRows / 2)) {
            q2++;
            p(b, 'q2');
        } else if (b.col > Math.floor(numCols / 2) && b.row > Math.floor(numRows / 2)) {
            q3++;
            p(b, 'q3');
        } else if (b.col < Math.floor(numCols / 2) && b.row > Math.floor(numRows / 2)) {
            q4++;
            p(b, 'q4');
        } else {
            p('Skipping bot:', b);
        } 
    });
    p(q1, q2, q3, q4);
    return q1*q2*q3*q4;
}
