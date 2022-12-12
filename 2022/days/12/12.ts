// https://adventofcode.com/2022/day/12

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let heights: number[][] = [];
    let distance: number[][] = [];
    let start: [number, number] = [-1, -1];
    let goal: [number, number] = [-1, -1];
    for(let row = 0; row < lines.length; row++) {
        let intRow: number[] = [];
        let distRow: number[] = [];
        for (let col = 0; col < lines[0]!.length; col++) {
            if(lines[row]!.charAt(col) === 'S') { // Start point
                start = [row, col];
                intRow.push(1);
            } else if(lines[row]!.charAt(col) === 'E') { // End goal point
                goal = [row, col];
                intRow.push(26);
            } else {
                intRow.push(lines[row]!.charCodeAt(col) - 'a'.charCodeAt(0) + 1);
            }
            distRow.push(Number.MAX_VALUE);
        }
        heights.push(intRow);
        distance.push(distRow);
    }

    let cellsToPaintNext: [number, number][] = [];

    // For Part 1
    // cellsToPaintNext.push(start);
    // distance[start[0]]![start[1]] = 0;
    // For Part 2:
    for(let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines[0]!.length; col++) {
            if(heights[row]![col]! === 1) {
                cellsToPaintNext.push([row, col]);
                distance[row]![col] = 0;
            }
        }
    }

    while(cellsToPaintNext.length > 0) {
        cellsToPaintNext = cellsToPaintNext.concat(paintNeighbors(cellsToPaintNext[0]!, heights, distance));
        cellsToPaintNext.shift();
    }
    return distance[goal[0]]![goal[1]]!;
}

function paintNeighbors(cur:[number, number], heights:number[][], dist:number[][]):[number, number][]{
	let cellsToPaintNext:[number, number][]=[];

	if((cur[0]-1)>=0&&(heights[cur[0]-1]![cur[1]]!<=((heights[cur[0]]![cur[1]]!)+1))&&(dist[cur[0]-1]![cur[1]]!>(dist[cur[0]]![cur[1]]!)+1)){
		dist[cur[0]-1]![cur[1]]! = (dist[cur[0]]![cur[1]]!)+1;
		cellsToPaintNext.push([cur[0]-1, cur[1]]);
	}
	if((cur[0]+1)<=(heights.length-1)&&(heights[cur[0]+1]![cur[1]]!<=((heights[cur[0]]![cur[1]]!)+1))&&(dist[cur[0]+1]![cur[1]]!>(dist[cur[0]]![cur[1]]!)+1)){
		dist[cur[0]+1]![cur[1]]! = (dist[cur[0]]![cur[1]]!)+1;
		cellsToPaintNext.push([cur[0]+1, cur[1]]);
	}
	if((cur[1]-1)>=0&&(heights[cur[0]]![cur[1]-1]!<=((heights[cur[0]]![cur[1]]!)+1))&&(dist[cur[0]]![cur[1]-1]!>(dist[cur[0]]![cur[1]]!)+1)){
		dist[cur[0]]![cur[1]-1]! = (dist[cur[0]]![cur[1]]!)+1;
		cellsToPaintNext.push([cur[0], cur[1]-1]);
	}
	if((cur[1]+1)<=(heights[0]!.length-1)&&(heights[cur[0]]![cur[1]+1]!<=((heights[cur[0]]![cur[1]]!)+1))&&(dist[cur[0]]![cur[1]+1]!>(dist[cur[0]]![cur[1]]!)+1)){
		dist[cur[0]]![cur[1]+1]! = (dist[cur[0]]![cur[1]]!)+1;
		cellsToPaintNext.push([cur[0], cur[1]+1]);
	}
	return cellsToPaintNext;
}
