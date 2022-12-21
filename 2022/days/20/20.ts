// https://adventofcode.com/2022/day/20

export function adventMain(input: string): any {
    // const multVal = 1; // Part 1
    const multVal = 811589153; // Part 2
    const numbers = input.split('\n').map(strNum=>parseInt(strNum)*multVal);
    let pairs: [number, number][] = [];
    for(let i = 0; i < numbers.length; i++) {
        pairs.push([i, numbers[i]!]);
    }

    // const iterations = 1; // Part 1
    const iterations = 10; // Part 2
    for(let x = 0; x < iterations; x++) {
        for(let i = 0; i < numbers.length; i++) {
            let numberToMove: [number, [number, number]] = findNumberForIndex(i, pairs);
            let newIndex = (numberToMove[1]![1] < 0) 
            ? ((numbers.length - numberToMove[0] - 1) - numberToMove[1]![1]) 
            : (numberToMove[0] + numberToMove[1]![1]);
            while (newIndex >= numbers.length) {
                newIndex = (newIndex % numbers.length) + (Math.floor(newIndex/numbers.length));
            }
            newIndex = (numberToMove[1]![1] < 0) ? (numbers.length - newIndex - 1) : newIndex;
            pairs.splice(numberToMove[0], 1); // Remove from array
            pairs.splice(newIndex, 0, [i, numberToMove[1]![1]]); // Add at the new index.
        }
    }
    // After mixing the list, figure out where the zero is.
    let zeroIndex = -1;
    for(let i = 0; i < pairs.length; i++) {
        if (pairs[i]![1] === 0) {
            zeroIndex = i;
            break;
        }
    }

    return pairs[(zeroIndex + 1000) % numbers.length]![1] 
         + pairs[(zeroIndex + 2000) % numbers.length]![1] 
         + pairs[(zeroIndex + 3000) % numbers.length]![1];
}

function findNumberForIndex(index: number, pairs: [number, number][]): [number, [number, number]] {    
    for(let i = 0; i < pairs.length; i++) {
        if (pairs[i]![0] === index) {
            return [i, pairs[i]!];
        }
    }
    return [-1, [-1,-1]];
}
