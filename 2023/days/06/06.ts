// https://adventofcode.com/2023/day/6

export function adventMain(input: string): any {
    const lines = input.split('\n');
    let time: number = parseInt(lines[0]!.split(':')[1]!.trim().replaceAll(' ', ''));
    let distance: number = parseInt(lines[1]!.split(':')[1]!.trim().replaceAll(' ', ''));
    let options: number = 0;

    for(let i = 0; i < time; i++) {
        if (i * (time - i) > distance) {
            options++;
        }
    }
    return options;
}

// Part 1
// export function adventMain(input: string): any {
//     const lines = input.split('\n');
//     let times: number[] = lines[0]!.split(':')[1]!.trim().split(/\s+/).map((s) => parseInt(s));
//     let distances: number[] = lines[1]!.split(':')[1]!.trim().split(/\s+/).map((s) => parseInt(s));
//     let options: number[] = Array<number>(times.length).fill(0);

//     times.forEach((raceTime: number, index) => {
//         const distanceToBeat = distances[index]!;
//         for(let i = 0; i < raceTime; i++) {
//             const speed = i;
//             const remainingtime = raceTime - i;
//             const distanceTraveled = speed * remainingtime;
//             if (distanceTraveled > distanceToBeat) {
//                 options[index]++;
//             }
//         }
//     });

//     return options.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
// }
