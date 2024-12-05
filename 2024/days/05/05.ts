// https://adventofcode.com/2024/day/5

// Part 2
export function adventMain(input: string): any {
    const sections = input.split('\n\n');
    const rules: number[][] = sections[0].split('\n').map((line: string) => line.split('|').map((s: string)=> parseInt(s)));
    const updates: number[][] = sections[1].split('\n').map((row: string)=> row.split(',').map((item: string)=> parseInt(item)));
    const earlierMap: Map<number, number[]> = new Map();
    rules.forEach((pair: number[])=>{
        if(earlierMap.has(pair[1])) {
            earlierMap.set(pair[1], [...earlierMap.get(pair[1]), pair[0]]);
        } else {
            earlierMap.set(pair[1], [pair[0]]);
        }
    })

    let sum = 0;
    updates.forEach((line: number[]) => {
        let validLine: number[] = [...line];
        line.forEach((item: number) => {
            const earlierVals: number[] = earlierMap.get(item)?.filter((earlier:number)=>line.includes(earlier)) ?? [];
            validLine[earlierVals.length] = item;
        });
        if(JSON.stringify(line) !== JSON.stringify(validLine)) {
            sum += validLine[(validLine.length-1)/2];
        }
    });
    return sum;
}

// Part 1
// export function adventMain(input: string): any {
//     const sections = input.split('\n\n');
//     const rulesBlock = sections[0];
//     const updates: number[][] = sections[1].split('\n').map((row: string)=> row.split(',').map((item: string)=> parseInt(item)));

//     const lines: string[] = rulesBlock.split('\n');
//     const laterMap: Map<number, number[]> = new Map();
//     const earlierMap: Map<number, number[]> = new Map();
//     const rules: number[][] = lines.map((line: string) => line.split('|').map((s: string)=> parseInt(s)));
//     rules.forEach((pair: number[])=>{
//         if(laterMap.has(pair[0])) {
//             laterMap.set(pair[0], [...laterMap.get(pair[0]), pair[1]]);
//         } else {
//             laterMap.set(pair[0], [pair[1]]);
//         }
//         if(earlierMap.has(pair[1])) {
//             earlierMap.set(pair[1], [...earlierMap.get(pair[1]), pair[0]]);
//         } else {
//             earlierMap.set(pair[1], [pair[0]]);
//         }
//     })
   
//     p(laterMap);

//     let valid: number[][] = [];
//     updates.forEach((line: number[]) => {
//         p(line);
//         let lineValid = true;
//         line.forEach((item: number, index)=> {
//             const laterPages: number[] = laterMap.get(item);
//             const earlierPages: number[] = earlierMap.get(item);
//             p('item', item);
//             p('later', laterPages);
//             for (let i=index+1; i< line.length; i++) {
//                 if(laterPages && !laterPages.includes(line[i])) {
//                     lineValid = false;
//                     p('fail!');
//                     break;
//                 }
//             }
//             for (let i=0; i<index; i++) {
//                 if(earlierPages && !earlierPages.includes(line[i])) {
//                     lineValid = false;
//                     p('fail!');
//                     break;
//                 }
//             }   
//         })
//         if(lineValid) {
//             valid.push(line);
//         }
//     });
//     p('valid lines:', valid);
//     let sum =0;
//     valid.forEach((line: number[])=>{
//         sum += line[(line.length-1)/2]
//     })
//     return sum;
// }
