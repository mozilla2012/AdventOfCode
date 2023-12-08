// https://adventofcode.com/2023/day/8

export function adventMain(input: string): any {
    input = input.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '');
    
    const lines = input.split('\n');
    const directions = lines[0]!;
    lines.shift();
    lines.shift();

    const map = new Map<string, Array<string>>();

    // set up map
    for(let line of lines) {
        map.set(line.split('=')[0]!, [line.split('=')[1]!.split(',')[0]!, line.split('=')[1]!.split(',')[1]!])
    }

    // iterate through map.
    let count = 0;
    let currentNode = 'AAA';
    while (currentNode !== 'ZZZ') {
        for(let direction of directions.split('')) {
            let currentDirections = map.get(currentNode)!;
            currentNode = direction === 'L' ? currentDirections[0]! : currentDirections[1]!;
            count++;
        }
        
    }
    return count;
}
