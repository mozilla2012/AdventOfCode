// https://adventofcode.com/2023/day/9

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let sum = 0;
    for(let line of lines) {
        const values: number[] = line.split(' ').map(s => parseInt(s));
        const sequences: number[][] = [values];
        while(sequences.every((sequence: number[]) => !sequence.every((v) => v == 0))) {
            const newSequence: number[] = [];
            const prevSequence: number[] = sequences[sequences.length - 1]!;
            for(let i = 1; i < prevSequence.length; i++) {
                newSequence.push(prevSequence[i]! - prevSequence[i-1]!);
            }
            sequences.push(newSequence);
        }
        for(let i = sequences.length - 1; i > 0; i--) { // Figure out what value to add
            const lowerSequence: number[] = sequences[i]!;
            const increase: number = lowerSequence[0]!;
            const upperSequence = sequences[i - 1]!;
            upperSequence.unshift(upperSequence[0]! - increase);            
        }
        sum += sequences[0]![0]!;
    }
    return sum;
}

// Part 1
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     let sum = 0;
//     for(let line of lines) {
//         const values: number[] = line.split(' ').map(s => parseInt(s));
//         const sequences: number[][] = [values];
//         while(sequences.every((sequence: number[]) => !sequence.every((v) => v == 0))) {
//             const newSequence: number[] = [];
//             const prevSequence: number[] = sequences[sequences.length - 1]!;
//             for(let i = 1; i < prevSequence.length; i++) {
//                 newSequence.push(prevSequence[i]! - prevSequence[i-1]!);
//             }
//             sequences.push(newSequence);
//         }

//         for(let i = sequences.length - 1; i > 0; i--) { // Figure out what value to add
//             const lowerSequence: number[] = sequences[i]!;
//             const increase: number = lowerSequence[lowerSequence.length - 1]!;
//             const upperSequence = sequences[i - 1]!;
//             upperSequence.push(increase + upperSequence[upperSequence.length - 1]!);            
//         }
//         sum += sequences[0]![sequences[0]!.length-1]!;
//     }
//     return sum;
// }
