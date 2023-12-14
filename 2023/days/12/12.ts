// https://adventofcode.com/2023/day/12
const {	Worker } = require("worker_threads");
const KNOWN = '#';
const EMPTY = '.';
const VAR = '?';
export async function adventMain(input: string): Promise<any> {
    const lines = input.split('\n');
    let sum = 0;
    let count = 0;
    const workerPromises = [];
    for(let line of lines) {
        console.log(++count);
        const p1puzzle: string[] = line.split(' ')[0]!.split('');
        const puzzle: string = line.split(' ')[0]!;
        const puzzle5: string[] = `${puzzle}?${puzzle}?${puzzle}?${puzzle}?${puzzle}`.split('');
        const valuesStr: string = line.split(' ')[1]!; 
        const valuesStr5: string =  `${valuesStr},${valuesStr},${valuesStr},${valuesStr},${valuesStr}`;
        console.log(puzzle5.join(''), valuesStr5);
        // const poss = countPossibilities(0, puzzle5, valuesStr5); // Recursion time!;

        workerPromises.push(createWorker(puzzle5, valuesStr5, count));
        // Create new worker
        // const worker = new Worker("./doLine.js", {
        //     workerData: {
        //         puzzle: puzzle5,
        //         values: valuesStr5
        //     }
        // });
        // Listen for a message from worker
        // worker.once("message", (result: any) => {
        //     console.log(`Result: ${result}`);
        // });
        // worker.on("error", (error: any) => {
        //     console.log(error);
        // });
        // worker.on("exit", (exitCode: any) => {
        //     console.log(exitCode);
        // });
        // console.log('Done!');

        // console.log('poss', poss);
        // sum += poss;
    }
    const thread_results: number[] = await Promise.all(workerPromises) as number[];

    console.log(thread_results);

    return thread_results.reduce((acc: number, curr: number)=> acc+curr,0);
}

function createWorker(puzzle: string[], values: string, puzzleNumber: number) {
    return new Promise(function (resolve, reject) {
      const worker = new Worker("./build/days/12/doLine.js", {
        workerData: {
            puzzle: puzzle,
            values: values,
            puzzleNumber: puzzleNumber,
        }
      });
      worker.on("message", (data: any) => {
        resolve(data);
      });
      worker.on("error", (msg: any) => {
        reject(`An error ocurred: ${msg}`);
      });
    });
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
//     // console.log('Iterating...', startingIndex, puzzle.join(''), correctValue);
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
