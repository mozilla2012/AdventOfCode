// https://adventofcode.com/2023/day/15

export function adventMain(input: string): any {
    const boxes: Map<number, string[]> = new Map();
    for(let str of input.split(',')) {
        const label: string = str.split(/[=-]/)[0]!;
        const op: string = str.replace(label,'')[0]!;
        const box = label.split('').reduce((a, c) => ((a+c.charCodeAt(0)) * 17) % 256, 0);
        if(op === '-' && boxes.has(box)){
            boxes.set(box, boxes.get(box)!.filter(lens => !lens.includes(label)));
        } else if(boxes.has(box)) {
            const existingIndex = boxes.get(box)!.findIndex(lens => lens.includes(label));
            if (existingIndex > -1) { // lens found
                boxes.get(box)![existingIndex] = str;
            } else { // If not found, append.
                boxes.get(box)!.push(str);
            }
        } else { // Make a new box if we're adding a new string.
            boxes.set(box, [str]);
        }
    }
    return Array.from(boxes.keys()).reduce((a1, b) => a1 + boxes.get(b)!.reduce((a2, v, i) => a2 + ( (b+1) * (i+1) * parseInt(v[v.length-1]!)), 0), 0);
}

// Part 1
// export const adventMain = (i: string) => i.split(',').reduce((a1, s) => a1 + s.split('').reduce((a2, c) => ((a2 + c.charCodeAt(0)) * 17) % 256, 0), 0);