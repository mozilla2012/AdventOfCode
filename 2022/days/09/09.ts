// https://adventofcode.com/2022/day/9

export function adventMain(input: string): any {
    let head: [number,number] = [0,0]; // ROW, COL
    let tail: [number,number] = [0,0];
    let visited: [number,number][] = [];
    visited.push(tail);

    const movements = input.split('\n');

    for(const move of movements) {
        let split = move.split(' ');
        const direction = split[0];
        const steps: number = parseInt(split[1]!);

        for (let i = 0; i < steps; i++) {
            // Update head
            if(direction === 'R') {
                head = [head[0], head[1] + 1];
            } else if(direction === 'L') {
                head = [head[0], head[1] - 1];
            } else if(direction === 'U') {
                head = [head[0] + 1, head[1]];
            } else if(direction === 'D') {
                head = [head[0] - 1, head[1]];
            }
    
            // Update tail
            if(!((Math.abs(head[0] - tail[0]) <= 1) && (Math.abs(head[1] - tail[1]) <= 1))) { // If tail is not adjacent, move it.
                if(head[0] !== tail[0]) {
                    tail = [tail[0] + (head[0]-tail[0])/Math.abs(head[0]-tail[0]), tail[1]]; // If not in the same row, move 1 row closer
                }
                if(head[1] !== tail[1]) {
                    tail = [tail[0], tail[1] + (head[1]-tail[1])/Math.abs(head[1]-tail[1])]; // If not in the same col, move 1 col closer
                }
                if(!visited.some((location)=>{return (location[0]===tail[0] && location[1]===tail[1])})) { // Add to set of visited.
                    visited.push(tail);
                }
            }
        }
    }

    return visited.length;
}
