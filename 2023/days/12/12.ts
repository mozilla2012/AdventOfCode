// https://adventofcode.com/2023/day/12

const KNOWN = '#';
const EMPTY = '.';
const VAR = '?';
export function adventMain(input: string): any {
    const lines = input.split('\n');
    let sum = 0;
    for(let line of lines) {
        const puzzle: string[] = line.split(' ')[0]!.split('');
        const valuesStr: string = line.split(' ')[1]!; 
        sum += countPossibilities(0, puzzle, valuesStr); // Recursion time!
    }
    return sum;
}

function getGroupingsForRow (row: string[]): string {
    const groups: number[] = [];
    let currentGroup = 0;
    for(let val of row) {
        if(val === EMPTY && currentGroup > 0) {
            groups.push(currentGroup);
            currentGroup = 0;
        } else if(val === EMPTY) {
            continue;
        } else if (val === KNOWN) {
            currentGroup++;
        } else {
            throw new Error(`Counting groups for ${row.join('')} and got a VAR!`);
        }
    }
    if(currentGroup > 0) {
        groups.push(currentGroup)
    }
    return groups.join(',')
}

function countPossibilities(startingIndex: number, puzzle: string[], correctValue: string): number {
    // console.log('Iterating...', startingIndex, puzzle.join(''), correctValue);
    let copy = [...puzzle];
    if(startingIndex === copy.length - 1) {
        if(copy[startingIndex] === VAR) {
            let sum = 0;
            copy[startingIndex] = KNOWN;
            sum += (correctValue === getGroupingsForRow(copy)) ? 1 : 0;
            copy[startingIndex] = EMPTY;
            sum += (correctValue === getGroupingsForRow(copy)) ? 1 : 0;
            return sum;
        } else {
            return (correctValue === getGroupingsForRow(copy)) ? 1 : 0;
        }
    } else {
        if(copy[startingIndex] === VAR) {
            let sum = 0;
            copy[startingIndex] = KNOWN;
            sum += countPossibilities(startingIndex+1, copy, correctValue);
            copy[startingIndex] = EMPTY;
            sum += countPossibilities(startingIndex+1, copy, correctValue);
            return sum;
        } else {
            return countPossibilities(startingIndex+1, copy, correctValue);
        }
    }
    throw new Error('What');
}

