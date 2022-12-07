// https://adventofcode.com/2022/day/5

export function adventMain(input: string): any {


    let rows: string[] = input.split('\n');
    let boxes: string[][] = [];

    // First read in the boxes and parse out everything that isn't text or whitespace.
    for (const row of rows) {
        boxes.push((row.match(/.{1,4}/g))!.map((box: string)=>{return box.charAt(1)}));
        const firstItemInRow = boxes[boxes.length-1]![0];
        if (firstItemInRow == '1') {
            boxes.pop();
            break;
        }
    }
    // Rotate the 2D array, effectively making stacks.
    let stacks = boxes[0]!.map((_, colIndex) => boxes.map(row => row[colIndex])); 

    // Strip everything that isn't the instructions.
    while(true) {
        if(rows[0]?.includes('move')) {
            break;
        }
        rows.shift();
    }

    // Filter out all whitespace out of stacks
    stacks = stacks.map((row)=>row.filter((character)=>(character != ' ')));

    // Follow each row's instructions:
    for(const instruction of rows) {
        const values = instruction.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);
        const quan: number = parseInt(values![1]!);
        const from: number = parseInt(values![2]!)-1;
        const dest: number = parseInt(values![3]!)-1;

        let stuffToMove: any[] = [];
        for (let i = 0; i < quan; i++) {
            if(stacks[from]!.length > 0) {
                // stacks[dest]!.unshift(stacks[from]!.shift()); // Part 1
                stuffToMove.unshift(stacks[from]!.shift()); // Part 2
            }
        }

        // For loop needed for Part 2 only
        for(const item of stuffToMove) {
            stacks[dest]!.unshift(item);
        }
    }
    let answer: string = '';
    stacks.forEach((stack)=> answer += stack.shift());
    return answer;
}
