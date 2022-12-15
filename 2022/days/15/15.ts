// https://adventofcode.com/2022/day/15

let minX: number;
let minY: number;
let maxX: number;
let maxY: number;
let xOff: number;
let yOff: number;

export function adventMain(input: string): any {
    minX = 0;
    minY = 0;
    maxX = 0;
    maxY = 0;
    xOff = 0;
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

    // Normalize all points.
    for(let pair of allSensorBeaconPairs) {
        for(let i = 0; i < 2; i++) {
            let thing: any = pair[i];
            thing[0] -= minX;
            thing[1] -= minY;
        }
    }

    yOff = minY * -1;
    xOff = minX * -1;
    maxX -= minX;
    maxY -= minY;

    populateDistances(allSensorBeaconPairs);

    const searchRange = 4000000;
    const maxSearchX = searchRange + xOff;
    const maxSearchY = searchRange + yOff;

    for(let pair of allSensorBeaconPairs) {
        const sensor = pair[0];
        const distance = pair[2];
        let col = sensor[0] - (distance+1);
        // Search each side of the diamond's edge.
        for(let row = sensor[1]; row <= (sensor[1] + distance +1); row++) { // LEFT TO BOTTOM
            if(row >= 0+yOff && row <= maxSearchY && col >= 0+xOff && col <= maxSearchX) {
                let val = searchPoint(row, col,  allSensorBeaconPairs);
                if(val !== 0 ){
                    return val;
                }
            }
            col++;
        }
        col = sensor[0] - (distance+1);
        for(let row = sensor[1]; row <= sensor[1]-(distance+1); row--) { // LEFT TO TOP
            if(row >= 0+yOff && row <= maxSearchY && col >= 0+xOff && col <= maxSearchX) {
                let val = searchPoint(row, col,  allSensorBeaconPairs);
                if(val !== 0 ){
                    return val;
                }
            }
            col++;
        }
        col = sensor[0] + (distance+1);
        for(let row = sensor[1]; row <= (sensor[1] + distance +1); row++) { // RIGHT TO BOTTOM
            if(row >= 0+yOff && row <= maxSearchY && col >= 0+xOff && col <= maxSearchX) {
                let val = searchPoint(row, col,  allSensorBeaconPairs);
                if(val !== 0 ){
                    return val;
                }
            }
            col--;
        }
        col = sensor[0] + (distance+1);
        for(let row = sensor[1]; row <= sensor[1]-(distance+1); row--) { // RIGHT TO TOP
            if(row >= 0+yOff && row <= maxSearchY && col >= 0+xOff && col <= maxSearchX) {
                let val = searchPoint(row, col,  allSensorBeaconPairs);
                if(val !== 0 ){
                    return val;
                }
            }
            col--;
        }
    }
}

function searchPoint(row: number, col: number, allSensorBeaconPairs: [[number, number], [number, number], number][]) {
    for(let pair of allSensorBeaconPairs) {
        let sensor = pair[0];
        let distanceToPoint = Math.abs(sensor[0]-col) + Math.abs(sensor[1]-row);
        if(distanceToPoint <= pair[2]) {
            return 0;
        } 
    }
    console.log(`NOT A VOID: [${row-yOff} ${col-xOff}]`);
    return (row-yOff) + ((col-xOff)*4000000);
}

function populateDistances(allSensorBeaconPairs: [[number, number], [number, number], number][]) {
    for(let pair of allSensorBeaconPairs) {
       const sensor = pair[0];
       const beacon = pair[1];
       pair[2] = Math.abs(sensor[0]-beacon[0]) + Math.abs(sensor[1]-beacon[1]);
    }
}
