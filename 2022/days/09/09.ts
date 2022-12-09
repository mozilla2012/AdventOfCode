// https://adventofcode.com/2022/day/9

export function adventMain(input: string): any {
    let knots: [number,number][] = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    let tail = knots.length-1;
    let visited: [number,number][] = [];
    visited.push(knots[tail]!);

    const movements = input.split('\n');

    for(const move of movements) {
        let split = move.split(' ');
        const direction = split[0];
        const steps: number = parseInt(split[1]!);

        for (let i = 0; i < steps; i++) {
            // Update head
            if(direction === 'R') {
                knots[0]! = [knots[0]![0], knots[0]![1] + 1];
            } else if(direction === 'L') {
                knots[0]! = [knots[0]![0], knots[0]![1] - 1];
            } else if(direction === 'U') {
                knots[0]! = [knots[0]![0] + 1, knots[0]![1]];
            } else if(direction === 'D') {
                knots[0]! = [knots[0]![0] - 1, knots[0]![1]];
            }
    
            // Update following knots
            for(let k = 1; k < 10; k++) {
                if(!((Math.abs(knots[k-1]![0] - knots[k]![0]) <= 1) && (Math.abs(knots[k-1]![1] - knots[k]![1]) <= 1))) { // If knots[k]! is not adjacent, move it.
                    if(knots[k-1]![0] !== knots[k]![0]) {
                        knots[k]! = [knots[k]![0] + (knots[k-1]![0]-knots[k]![0])/Math.abs(knots[k-1]![0]-knots[k]![0]), knots[k]![1]]; // If not in the same row, move 1 row closer
                    }
                    if(knots[k-1]![1] !== knots[k]![1]) {
                        knots[k]! = [knots[k]![0], knots[k]![1] + (knots[k-1]![1]-knots[k]![1])/Math.abs(knots[k-1]![1]-knots[k]![1])]; // If not in the same col, move 1 col closer
                    }
                    if(k == tail && !visited.some((location)=>{return (location[0]===knots[k]![0] && location[1]===knots[k]![1])})) { // Add to set of visited.
                        visited.push(knots[k]!);
                    }
                }
            }
        }
    }

    return visited.length;
}
