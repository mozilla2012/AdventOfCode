// https://adventofcode.com/2022/day/0

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let voxels: [number, number, number][] = [];
    for(let line of lines) {
        let v: string[] = line.split(',');
        voxels.push([parseInt(v[0]!), parseInt(v[1]!), parseInt(v[2]!)]);
    }
    return getSurfaceArea(voxels);
}

function getSurfaceArea(voxels: [number, number, number][]): number {
    let sa = 0;
    for(let voxel of voxels) {
        let vsa = 6;
        for (let neighbor of voxels) {
            if(areNeighbors(voxel, neighbor)) {
                vsa -= 1;
                if(vsa === 0) {
                    break;
                }
            }
        }
        sa += vsa;
    }
    return sa;
}

function areNeighbors(v1: [number, number, number], v2: [number, number, number]): boolean {
    return (
        (v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2] - 1) ||
        (v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2] + 1) ||
        (v1[0] === v2[0] && v1[1] === v2[1] - 1 && v1[2] === v2[2]) ||
        (v1[0] === v2[0] && v1[1] === v2[1] + 1 && v1[2] === v2[2]) ||
        (v1[0] === v2[0] - 1 && v1[1] === v2[1] && v1[2] === v2[2]) ||
        (v1[0] === v2[0] + 1 && v1[1] === v2[1] && v1[2] === v2[2])
    );
}

