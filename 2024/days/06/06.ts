// https://adventofcode.com/2024/day/6

import { Grid } from "../../util/Grid";
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

export function adventMain(input: string): any {    
    let dir = UP;
    const g: Grid<string> = Grid.fromString<string>(input);
    let pos: [number, number] = findStart(g); // row, col
    let r = pos[0];
    let c = pos[1];
    g.data[r][c] = 'X';
    let visits = 1;
    while(true) {
        let r = pos[0];
        let c = pos[1];
        switch(dir) { 
            case UP: {
                try {
                    const nextCell: string = g.getCell(r-1,c);
                    if(nextCell !== '#') {
                        pos = [r-1,c];
                        if(nextCell === '.') {
                            g.data[r-1][c] = 'X';
                            visits++;
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    return visits;
                }
                break; 
            } 
            case RIGHT: { 
                try {
                    const nextCell: string = g.getCell(r,c+1);
                    if(nextCell !== '#') {
                        pos = [r,c+1];
                        if(nextCell === '.') {
                            g.data[r][c+1] = 'X';
                            visits++;
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    return visits;
                }
                break; 
            } 
            case DOWN: { 
                try {
                    const nextCell: string = g.getCell(r+1,c);
                    if(nextCell !== '#') {
                        pos = [r+1,c];
                        if(nextCell === '.') {
                            g.data[r+1][c] = 'X';
                            visits++;
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    return visits;
                }
                break; 
            } 
            case LEFT: { 
                try {
                    const nextCell: string = g.getCell(r,c-1);
                    if(nextCell !== '#') {
                        pos = [r,c-1];
                        if(nextCell === '.') {
                            g.data[r][c-1] = 'X';
                            visits++;
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    return visits;
                }
                break; 
            } 
            default: { 
                throw new Error('How?');
            } 
        } 
    }
    return visits;
}

function findStart(g: Grid<string>): [number, number] {
    let pos: [number, number] = undefined;
    g.data.find((row: string[], rowI) => {
        return row.find((item: string, colI) => {
            if(item ==='^') {
                pos = [rowI, colI];
                return true;
            }
            return false;
        });
    });
    return pos;
}

function rotateDir(dir: number): number {
    switch(dir) { 
        case UP: {
           return RIGHT;
        } 
        case RIGHT: { 
            return DOWN;
        } 
        case DOWN: { 
            return LEFT;
        } 
        case LEFT: { 
            return UP;
        } 
        default: { 
            throw new Error('How?');
        } 
    }
}
