// https://adventofcode.com/2023/day/12

const KNOWN = '#';
const EMPTY = '.';
const VAR = '?';
export function adventMain(input: string): any {
    const lines = input.split('\n');
    let sum = 0;
    for(let line of lines) {
        const puzzle: string = line.split(' ')[0]!;
        const puzzle5: string[] = `${puzzle}?${puzzle}?${puzzle}?${puzzle}?${puzzle}`.split('');
        const valuesStr: string = line.split(' ')[1]!;
        const valuesStr5: string =  `${valuesStr},${valuesStr},${valuesStr},${valuesStr},${valuesStr}`;
        // console.log(puzzle5.join(''), valuesStr5);
        sum += countPossibilities(puzzle5, valuesStr5); // Recursion time!
        console.log();
    }
    return sum;
}

function getStringForGroupings(values: string): string[] {
    return values.split('').map((val: string)=>(val === ',') ? EMPTY : Array<String>(parseInt(val)).fill(KNOWN).join(''));
}

function countPossibilities(puzzle: string[], correctValue: string): number {
    console.log(puzzle.join(''));
    const firstGuess: string[] = getStringForGroupings(correctValue);
    const puzzleLength = puzzle.join('').length;
    const spacesToAdd = (puzzle.join('').length) - (firstGuess.join('').length); // Idk why this must be calculated this way, but it must be.
    if (spacesToAdd === 0) {
        return 1;
    }
    let newGuess = [...firstGuess];
    let newGuessGroups = newGuess.join('').split(EMPTY);
    let groupCount = newGuessGroups.length;
    console.log(groupCount);
    let sum = 0;
    // for(let i = 0; i < groupCount; i++) {
    sum += countAndPadTo(1, newGuess, puzzle, puzzleLength);
    // }


    // Pad guess with spaces at the end
    // for(let i = 0; i < spacesToAdd; i++) {
    //     newGuess.push(EMPTY)
    // }
    // console.log(newGuess.join(''));

    return sum;
}



function countAndPadTo(indexToPadTo: number, guess: string[], puzzle: string[], puzzleLength: number): number {
    let options = 0;
    const spacesToAdd = (puzzle.join('').length) - (guess.join('').length); // Idk why this must be calculated this way, but it must be.
    // Pad guess with spaces at the start
    let paddedGuess = [...guess];

    // Insert spaces at index:
    for(let i = 1; i < spacesToAdd; i++) {
        // Add a space at index
    }

    // Pad the rest of the front with spaces
    for(let i = 0; i < spacesToAdd; i++) {
        paddedGuess.unshift(EMPTY)
    }
    console.log(paddedGuess.join(''));
    // if(guessCouldMatchPuzzle(puzzle, paddedGuess, puzzleLength)) {
    //     console.log('Could match!');
    // }


    return options;
}

function guessCouldMatchPuzzle(puzzle: string[], guess: string[], puzzleLength: number): boolean {
    for(let i = 0; i < puzzleLength; i++) {
        if(puzzle[i]! !== VAR && ((puzzle[i]! === KNOWN && guess[i] === EMPTY)
        || (puzzle[i]! === EMPTY && guess[i] === KNOWN))) {
            return false;
        }
    }
    return true;
}

// Part 1

// const KNOWN = '#';
// const EMPTY = '.';
// const VAR = '?';
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     let sum = 0;
//     for(let line of lines) {
//         const puzzle: string[] = line.split(' ')[0]!.split('');
//         const valuesStr: string = line.split(' ')[1]!; 
//         sum += countPossibilities(0, puzzle, valuesStr); // Recursion time!
//     }
//     return sum;
// }

// function getGroupingsForRow (row: string[]): string {
//     const groups: number[] = [];
//     let currentGroup = 0;
//     for(let val of row) {
//         if(val === EMPTY && currentGroup > 0) {
//             groups.push(currentGroup);
//             currentGroup = 0;
//         } else if(val === EMPTY) {
//             continue;
//         } else if (val === KNOWN) {
//             currentGroup++;
//         } else {
//             throw new Error(`Counting groups for ${row.join('')} and got a VAR!`);
//         }
//     }
//     if(currentGroup > 0) {
//         groups.push(currentGroup)
//     }
//     return groups.join(',')
// }

// function countPossibilities(startingIndex: number, puzzle: string[], correctValue: string): number {
//     // //console.log('Iterating...', startingIndex, puzzle.join(''), correctValue);
//     let copy = [...puzzle];
//     if(startingIndex === copy.length - 1) {
//         if(copy[startingIndex] === VAR) {
//             let sum = 0;
//             copy[startingIndex] = KNOWN;
//             sum += (correctValue === getGroupingsForRow(copy)) ? 1 : 0;
//             copy[startingIndex] = EMPTY;
//             sum += (correctValue === getGroupingsForRow(copy)) ? 1 : 0;
//             return sum;
//         } else {
//             return (correctValue === getGroupingsForRow(copy)) ? 1 : 0;
//         }
//     } else {
//         if(copy[startingIndex] === VAR) {
//             let sum = 0;
//             copy[startingIndex] = KNOWN;
//             sum += countPossibilities(startingIndex+1, copy, correctValue);
//             copy[startingIndex] = EMPTY;
//             sum += countPossibilities(startingIndex+1, copy, correctValue);
//             return sum;
//         } else {
//             return countPossibilities(startingIndex+1, copy, correctValue);
//         }
//     }
//     throw new Error('What');
// }
