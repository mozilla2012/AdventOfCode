// https://adventofcode.com/2023/day/5

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let seeds: number[] = lines[0]!.split(':')[1]!.trim().split(' ').map((s) => parseInt(s));
    let maps: number[][][] = [];

    for(let i = 2; i < lines.length - 1; i++) {
        let line = lines[++i]!;
        let newMap: number[][] = [];
        while(i < lines.length && line.length > 0) {
            const numberMap: number[] = line.split(' ').map((s) => parseInt(s));
            newMap.push(numberMap);
            line = lines[++i]!;
        }
        maps.push(newMap);
    }

    const startingPosition = -1;
    let smallestLocation = startingPosition;
    for(let i = 0; i < seeds.length; i++) {
        let valToTrace = seeds[i]!;
        for(let map of maps) {
            valToTrace = findNewValInMap(map, valToTrace);
        }
        if (valToTrace < smallestLocation || smallestLocation == startingPosition) {
            smallestLocation = valToTrace;
        }
    }
    return smallestLocation;
}

function findNewValInMap(mapPack: number[][], val: number): number {
    for(let map of mapPack) {
        if(val >= map[1]! && val < map[1]! + map[2]!) {
            const calcVal = (map[0]! + (val - map[1]!));
            return calcVal;
        }
    }
    return val;
}

