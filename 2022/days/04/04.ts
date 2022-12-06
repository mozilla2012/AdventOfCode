// https://adventofcode.com/2022/day/4

export function adventMain(input: string): number {
    console.log('Running day 04...');

    const row: string[] = input.split('\n');
    let pairs: string[][] = [];
    row.forEach((pair) => {
        pairs.push(pair.split(','));
    });

    let overlap = 0;

    for (const partners of pairs) {
        if(checkOverlap(partners)) {
            overlap++;
        }
    }

    return overlap;
}

function checkOverlap(partners: string[]): boolean {
    const elf1 = partners[0]!.split('-');
    const e1l = parseInt(elf1[0]!);
    const e1r = parseInt(elf1[1]!);

    const elf2 = partners[1]!.split('-');
    const e2l = parseInt(elf2[0]!);
    const e2r = parseInt(elf2[1]!);

    const e1Consumese2: boolean = (e1l <= e2l && e1r >= e2r);
    const e2Consumese1: boolean = (e2l <= e1l && e2r >= e1r);

    return e1Consumese2 || e2Consumese1;
}

