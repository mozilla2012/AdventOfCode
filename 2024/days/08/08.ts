// https://adventofcode.com/2024/day/8

import { Grid } from "../../util/Grid";
import { HashSet } from "../../util/HashSet";

export function adventMain(input: string): any {
    const g: Grid<string> = Grid.fromString<string>(input);
    const antinodes: HashSet<[number, number]> = new HashSet();
    g.eachCell((v1, r1, c1) => {
        g.eachCell((v2, r2, c2) => { // Iterate over each cell that matches the given antenna, but skip itself.
            const rDiff = r2 - r1;
            const cDiff = c2 - c1;
            const node1: [number, number] = [r1 - rDiff, c1 - cDiff];
            const node2: [number, number] = [r2 + rDiff, c2 + cDiff];
            if(!g.isOutOfBounds(node1[0], node1[1])) {
                antinodes.add(node1);
            }
            if(!g.isOutOfBounds(node2[0], node2[1])) {
                antinodes.add(node2);
            }
        }, (v, r, c) => (v === v1 && r !== r1 && c !== c1));
    }, (v) => v !== '.');
    return antinodes.size;
}
