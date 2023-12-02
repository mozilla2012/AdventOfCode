// https://adventofcode.com/2023/day/2

export function adventMain(input: string): any {
    const lines = input.split('\n');
    const possibleRed = 12;
    const possibleGreen = 13;
    const possibleBlue = 14;
    let possibleSum = 0;
    for(let line of lines) {
        const gameLabel: string = line.split(':')[0]!;
        const game: string = (line.split(':')[1]!);
        const gameNumber: number = Number(gameLabel.split(' ')[1]!);
        const rounds: string[] = game.split(';');
        let possible: boolean = true;
        for (let round of rounds) {
            if(!possible) {
                break;
            }
            const colorStrings: string[] = round.split(',').map((color) => color.trim());
            for (let color of colorStrings) {
                if (color.includes('red')) {
                    const numR = Number(color.split(' ')[0]!);
                    if(numR > possibleRed) {
                        possible = false;
                        break;
                    }
                } else if (color.includes('green')) {
                    const numG = Number(color.split(' ')[0]!);
                    if(numG > possibleGreen) {
                        possible = false;
                        break;
                    }
                } else { // if (color.includes('blue')) {
                    const numB = Number(color.split(' ')[0]!);
                    if(numB > possibleBlue) {
                        possible = false;
                        break;
                    }
                }
            }
        }
        if(possible) {
            possibleSum += gameNumber;
        }
    }
    return possibleSum;
}
