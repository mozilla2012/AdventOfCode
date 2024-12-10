// https://adventofcode.com/2024/day/10

import { Grid } from "../../util/Grid";
import { p } from "../../util/utils";

export function adventMain(input: string): any {
    const g: Grid<number> = Grid.fromString<number>(input);
    p(g);
    const startingPoints: [number, number][] = [];
    g.data.forEach((row: number[], rowI)=>{
        row.forEach((item: number, colI)=>{
            if(item === 0){
                startingPoints.push([rowI, colI]);
            }
        });
    })
    p(startingPoints);
    const scores: number[] = startingPoints.map((head: [number, number])=>{
        // p('Starting with', head);
        let g2 = Grid.copyGrid(g);
        let gV = Grid.fromDimensions<number>(g.numRows, g.numCols, 0);
        let val = 0;
        let numPaths = 1;
        let nextPath: [number, number][] = [head];
        while(val < 9 && numPaths > 0) {
            let response = flood(g2, gV, val+1, nextPath);
            // p(gV);
            numPaths = response.numPaths;
            nextPath = response.nextPath;
            // p(val, numPaths, nextPath);
            val++;
        }
        return numPaths;
    });
    return scores.reduce((sum: number, item: number) => (sum+item), 0);
}

function flood(g: Grid<number>, gV: Grid<number>, targetVal: number, startingPoints: [number, number][]): {numPaths: number, nextPath: [number, number][]} {
    let numPaths = 0;
    let nextPath: [number, number][] = [];
    startingPoints.forEach((start: [number, number]) => {
        // If any neighbor is the target val, mark it as 0.
        try { // Up:
            const nextVal = g.getCell(start[0] - 1, start[1]);
            if(nextVal === targetVal) {
                numPaths++;
                gV.data[start[0]-1][start[1]] = gV.data[start[0]-1][start[1]]+1;
                nextPath.push([start[0] - 1, start[1]]);
            }
        } catch(e) {};
        try { // Right:
            const nextVal = g.getCell(start[0], start[1]+1);
            if(nextVal === targetVal) {
                numPaths++;
                gV.data[start[0]][start[1]+1] = gV.data[start[0]][start[1]+1]+1;
                nextPath.push([start[0], start[1]+1]);
            }
        } catch(e) {};
        try { // down:
            const nextVal = g.getCell(start[0] + 1, start[1]);
            if(nextVal === targetVal) {
                numPaths++;
                gV.data[start[0]+1][start[1]] = gV.data[start[0]+1][start[1]]+1;
                nextPath.push([start[0]+1, start[1]]);
            }
        } catch(e) {};
        try { // Left:
            const nextVal = g.getCell(start[0], start[1]-1);
            if(nextVal === targetVal) {
                numPaths++;
                gV.data[start[0]][start[1]-1] = gV.data[start[0]][start[1]-1]+1;
                nextPath.push([start[0], start[1]-1]);
            }
        } catch(e) {};
    });
    return {numPaths, nextPath};
}

// Part 1
// export function adventMain(input: string): any {
//     const g: Grid<number> = Grid.fromString<number>(input);
//     p(g);
//     const startingPoints: [number, number][] = [];
//     g.data.forEach((row: number[], rowI)=>{
//         row.forEach((item: number, colI)=>{
//             if(item === 0){
//                 startingPoints.push([rowI, colI]);
//             }
//         });
//     })
//     p(startingPoints);
//     const scores: number[] = startingPoints.map((head: [number, number])=>{
//         // p('Starting with', head);
//         let g2 = Grid.copyGrid(g);
//         let val = 0;
//         let numPaths = 1;
//         let nextPath: [number, number][] = [head];
//         while(val < 9 && numPaths > 0) {
//             let response = flood(g2, val+1, nextPath);
//             // p(g2);
//             numPaths = response.numPaths;
//             nextPath = response.nextPath;
//             // p(val, numPaths, nextPath);
//             val++;
//         }
//         return numPaths;
//     });
//     return scores.reduce((sum: number, item: number) => (sum+item), 0);
// }

// function flood(g: Grid<number>, targetVal: number, startingPoints: [number, number][]): {numPaths: number, nextPath: [number, number][]} {
//     let numPaths = 0;
//     let nextPath: [number, number][] = [];
//     startingPoints.forEach((start: [number, number]) => {
//         // If any neighbor is the target val, mark it as 0.
//         try { // Up:
//             const nextVal = g.getCell(start[0] - 1, start[1]);
//             if(nextVal === targetVal) {
//                 numPaths++;
//                 g.data[start[0]-1][start[1]] = 0;
//                 nextPath.push([start[0] - 1, start[1]]);
//             }
//         } catch(e) {};
//         try { // Right:
//             const nextVal = g.getCell(start[0], start[1]+1);
//             if(nextVal === targetVal) {
//                 numPaths++;
//                 g.data[start[0]][start[1]+1] = 0;
//                 nextPath.push([start[0], start[1]+1]);
//             }
//         } catch(e) {};
//         try { // down:
//             const nextVal = g.getCell(start[0] + 1, start[1]);
//             if(nextVal === targetVal) {
//                 numPaths++;
//                 g.data[start[0]+1][start[1]] = 0;
//                 nextPath.push([start[0]+1, start[1]]);
//             }
//         } catch(e) {};
//         try { // Left:
//             const nextVal = g.getCell(start[0], start[1]-1);
//             if(nextVal === targetVal) {
//                 numPaths++;
//                 g.data[start[0]][start[1]-1] = 0;
//                 nextPath.push([start[0], start[1]-1]);
//             }
//         } catch(e) {};
//     });
//     return {numPaths, nextPath};
// }