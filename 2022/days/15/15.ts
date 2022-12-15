// https://adventofcode.com/2022/day/15

let xOff: number;
let yOff: number;
// NOTE: THIS SOLUTION DOESN'T WORK FOR PART 1 ANYMORE; CHECK OUT THE OLDER COMMIT
export function adventMain(input: string): any {
    const lines = input.split('\n');
    let allSensorBeaconPairs: [[number,number],[number,number],number][] = []
    for(let line of lines) {
        const values = line.match(/Sensor at x=([\-0-9]+), y=([\-0-9]+): closest beacon is at x=([\-0-9]+), y=([\-0-9]+)/);
        allSensorBeaconPairs.push([[parseInt(values![1]!), parseInt(values![2]!)], [parseInt(values![3]!), parseInt(values![4]!)], 0]);
    }
    const minX = (allSensorBeaconPairs.map(pair => pair[0][0]).concat(allSensorBeaconPairs.map(pair => pair[1][0]))).reduce((a, b) => Math.min(a, b));
    const minY = (allSensorBeaconPairs.map(pair => pair[0][1]).concat(allSensorBeaconPairs.map(pair => pair[1][1]))).reduce((a, b) => Math.min(a, b));
    yOff = minY * -1;
    xOff = minX * -1;

    for(let pair of allSensorBeaconPairs) { // Normalize all points.
        for(let i = 0; i < 2; i++) {
            let thing: any = pair[i];
            thing[0] -= minX;
            thing[1] -= minY;
        }
    }

    allSensorBeaconPairs.forEach(pair => pair[2] = Math.abs(pair[0][0]-pair[1][0]) + Math.abs(pair[0][1]-pair[1][1])); // Calculate the manhattan distances

    const searchRange = 4000000; // Change this to 20 to pass the test (expected result 56000011)
    const maxSearchX = searchRange + xOff;
    const maxSearchY = searchRange + yOff;

    for(let pair of allSensorBeaconPairs) {
        const sensor = pair[0];
        const distance = pair[2];
        // Search each side of the diamond's edge.
        let col = sensor[0] - (distance+1);
        for(let row = sensor[1]; row <= (sensor[1] + distance +1); row++) { // LEFT TO BOTTOM
            if(row >= yOff && row <= maxSearchY && col >= xOff && col <= maxSearchX) {
                let val = searchPoint(row, col,  allSensorBeaconPairs);
                if(val !== 0 ){
                    return val;
                }
            }
            col++;
        }
        col = sensor[0] - (distance+1);
        for(let row = sensor[1]; row <= sensor[1]-(distance+1); row--) { // LEFT TO TOP
            if(row >= yOff && row <= maxSearchY && col >= xOff && col <= maxSearchX) {
                let val = searchPoint(row, col,  allSensorBeaconPairs);
                if(val !== 0 ){
                    return val;
                }
            }
            col++;
        }
        col = sensor[0] + (distance+1);
        for(let row = sensor[1]; row <= (sensor[1] + distance +1); row++) { // RIGHT TO BOTTOM
            if(row >= yOff && row <= maxSearchY && col >= xOff && col <= maxSearchX) {
                let val = searchPoint(row, col,  allSensorBeaconPairs);
                if(val !== 0 ){
                    return val;
                }
            }
            col--;
        }
        col = sensor[0] + (distance+1);
        for(let row = sensor[1]; row <= sensor[1]-(distance+1); row--) { // RIGHT TO TOP
            if(row >= yOff && row <= maxSearchY && col >= xOff && col <= maxSearchX) {
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
        if(Math.abs(sensor[0]-col) + Math.abs(sensor[1]-row) <= pair[2]) {
            return 0;
        } 
    }
    console.log(`NOT A VOID: [${row-yOff} ${col-xOff}]`);
    return (row-yOff) + ((col-xOff)*4000000);
}
