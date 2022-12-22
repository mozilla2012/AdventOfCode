// https://adventofcode.com/2022/day/21

export function adventMain(input: string): any {
    let lines = input.split('\n');
    // Initial read: go through and substitute all constants in the file.
    for(let line of lines) {
        const matches = line.match(/([a-zA-Z]+): ([0-9]+)/);
        if(matches) {
            let monkey: string = matches[1]!;
            if (monkey === 'humn') { // Part 2
                continue;
            }
            let number: string = matches[2]!;
            lines = lines.map(line => line.replace(monkey, number));
        }
    }

    let prevLines: string[] = [];
    while(prevLines !== lines) {
        prevLines = lines;
        for(let line of lines) {
            // Then go through and calculate any completed lines.
            const matches = line.match(/([a-zA-Z]+): ([0-9]+) (.) (([0-9]+))/);
            if(matches) {
                let monkey: string = matches[1]!;
                let op1: number = parseInt(matches[2]!);
                let op2: number = parseInt(matches[4]!);
                let op: string = matches[3]!;
                let number = (op === '+') ? (op1+op2) : (
                    (op === '-') ? (op1-op2) : (
                    (op === '*') ? (op1*op2) : (
                    (op === '/') ? (op1/op2) : (Number.MAX_SAFE_INTEGER))));
                // if (monkey === 'root') { // Part 1
                //     return number;
                // }
                // Then replace the monkey name with the calculated value.
                lines = lines.map(line => line.replace(monkey, `${number}`));
            }
        }
    }
    
    // At this point, everything that *can* be substituted has been.
    // The root monkey should have one of the two operands populated.
    
    let rootMonkeyLine = getMonkeyLineByName('root', lines);

    // From here, rootMonkeyLine is like 'root: xyzb + 123456'
    // Then we can determine that xyzb must be 123456. 
    // Then we go loop repeatedly: Everywhere we find the monkey name, replace it with that value.
    // Then repeat: Extract the value that wasn't determined, determine it's new value, then replace it.
    let rootMatch = rootMonkeyLine.match(/([a-zA-Z]+): ([a-zA-Z]+) (.) ([0-9]+)/);
    let valToReplace = parseInt(rootMatch![4]!);
    let monkeyToFind = rootMatch![2]!;
    
    while(monkeyToFind !== 'humn') {
        // Substitute all lines that contain the calculated value.
        lines = lines.map(line => line.replace(monkeyToFind, `${valToReplace}`));
        // Then find the new valToReplace and MonkeyToFind.
        for(let line of lines) {
            let leftVarMatch = line.match(/([0-9]+): ([a-zA-Z]+) (.) ([0-9]+)/); // monkeyName: monkeyName + 12345
            if(leftVarMatch) {
                let value = parseInt(leftVarMatch[4]!);
                monkeyToFind = leftVarMatch[2]!;
                let op = leftVarMatch[3]!;
                valToReplace = (op === '+') ? (valToReplace - value) : (
                    (op === '-') ? (valToReplace + value) : (
                    (op === '*') ? (valToReplace / value) : (
                    (op === '/') ? (valToReplace * value) : (Number.MAX_SAFE_INTEGER))));
                break;
            }
            let rightVarMatch = line.match(/([0-9]+): ([0-9]+) (.) ([a-zA-Z]+)/); // monkeyName: 12345 + monkeyName
            if(rightVarMatch) {
                let value = parseInt(rightVarMatch[2]!);
                monkeyToFind = rightVarMatch[4]!;
                let op = rightVarMatch[3]!;
                valToReplace = (op === '+') ? (valToReplace - value) : (
                    (op === '-') ? (value - valToReplace) : (
                    (op === '*') ? (valToReplace / value) : (
                    (op === '/') ? (value / valToReplace) : (Number.MAX_SAFE_INTEGER))));
                break;
            }
        }
    }
    return valToReplace;
}

function getMonkeyLineByName(monkeyName: string, lines: string[]): string {
    for (let line of lines) {
        if (line.includes(`${monkeyName}:`)) {
            return line;
        }
    }
    return '';
}
