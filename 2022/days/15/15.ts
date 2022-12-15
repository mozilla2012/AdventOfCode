// https://adventofcode.com/2022/day/15

import { count } from "console";

const UNKNOWN = 0;
const BEACON = 1;
const SENSOR = 2;
const VOID = 3;

let minX: number;
let minY: number;
let maxX: number;
let maxY: number;
let yOff: number;

export function adventMain(input: string): any {
    minX = 0;
    minY = 0;
    maxX = 0;
    maxY = 0;
    yOff = 0;
    const lines = input.split('\n');

    let allSensorBeaconPairs: [[number,number],[number,number],number][] = []
    for(let line of lines) {
        const values = line.match(/Sensor at x=([\-0-9]+), y=([\-0-9]+): closest beacon is at x=([\-0-9]+), y=([\-0-9]+)/);
        const senX: number = parseInt(values![1]!);
        const senY: number = parseInt(values![2]!);
        const becX: number = parseInt(values![3]!);
        const becY: number = parseInt(values![4]!);
        allSensorBeaconPairs.push([
            [senX, senY],
            [becX, becY],
            0
        ]);
    }

    const grid: number[][] = initGrid(allSensorBeaconPairs);
    
    populateDistances(allSensorBeaconPairs);
    
    
    // printGrid(grid);


    // console.log(allSensorBeaconPairs)

    findVoids(allSensorBeaconPairs, grid);
    // printGrid(grid);


    return countVoidsForRow(grid, 10 + yOff);
}

function initGrid(allSensorBeaconPairs: [[number,number],[number,number],number][]): number[][] {
    // console.log(allSensorBeaconPairs);
    let allX: number[] = [];
    let allY: number[] = [];
    allSensorBeaconPairs.forEach((pair)=>{
        allX.push(pair[0][0]);
        allX.push(pair[1][0]);
        allY.push(pair[0][1]);
        allY.push(pair[1][1]);
    });
    minX = allX.reduce((a, b) => Math.min(a, b));
    minY = allY.reduce((a, b) => Math.min(a, b));
    maxX = allX.reduce((a, b) => Math.max(a, b));
    maxY = allY.reduce((a, b) => Math.max(a, b));

    const distX = Math.abs(maxX - minX);
    const distY = Math.abs(maxY - minY);
    const bonusSpace = 0;//distX + distY;


    minX -= bonusSpace;
    minY -= bonusSpace;

    // Normalize all points.
    for(let pair of allSensorBeaconPairs) {
        for(let i = 0; i < 2; i++) {
            let thing: any = pair[i];
            thing[0] -= minX;
            thing[1] -= minY;
        }
    }
    yOff = minY * -1;
    maxX += (bonusSpace) - minX;
    maxY += (bonusSpace) - minY;

    const grid: number[][] = [];
    for(let y = 0; y <= maxY; y++) {
        let row: number[] = [];
        for(let x = 0; x <= maxX; x++) {
            row.push(UNKNOWN);
        }
        grid.push(row);
    }

    for(let pair of allSensorBeaconPairs) {
        let sen = pair[0];
        let bec = pair[1];
        // console.log(sen, bec);
        grid[sen[1]]![sen[0]] = SENSOR; // ROW, COL
        grid[bec[1]]![bec[0]] = BEACON;
    }
    return grid;    
}

function printGrid(grid: number[][]): void {
    for(let row of grid) {
        console.log(row.join('').replaceAll('0','.').replaceAll('1','B').replaceAll('2','S').replaceAll('3','#'));
    }
}

function populateDistances(allSensorBeaconPairs: [[number, number], [number, number], number][]) {
    for(let pair of allSensorBeaconPairs) {
       const sensor = pair[0];
       const beacon = pair[1];
       pair[2] = Math.abs(sensor[0]-beacon[0]) + Math.abs(sensor[1]-beacon[1]);
    }
}
function findVoids(allSensorBeaconPairs: [[number, number], [number, number], number][], grid: number[][]) {
    for(let pair of allSensorBeaconPairs) {
        const sensor = pair[0];
        // console.log(sensor);
        const distance = pair[2];
      
        for(let row = sensor[1] - distance; row <= (sensor[1] + distance); row++) {
            for(let col = sensor[0] - distance; col <= (sensor[0] + distance); col++) {
                if(row >= 0 && row <= maxY && col >= 0 && col <= maxX) {
                    let distanceToPoint = Math.abs(sensor[0]-col) + Math.abs(sensor[1]-row);
                    if(distanceToPoint <= distance && grid[row]![col] === UNKNOWN) {
                        grid[row]![col] = VOID;
                    }
                    
                }
            }
        }
        // printGrid(grid);
        // console.log('');
    }
}

function countVoidsForRow(grid: number[][], row: number): number {
    let sum = 0;
    let rowP: number[] = [];
    for(let col = 0; col < maxX; col++) {
        rowP.push(grid[row]![col]!);
        if (grid[row]![col] === VOID) {
            sum++;
        }
    }

    // console.log('Row:')
    // console.log(rowP.join('').replaceAll('0','.').replaceAll('1','B').replaceAll('2','S').replaceAll('3','#'));

    return sum;
}

