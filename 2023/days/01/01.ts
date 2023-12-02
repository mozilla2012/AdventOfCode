// https://adventofcode.com/2023/day/1

const FIRST_NON_DIGIT_ASCII = 58;

const numbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'zero',
]

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
            } else {
                for(let n = 0; n < numbers.length; n++) {
                    if(line.slice(i).startsWith(numbers[n]!)) {
                        left = n + 1;
                        break;
                    }
                }
            }
            if (left != undefined) { break; }
        }
        for (let i = len-1; i >= 0; i--) {
            const charValue: number = line.charCodeAt(i);
            if (charValue < FIRST_NON_DIGIT_ASCII) {
                right = line.charAt(i);
                break;
            } else {
                for(let n = 0; n < numbers.length; n++) {
                    if(line.slice(i).startsWith(numbers[n]!)) {
                        right = n + 1;
                        break;
                    }
                }
            }
            if (right != undefined) { break; }
        }
        sum += Number(left) * 10 + Number(right);
    }
    return sum;
}

// Part 1
// export function adventMain(input: string): any {
//     const lines: string[] = input.split('\n');
//     let sum = 0;
//     for(let line of lines) {
//         const len = line.length;
//         let left;
//         let right;
//         for (let i = 0; i < len; i++) {
//             const charValue: number = line.charCodeAt(i);
//             if (charValue < FIRST_NON_DIGIT_ASCII) {
//                 left = line.charAt(i);
//                 break;
//             }
//         }
//         for (let i = len-1; i >= 0; i--) {
//             const charValue: number = line.charCodeAt(i);
//             if (charValue < FIRST_NON_DIGIT_ASCII) {
//                 right = line.charAt(i);
//                 break;
//             }
//         }
//         sum += Number(left) * 10 + Number(right);
//     }
//     return sum;
// }