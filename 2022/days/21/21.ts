// https://adventofcode.com/2022/day/0

export function adventMain(input: string): any {
    let lines = input.split('\n');
    // Initial read: go through and substitute all constants in the file.
    for(let line of lines) {
        const matches = line.match(/([a-zA-Z]+): ([0-9]+)/);
        if(matches) {
            let monkey: string = matches[1]!;
            let number: string = matches[2]!;
            lines = lines.map(line => line.replace(monkey, number));
        }
    }

    while(true) {
        for(let line of lines) {
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
                if (monkey === 'root') {
                    return number;
                }
                lines = lines.map(line => line.replace(monkey, `${number}`));
            }
        }
    }
}
