// https://adventofcode.com/2023/day/4

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let sum = 0;
    for(let line of lines) {
        const card: string = line.split(':')[1]!;
        const magicNumbers: number[] = (card.split('|')[0])!.split(' ').filter((t) => !!t).map((s) => parseInt(s));
        const myNumbers: number[] = (card.split('|')[1])!.split(' ').filter((t) => !!t).map((s) => parseInt(s));
        const matches = magicNumbers.filter(n => myNumbers.includes(n)).length;
        sum += (matches > 0) ? Math.pow(2, magicNumbers.filter(n => myNumbers.includes(n)).length - 1) : 0;
    }
    return sum;
}
