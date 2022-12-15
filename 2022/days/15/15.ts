// https://adventofcode.com/2022/day/15

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
    const bonusSpace = distX + distY;

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

    populateDistances(allSensorBeaconPairs);

    const targetRow = 2000000 + yOff;
        let voids = 0;
        for(let col = 0; col < maxX; col++) {
            for(let pair of allSensorBeaconPairs) {
                let sensor = pair[0];
                let distanceToPoint = Math.abs(sensor[0]-col) + Math.abs(sensor[1]-targetRow);
                if(distanceToPoint <= pair[2]) {
                    voids++;
                    break;
                }
            }
        }
    return voids-1;
}

function populateDistances(allSensorBeaconPairs: [[number, number], [number, number], number][]) {
    for(let pair of allSensorBeaconPairs) {
       const sensor = pair[0];
       const beacon = pair[1];
       pair[2] = Math.abs(sensor[0]-beacon[0]) + Math.abs(sensor[1]-beacon[1]);
    }
}
