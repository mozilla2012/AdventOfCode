// https://adventofcode.com/2023/day/11

const GAL = '#';

export function adventMain(input: string): any {
    const lines = input.split('\n');
    
    // Read in input.
    const space: string[][] = [];
    for(let line of lines) {
        space.push(line.split(''));
    }

    // printGrid(space);
    // Expand space. Rows first.
    for(let r = 0; r < space.length; r++) {
        const line: string[] = space[r]!;
        if (!line.includes(GAL)) {
            space.splice(r, 0, [...line]);
            r++;
        }
    }

    // Then expand columns.
    for(let c = 0; c < space[0]!.length; c++) {
        let includesGal = false;
        for(let r = 0; r < space.length; r++) {
            if(space[r]![c] === GAL) {
                includesGal = true;
                break;
            }
        }
        if(!includesGal) {
            // Add column
            for (let row of space){
                row.splice(c, 0, '.');
            }
            c++;
        }
    }

    // Make a list of all stars.
    const stars: [number, number][] = [];

    for(let r = 0; r < space.length; r++) {
        for(let c = 0; c < space[0]!.length; c++) {
            if(space[r]![c]! === GAL){
                stars.push([r, c]);
            }
        }
    }

    let sum = 0;
    // Do some math to calculate distance between stars.
    for(let startStar of stars) {
        for(let targStar of stars) {
            sum += Math.abs(startStar[0]-targStar[0]) + Math.abs(startStar[1]-targStar[1])
        }
    }
    return sum/2;
}
