// https://adventofcode.com/2022/day/2

export function adventMain(input: string): number {
    console.log('Running day 02...');

    // The first column is what your opponent is going to play: 
    // A for Rock, B for Paper, and C for Scissors
    // X for Rock, Y for Paper, and Z for Scissors
    const lines: string[] = input.split('\n');
    const scores: number[] = lines.map((line: string) => {
        const vals = line.split(' ');
        
        switch(vals[0]) { 
            case 'A': { // Rock
                switch(vals[1]) { 
                    case 'X': { 
                        return 4; // 1 for Rock + 3 for draw
                    } 
                    case 'Y': { 
                        return 8; // 2 for paper + 6 for win
                    } 
                    case 'Z': { 
                        return 3; // 3 for scissors + 0 for loss
                    } 
                }
                break;
            } 
            case 'B': { // Paper
                switch(vals[1]) { 
                    case 'X': { 
                        return 1; // 1 for Rock + 0 for loss
                    } 
                    case 'Y': { 
                        return 5; // 2 for paper +  3 for draw
                    } 
                    case 'Z': { 
                        return 9; // 3 for scissors + 6 for win
                    } 
                }
                break;
            } 
            case 'C': { // Scissors
                switch(vals[1]) { 
                    case 'X': { 
                        return 7; // 1 for Rock + 6 for win
                    } 
                    case 'Y': { 
                        return 2; // 2 for paper + 0 for loss
                    } 
                    case 'Z': { 
                        return 6; // 3 for scissors + 3 for draw
                    } 
                }
                break;
             } 
        }
        throw new Error(`Illegal value entered: ${line}`);
    });

    const score: number = scores.reduce((sum, currentVal) => {
        return sum + currentVal;
    });

    
    return score;
}
