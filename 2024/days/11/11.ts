// https://adventofcode.com/2024/day/11

export function adventMain(input: string): any {
    let stones: number[] = input.split(' ').map( s => parseInt(s));
    for (let b = 0; b < 25; b++) {
        let newStones: number[] = [];
        stones.forEach((stone: number) => {
            const strNum = String(stone);
            if(stone !== 0 && strNum.length % 2 === 0) {
               newStones.push(parseInt(strNum.slice(0, strNum.length/2)));
               newStones.push(parseInt(strNum.slice(strNum.length/2)));
               return;
            } else {
                newStones.push((stone === 0) ? 1 : stone*2024);
            }
        });
        stones = newStones;
    }
    return stones.length;
}
