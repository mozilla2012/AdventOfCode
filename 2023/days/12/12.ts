// https://adventofcode.com/2023/day/12
// const {	Worker } = require("worker_threads");
// const { StaticPool } = require('node-worker-threads-pool');
const KNOWN = '#';
const EMPTY = '.';
const VAR = '?';
export async function adventMain(input: string): Promise<any> {
    const lines = input.split('\n');
    let sum = 0;
    let count = 0;
    let workerPromises = [];
    // var finishedThreads = 0;
    // const threads = 23;

    // const pool = new StaticPool({
    //     size: threads,
    //     task: "./build/days/12/doLine.js",
    //     workerData: 'workerData!'
    //   });

    // function progress(count: number) {
    //     //console.log(`Finished ${Math.floor(((finishedThreads*10000) / workerPromises.length))/100}%`);
    // }
    for(let line of lines) {
        console.log(++count);
        const p1puzzle: string[] = line.split(' ')[0]!.split('');
        const puzzle: string = line.split(' ')[0]!;
        const puzzle5: string[] = `${puzzle}?${puzzle}?${puzzle}?${puzzle}?${puzzle}`.split('');
        const valuesStr: string = line.split(' ')[1]!; 
        const valuesStr5: string =  `${valuesStr},${valuesStr},${valuesStr},${valuesStr},${valuesStr}`;
        console.log(puzzle5.join(''), valuesStr5);
        const poss = countPossibilities(0, puzzle5, valuesStr5); // Recursion time!;
        console.log(poss);
        sum += poss;
        // const prom = createWorker(puzzle5, valuesStr5, count).then((val) => {
        //     progress(++finishedThreads);
        //     return val;
        // });
        // workerPromises.push(prom);
        // if(workerPromises.length === threads) {
        //     const thread_results: number[] = await Promise.all(workerPromises) as number[];
        //     //console.log(thread_results);
        //     sum+=thread_results.reduce((acc: number, curr: number)=> acc+curr, 0)
        //     workerPromises = [];
        // }
    }
    // if (workerPromises.length > 0) {
    //     const thread_results: number[] = await Promise.all(workerPromises) as number[];
    //     //console.log(thread_results);
    //     sum += thread_results.reduce((acc: number, curr: number)=> acc+curr, 0);
    // }
    return sum;
}

// function createWorker(puzzle: string[], values: string, puzzleNumber: number) {
//     return new Promise(function (resolve, reject) {
//       const worker = new Worker("./build/days/12/doLine.js", {
//         workerData: {
//             puzzle: puzzle,
//             values: values,
//             puzzleNumber: puzzleNumber,
//         }
//       });
//       worker.on("message", (data: any) => {
//         resolve(data);
//       });
//       worker.on("error", (msg: any) => {
//         reject(`An error ocurred: ${msg}`);
//       });
//     });
//   }


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
            if(currentGroup > 0) {
                groups.push(currentGroup)
            }
            //console.log('early:', row.join(''), groups.join(','));
            return groups.join(','); // Bail early
        }
    }
    if(currentGroup > 0) {
        groups.push(currentGroup)
    }
    return groups.join(',')
}

function countPossibilities(startingIndex: number, puzzle: string[], correctValue: string): number {
    //console.log('STARTING', startingIndex);
    // //console.log('Iterating...', startingIndex, puzzle.join(''), correctValue);
    const currentStr = getGroupingsForRow(puzzle);
    const lastVal: number = parseInt(currentStr[currentStr.length-1]!);
    const valToComp: number = parseInt(correctValue[currentStr.length-1]!);
    if (!correctValue.startsWith(currentStr) && valToComp < lastVal) {
        if(!currentStr) {
            //console.log('Bailing with empty str');
        }
        //console.log(correctValue, 'doesnt start with', currentStr);
        return 0;
    } 
    if(!currentStr) {
        //console.log('Cont with empty str');
    }
    // even if we're good, make sure we have enough space.
    const valToFind = correctValue.replace(currentStr.slice(0, currentStr.length-2), '').slice(1);
    const remainingSpaceNeeded: number = valToFind.split('').reduce((acc, str: string) => {
        let valToAdd = 1;
        if(str !== ',') {
            valToAdd = parseInt(str);
        }
        return acc + valToAdd;
    }, 0) - lastVal;
    if(remainingSpaceNeeded > (puzzle.length - startingIndex + 1)) {
        //console.log(`BAIL. startingIndex ${startingIndex}; puzzle ${puzzle.join('')}; length ${puzzle.join('').length}; currentStr ${currentStr}; valToFind ${valToFind}; remainingSpaceNeeded ${remainingSpaceNeeded}`);
        return 0;
    }
    //console.log('Continuing?');

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
