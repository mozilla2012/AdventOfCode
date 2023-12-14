// https://adventofcode.com/2023/day/14

// 113346 is not it

export function adventMain(input: string): any {
    const lines = input.split('\n');
    const grid: string[][] = [];
    for(let line of lines) {
        grid.push(line.split(''));
    }
    const rotated = rotateCcw(grid);
    printGrid(grid);
    printGrid(rotated);

    let sum = 0;
    for(let line of rotated) {
        console.log('checking', line.join(''));
        let foundRocks = 1;
        let start = 0;
        for (let i = 0;  i < line.length; i++) {
            if(line[i] === 'O') {
                console.log('Found r at i', foundRocks, i);
                sum += (1 + line.length - (start) - foundRocks++);
                console.log('Sum is now', sum);
            }
            if(line[i] === '#') {
                start = i+1;
                foundRocks = 1;
            }
        }
    }

    return sum;
}

function rotateCcw(thing: any[][]): any[][] {
    return rotateCw(rotateCw(rotateCw(thing)));
}

function rotateCw(thing: any[][]): any[][] {
    return thing[0]!.map((_, colIndex) => thing.map(row => row[colIndex]).reverse())
}

function printGrid(grid: any[][]) {
    grid.forEach((s)=> console.log(s.join('')));
    console.log();
}