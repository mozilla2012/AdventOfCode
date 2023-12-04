// https://adventofcode.com/2023/day/4

// Part 2 golfed
export function adventMain(p: string): any {
    let numCards = Array<number>(p.split('\n').length).fill(1);
    p.split('\n').forEach((e, l) => { for(let i = 1; i< ((e!.split(':')[1]!.split('|')[0])!.trim().split(/\s+/)).filter(n => ((e.split(':')[1]!.split('|')[1])!.trim().split(/\s+/)).includes(n)).length + 1; i++) { numCards[l + i] += numCards[l]! }});
    return numCards.reduce((sum, value) => sum + value);
}

// Part 2
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     let numCards = Array<number>(lines.length).fill(1);

//     for(let l = 0; l < lines.length; l++) {
//         const card: string = lines[l]!.split(':')[1]!;
//         const magicNumbers: number[] = (card.split('|')[0])!.split(' ').filter((t) => !!t).map((s) => parseInt(s));
//         const myNumbers: number[] = (card.split('|')[1])!.split(' ').filter((t) => !!t).map((s) => parseInt(s));
//         const numMatches = magicNumbers.filter(n => myNumbers.includes(n)).length;
//         for(let i = 1; i< numMatches + 1; i++) {
//             numCards[l + i] += numCards[l]!;
//         }
//     }
//     return numCards.reduce((sum, value) => sum + value);
// }

// Part 1
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     let sum = 0;
//     for(let line of lines) {
//         const card: string = line.split(':')[1]!;
//         const magicNumbers: number[] = (card.split('|')[0])!.split(' ').filter((t) => !!t).map((s) => parseInt(s));
//         const myNumbers: number[] = (card.split('|')[1])!.split(' ').filter((t) => !!t).map((s) => parseInt(s));
//         const matches = magicNumbers.filter(n => myNumbers.includes(n)).length;
//         sum += (matches > 0) ? Math.pow(2, magicNumbers.filter(n => myNumbers.includes(n)).length - 1) : 0;
//     }
//     return sum;
// }
