// https://adventofcode.com/2023/day/6

export const adventMain = (n:string)=>new Array(parseInt(n.split('\n')[0]!.split(':')[1]!.replaceAll(' ',''))).fill(null).map((_,i)=>i+1).filter(i=>i*(parseInt(n.split('\n')[0]!.split(':')[1]!.replaceAll(' ',''))-i)>parseInt(n.split('\n')[1]!.split(':')[1]!.replaceAll(' ', '')) ).length;

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
