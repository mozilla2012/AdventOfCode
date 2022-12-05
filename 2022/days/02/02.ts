// https://adventofcode.com/2022/day/2

export function adventMain(input: string): number {
    console.log('Running day 02...');

    // The first column is what your opponent is going to play: 
    // A for Rock, B for Paper, and C for Scissors
    // Part 1: X for Rock, Y for Paper, and Z for Scissors
    // Part 2: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.
    const lines: string[] = input.split('\n');
    const scores: number[] = lines.map((line: string) => {
        const vals = line.split(' ');
        
        switch(vals[0]) { 
            case 'A': { // Rock
                switch(vals[1]) { 
                    case 'X': { 
                        // return 4; // 1 for Rock + 3 for draw
                        return 3; // 0 for loss + 3 for scissors
                    } 
                    case 'Y': { 
                        // return 8; // 2 for paper + 6 for win
                        return 4; // 3 for draw + 1 for rock
                    } 
                    case 'Z': { 
                        // return 3; // 3 for scissors + 0 for loss
                        return 8; // 6 for win + 2 for paper
                    } 
                }
                break;
            } 
            case 'B': { // Paper
                switch(vals[1]) { 
                    case 'X': { 
                        // return 1; // 1 for Rock + 0 for loss
                        return 1; // 0 for loss + 1 for rock
                    } 
                    case 'Y': { 
                        // return 5; // 2 for paper + 3 for draw
                        return 5; // 3 for draw + 2 for paper
                    } 
                    case 'Z': { 
                        // return 9; // 3 for scissors + 6 for win
                        return 9; // 6 for win + 3 for scissors
                    } 
                }
                break;
            } 
            case 'C': { // Scissors
                switch(vals[1]) { 
                    case 'X': { 
                        // return 7; // 1 for Rock + 6 for win
                        return 2; // 0 for loss + 2 for paper
                    } 
                    case 'Y': { 
                        // return 2; // 2 for paper + 0 for loss
                        return 6; // 3 for draw + 3 for scissors
                    } 
                    case 'Z': { 
                        // return 6; // 3 for scissors + 3 for draw
                        return 7; // 6 for win + 1 for rock
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
