const { parentPort, workerData } = require("worker_threads");
const KNOWN = '#';
const EMPTY = '.';
const VAR = '?';

console.log('Staring puzzle:', workerData.puzzleNumber);
const poss = countPossibilities(0, workerData.puzzle, workerData.values);
console.log('Puzzle', workerData.puzzleNumber, 'has options:', poss);
parentPort.postMessage(poss);
 
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
            return groups.join(','); // Bail early
        }
    }
    if(currentGroup > 0) {
        groups.push(currentGroup)
    }
    return groups.join(',')
}
function countPossibilities(startingIndex: number, puzzle: string[], correctValue: string): number {
    // console.log('Iterating...', startingIndex, puzzle.join(''), correctValue);
    const currentStr = getGroupingsForRow(puzzle);
    if (!correctValue.startsWith(currentStr)) {
        // console.log(correctValue, 'doesnt start with', currentStr);
        return 0;
    } 

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