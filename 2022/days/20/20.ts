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
            let currentIndex: number = numberToMove[0];
            let value: number = numberToMove[1]![1];
            let newIndex = (currentIndex + value);
            let isNegative = false;
            if (value < 0) {
                newIndex = (numbers.length - currentIndex - 1) - value;
                isNegative = true;
            }

            while (newIndex >= numbers.length) {
                newIndex = (newIndex % numbers.length) + (Math.floor(newIndex/numbers.length));
            }
            if (isNegative) {
                newIndex = (numbers.length - newIndex - 1);
            }

            pairs.splice(currentIndex, 1); // Remove from array
            pairs.splice(newIndex, 0, [i, value]); // Add at the new index.
        }
    }

    let zeroIndex = -1;
    for(let i = 0; i < pairs.length; i++) {
        if (pairs[i]![1] === 0) {
            zeroIndex = i;
            break;
        }
    }

    let _1000 = pairs[(zeroIndex + 1000) % numbers.length]![1]; 
    let _2000 = pairs[(zeroIndex + 2000) % numbers.length]![1]; 
    let _3000 = pairs[(zeroIndex + 3000) % numbers.length]![1];
    return _1000 + _2000 + _3000; // Part 1 === 3466
}

function findNumberForIndex(index: number, pairs: [number, number][]): [number, [number, number]] {
    for(let i = 0; i < pairs.length; i++) {
        if (pairs[i]![0] === index) {
            return [i, pairs[i]!];
        }
    }
    return [-1, [-1,-1]];
}
