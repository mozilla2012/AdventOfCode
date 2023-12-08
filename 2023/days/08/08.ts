// https://adventofcode.com/2023/day/8

// Ripped off Stack Overflow: https://stackoverflow.com/questions/39899072/how-can-i-find-the-prime-factors-of-an-integer-in-javascript
function primeFactors(n: number): number[] {
    const factors = [];
    let divisor = 2;
  
    while (n >= 2) {
      if (n % divisor == 0) {
        factors.push(divisor);
        n = n / divisor;
      } else {
        divisor++;
      }
    }
    return factors;
  }

export function adventMain(input: string): any {
    input = input.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '');
    const lines = input.split('\n');
    const directions = lines[0]!;
    lines.shift();
    lines.shift();

    const map = new Map<string, Array<string>>();
    const currentNode: string[] = [];

    for(let line of lines) { // set up map
        const nodeName = line.split('=')[0]!;
        if (nodeName.charAt(2) === 'A') {
            currentNode.push(nodeName);
        }
        map.set(nodeName, [line.split('=')[1]!.split(',')[0]!, line.split('=')[1]!.split(',')[1]!])
    }

    const loopCount: number[] = currentNode.map(() => 0);
    for(let i = 0; i < currentNode.length; i++) { // iterate through map.
        while (currentNode[i]!.charAt(2) !== 'Z') {
            for(let direction of directions.split('')) {                
                let currentDirections = map.get(currentNode[i]!)!;
                currentNode[i] = direction === 'L' ? currentDirections[0]! : currentDirections[1]!;
                loopCount[i]++;
            }   
        }
    }

    const factorSet = new Set<number>();
    loopCount.forEach((n) => primeFactors(n).forEach(s => factorSet.add(s)));
    return Array.from(factorSet).reduce((acc, val) => acc*val);
}


// Part 1
// export function adventMain(input: string): any {
//     input = input.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '');
    
//     const lines = input.split('\n');
//     const directions = lines[0]!;
//     lines.shift();
//     lines.shift();

//     const map = new Map<string, Array<string>>();

//     // set up map
//     for(let line of lines) {
//         map.set(line.split('=')[0]!, [line.split('=')[1]!.split(',')[0]!, line.split('=')[1]!.split(',')[1]!])
//     }

//     // iterate through map.
//     let count = 0;
//     let currentNode = 'AAA';
//     while (currentNode !== 'ZZZ') {
//         for(let direction of directions.split('')) {
//             let currentDirections = map.get(currentNode)!;
//             currentNode = direction === 'L' ? currentDirections[0]! : currentDirections[1]!;
//             count++;
//         }        
//     }
//     return count;
// }