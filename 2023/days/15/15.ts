// https://adventofcode.com/2023/day/15

export function adventMain(input: string): any {
    const lines = input.split('\n');
    const line = lines[0]!;    

    const boxes: Map<number, string[]> = new Map();
    for(let str of line.split(',')) {
        const label: string = str.split(/[=-]/)[0]!;
        const op: string = str.replace(label,'')[0]!;
        let focal: number;
        if (op === '=') {
            focal = parseInt(str.replace(label,'')[1]!);
        }
        const box = hash(label);
        if(op === '-' ){
            if(boxes.has(box)) {
                let lenses: string[] = boxes.get(box)!;
                const existingIndex = lenses.findIndex((lens: string)=>{return lens.includes(label)});
                if (existingIndex > -1) {
                    lenses.splice(existingIndex, 1);
                    if(lenses.length === 0){
                        boxes.delete(box);
                        continue;
                    }
                  }
                boxes.set(box, lenses);
            }
            continue;
        } else if(op === '=') {
            if(boxes.has(box)) {
                let lenses: string[] = boxes.get(box)!;
                const existingIndex = lenses.findIndex((lens: string)=>{return lens.includes(label)});
                if (existingIndex > -1) { // lens found
                    lenses[existingIndex] = str;
                } else {
                    lenses.push(str);
                }
                boxes.set(box, lenses);
                continue;
            }
            boxes.set(box, [str]);
            continue;
        }
    }

    let sum = 0;
    return Array.from(boxes.keys()).reduce((acc2: number, box: number) => acc2 + boxes.get(box)!.reduce((acc, val, index) => acc + ( (box+1) * (index+1) * parseInt(val[val.length-1]!)), 0), 0);
}

function hash(str: string) {
    let val = 0;
    for (let i = 0; i < str.length; i++) {
        val += str.charCodeAt(i);
        val *= 17;
        val %= 256;
    }
    return val;
}

// Part 1
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     const line = lines[0]!;
//     let sum = 0;
//     for(let str of line.split(',')) {
//         sum += hash(str);
//     }
//     return sum;
// }

// function hash(str: string) {
//     let val = 0;
//     for (let i = 0; i < str.length; i++) {
//         val += str.charCodeAt(i);
//         val *= 17;
//         val %= 256;
//     }
//     return val;
// }