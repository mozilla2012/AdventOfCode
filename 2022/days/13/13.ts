// https://adventofcode.com/2022/day/13

export function adventMain(input: string): any {
    const lines = input.split('\n');
    
    // Part 2:
    lines.push('[[2]]');
    lines.push('[[6]]');
    
    let indeciesSum = 0;
    let index = 1;

    // Part 1:
    for(let i = 0; i < lines.length - 1; i+=3) {
        let leftPac = JSON.parse(lines[i]!);
        let ritePac = JSON.parse(lines[i+1]!);
        let orderDetermined = compareArrays(Object.values(leftPac), Object.values(ritePac));
        if (orderDetermined >= 0) { // Ordered correctly!
            indeciesSum += index;
        }
        index++;
    }
    // return indeciesSum; // Part 1

    // Part 2:
    let allLines = lines.filter(line => line);
    let sortedLines = allLines.sort((a, b) => (-1 * compareArrays(Object.values(JSON.parse(a)), Object.values(JSON.parse(b)))));
    let index1 = 0;
    let index2 = 0;
    for (let i = 0; i < sortedLines.length; i++) {
        if(sortedLines[i] === '[[2]]') {
            index1 = i+1;
        }
        if(sortedLines[i] === '[[6]]') {
            index2 = i+1;
            break;
        }
    }
    return index1 * index2;
}

function compareArrays(leftPac: any, ritePac: any): number {
    let orderDetermined = 0;
    let i = 0;
    while(orderDetermined === 0) {
        
        if((leftPac.length == ritePac.length) && i >= leftPac.length) {
            return 0; // Array is at its end; keep going
        } 
        if(i >= leftPac.length) {
            return 1;  // Left side out; success
        }
        if(i >= ritePac.length) {
            return -1; // Right side out; fail
        }

        let leftThing = leftPac[i]!;
        let riteThing = ritePac[i]!;

        if(Array.isArray(leftThing) || Array.isArray(riteThing)) {
            if(!Array.isArray(leftThing)) {
                leftThing = [leftPac[i]];
            }
            if(!Array.isArray(riteThing)) {
                riteThing = [ritePac[i]];
            }
            orderDetermined = compareArrays(leftThing, riteThing)
        } else {
            orderDetermined = compareSingleNumber(leftThing, riteThing);
        }
        i++;
    }
    return orderDetermined;
}

function compareSingleNumber(left: number, rite: number): number {

    if(left < rite) {
        return 1;
    } else if (left > rite) {
        return -1;
    }
    return 0;
}
