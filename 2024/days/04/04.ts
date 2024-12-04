// https://adventofcode.com/2024/day/4

import { Grid } from "../../util/Grid";
import { p } from "../../util/utils";

export function adventMain(input: string): any {
    const g: Grid<string> = Grid.fromString<string>(input);
    let sum = 0;
    g.data.forEach((row: string[], r: number) => {
        row.forEach((letter: string, c: number) => {
            if(letter === 'X') {
                sum += findXmas(g, r, c);
            }
        })
    })
    return sum;
}
function findXmas(g: Grid<string>, r: number, c: number): number {       
    // console.log('starting at', r, c);
    let sum = 0;
    try { 
        if(g.getCell(r-1,c) === 'M' && g.getCell(r-2,c) === 'A' && g.getCell(r-3,c) === 'S') {
            sum += 1;
        }
    } catch (e) {}
    try {
        if (g.getCell(r-1,c+1) === 'M' && g.getCell(r-2,c+2) === 'A' && g.getCell(r-3,c+3) === 'S') {
            sum += 1;
        }
    } catch (e) {}
    try { 
        if(g.getCell(r,c+1) === 'M' && g.getCell(r,c+2) === 'A' && g.getCell(r,c+3) === 'S') {
            sum += 1;
        }
    } catch (e) {}
    try { 
        if (g.getCell(r+1,c+1) === 'M' && g.getCell(r+2,c+2) === 'A' && g.getCell(r+3,c+3) === 'S') {
            sum += 1;
        }
    } catch (e) {}
    try { 
        if (g.getCell(r+1,c) === 'M' && g.getCell(r+2,c) === 'A' && g.getCell(r+3,c) === 'S') {
            sum += 1;
        }
    } catch (e) {}
    try { 
        if (g.getCell(r+1,c-1) === 'M' && g.getCell(r+2,c-2) === 'A' && g.getCell(r+3,c-3) === 'S') {
            sum += 1;
        }
    } catch (e) {}
    try { 
        if (g.getCell(r,c-1) === 'M' && g.getCell(r,c-2) === 'A' && g.getCell(r,c-3) === 'S') {
            sum += 1;
        }
    } catch (e) {}
    try { 
        if (g.getCell(r-1,c-1) === 'M' && g.getCell(r-2,c-2) === 'A' && g.getCell(r-3,c-3) === 'S') {
            sum += 1;
        }
    } catch (e) {}
    return sum;
}
