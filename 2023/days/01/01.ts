// https://adventofcode.com/2023/day/0

const FIRST_NON_DIGIT_ASCII = 58;

export function adventMain(input: string): any {
    const lines: string[] = input.split('\n');
    let sum = 0;
    for(let line of lines) {
        const len = line.length;
        let left;
        let right;
        for (let i = 0; i < len; i++) {
            const charValue: number = line.charCodeAt(i);
            if (charValue < FIRST_NON_DIGIT_ASCII) {
                left = line.charAt(i);
                break;
            }
        }
        for (let i = len-1; i >= 0; i--) {
            const charValue: number = line.charCodeAt(i);
            if (charValue < FIRST_NON_DIGIT_ASCII) {
                right = line.charAt(i);
                break;
            }
        }
        sum += Number(left) * 10 + Number(right);
    }
    return sum;
}
