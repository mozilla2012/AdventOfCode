// https://adventofcode.com/2022/day/6

export function adventMain(input: string): any {
    let sequence: string[] = input.substring(0, 14).split('');
    for(let i = 4; i <= input.length; i++) {
        if (sequence.length === (new Set(sequence)).size) {
            return i;
        }
        sequence.shift();
        sequence.push(input.charAt(i));
    }
    return -1;
}
 