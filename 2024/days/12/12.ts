// https://adventofcode.com/2024/day/12

import { Grid } from "../../util/Grid";

interface Region {
    area: number;
    perimeter: number;
}

const VISITING = '+';
const MARKED = '.';

export function adventMain(input: string): any {
    const grid: Grid<string> = Grid.fromString<string>(input);
    let cost = 0;
    grid.eachCell((value: string, row: number, col: number) => {
        const reg: Region = {area: 0, perimeter: 0};
        markRegion(value, reg, row, col, grid);
        grid.eachCell((_, r, c) => { // Then replace all '+' with MARKED;
            grid.data[r][c] = MARKED;
        }, (value) => value === VISITING);
        cost += reg.area * reg.perimeter;
    }, (value) => value !== MARKED);
    return cost;
}

function markRegion(crop: string, reg: Region, row: number, col: number, g: Grid<string>) {
    reg.area++;
    g.data[row][col] = VISITING;

    // Check neighbors:
    const above: string = g.getCell(row-1, col);
    if(above === crop) {
        markRegion(crop, reg, row-1, col, g);
    } else if(above !== VISITING) {
        reg.perimeter++;
    }
    const right: string = g.getCell(row, col+1);
    if(right === crop) {
        markRegion(crop, reg, row, col+1, g);
    } else if(right !== VISITING)  {
        reg.perimeter++;
    }
    const below: string = g.getCell(row+1, col);
    if(below === crop) {
        markRegion(crop, reg, row+1, col, g);
    } else if(below !== VISITING)  {
        reg.perimeter++;
    }
    const left: string = g.getCell(row, col-1);
    if(left === crop) {
        markRegion(crop, reg, row, col-1, g);
    } else if(left !== VISITING)  {
        reg.perimeter++;
    }
}
