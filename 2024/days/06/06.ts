// https://adventofcode.com/2024/day/6

import { Grid } from "../../util/Grid";
import { p } from "../../util/utils";
const UP = 2;
const RIGHT = 3;
const DOWN = 5;
const LEFT = 7;

export function adventMain(input: string): any {    
    let dir = UP;
    const g: Grid<string> = Grid.fromString<string>(input);
    const startingGrid: Grid<string> = Grid.fromString<string>(input);
    let pos: [number, number] = findStart(g); // row, col
    let startR = pos[0];
    let startC = pos[1];
    g.data[startR][startC] = String(dir);
    let loops = 0;
    while(true) {
        let r = pos[0];
        let c = pos[1];
        switch(dir) { 
            case UP: {
                try {
                    const nextCell: string = g.getCell(r-1,c);
                    if(nextCell !== '#') {
                        pos = [r-1,c];
                        if (nextCell === '.') {
                            const g2 = Grid.copyGrid(startingGrid);
                            g2.data[r-1][c] = '#';
                            if(detectLoop(g2, startR, startC)) {
                                // p('We have a loop!', r-1, c);
                                loops++;
                            }
                            g.data[r-1][c] = String(dir);
                        } else {
                            const val: number = parseInt(nextCell);
                            if (val) {
                                g.data[r-1][c] = String(val*dir);
                            } else {
                                p(`What is the next cell? ${nextCell}`);
                            }
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    p(g);
                    return loops;
                }
                break; 
            } 
            case RIGHT: { 
                try {
                    const nextCell: string = g.getCell(r,c+1);
                    if(nextCell !== '#') {
                        pos = [r,c+1];
                        if (nextCell === '.') {
                            const g2 = Grid.copyGrid(startingGrid);
                            g2.data[r][c+1] = '#';
                            if(detectLoop(g2, startR, startC)) {
                                // p('We have a loop!', r-1, c);
                                loops++;
                            }
                            g.data[r][c+1] = String(dir);
                        } else {
                            const val: number = parseInt(nextCell);
                            if (val) {
                                g.data[r][c+1] = String(val*dir);
                            } else {
                                p(`What is the next cell? ${nextCell}`);
                            }
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    p(g);
                    return loops;
                }
                break; 
            } 
            case DOWN: { 
                try {
                    const nextCell: string = g.getCell(r+1,c);
                    if(nextCell !== '#') {
                        pos = [r+1,c];
                        if (nextCell === '.') {
                            const g2 = Grid.copyGrid(startingGrid);
                            g2.data[r+1][c] = '#';
                            if(detectLoop(g2, startR, startC)) {
                                // p('We have a loop!', r-1, c);
                                loops++;
                            }
                            g.data[r+1][c] = String(dir);
                        } else {
                            const val: number = parseInt(nextCell);
                            if (val) {
                                g.data[r+1][c] = String(val*dir);
                            } else {
                                p(`What is the next cell? ${nextCell}`);
                            }
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    p(g);
                    return loops;
                }
                break; 
            } 
            case LEFT: { 
                try {
                    const nextCell: string = g.getCell(r,c-1);
                    if(nextCell !== '#') {
                        pos = [r,c-1];
                        if (nextCell === '.') {
                            const g2 = Grid.copyGrid(startingGrid);
                            g2.data[r][c-1] = '#';
                            if(detectLoop(g2, startR, startC)) {
                                // p('We have a loop!', r-1, c);
                                loops++;
                            }
                            g.data[r][c-1] = String(dir);
                        } else {
                            const val: number = parseInt(nextCell);
                            if (val) {
                                g.data[r][c-1] = String(val*dir);
                            } else {
                                p(`What is the next cell? ${nextCell}`);
                            }
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    p(g);
                    return loops;
                }
                break; 
            } 
            default: { 
                throw new Error('How?');
            } 
        } 
    }
    return loops;
}

function detectLoop(g: Grid<string>, startRow: number, startCol:number): boolean {
    let dir = UP;
    let pos: [number, number] = [startRow, startCol];
    let r = pos[0];
    let c = pos[1];
    g.data[r][c] = String(dir);

    while(true) {
        let r = pos[0];
        let c = pos[1];
        switch(dir) { 
            case UP: {
                try {
                    const nextCell: string = g.getCell(r-1,c);
                    if(nextCell !== '#') {
                        pos = [r-1,c];
                        if (nextCell === '.') {
                            g.data[r-1][c] = String(dir);
                        } else {
                            const val: number = parseInt(nextCell);
                            if (val) {
                                if(val % dir === 0) {
                                    // p(val, dir, val % dir);
                                    // g.data[r-1][c] = '%';
                                    // // p(g);
                                    return true;
                                }
                                g.data[r-1][c] = String(val*dir);
                            } else {
                                p(`What is the next cell? ${nextCell}`);
                            }
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    return false;
                }
                break; 
            } 
            case RIGHT: { 
                try {
                    const nextCell: string = g.getCell(r,c+1);
                    if(nextCell !== '#') {
                        pos = [r,c+1];
                        if (nextCell === '.') {
                            g.data[r][c+1] = String(dir);
                        } else {
                            const val: number = parseInt(nextCell);
                            if (val) {
                                if(val % dir === 0) {
                                    // p(val, dir, val % dir);
                                    // g.data[r][c+1] = '%';
                                    // p(g);
                                    return true;
                                }
                                g.data[r][c+1] = String(val*dir);
                            } else {
                                p(`What is the next cell? ${nextCell}`);
                            }
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    return false;
                }
                break; 
            } 
            case DOWN: { 
                try {
                    const nextCell: string = g.getCell(r+1,c);
                    if(nextCell !== '#') {
                        pos = [r+1,c];
                        if (nextCell === '.') {
                            g.data[r+1][c] = String(dir);
                        } else {
                            const val: number = parseInt(nextCell);
                            if (val) {
                                if(val % dir === 0) {
                                    // p(val, dir, val % dir)
                                    // g.data[r+1][c] = '%';
                                    // p(g);
                                    return true;
                                }
                                g.data[r+1][c] = String(val*dir);
                            } else {
                                p(`What is the next cell? ${nextCell}`);
                            }
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    return false;
                }
                break; 
            } 
            case LEFT: { 
                try {
                    const nextCell: string = g.getCell(r,c-1);
                    if(nextCell !== '#') {
                        pos = [r,c-1];
                        if (nextCell === '.') {
                            g.data[r][c-1] = String(dir);
                        } else {
                            const val: number = parseInt(nextCell);
                            if (val) {
                                if(val % dir === 0) {
                                    // p(val, dir, val % dir);
                                    // g.data[r][c-1] = '%';
                                    // p(g);
                                    return true;
                                }
                                g.data[r][c-1] = String(val*dir);
                            } else {
                                p(`What is the next cell? ${nextCell}`);
                            }
                        }
                    }
                    else {
                        dir = rotateDir(dir);
                    }
                } catch (e) {
                    return false;
                }
                break; 
            } 
            default: { 
                throw new Error('How?');
            } 
        } 
    }
    throw new Error('How did we get here?');
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
