// https://adventofcode.com/2022/day/1

export function adventMain(input: string): number {
    console.log('Running day 01...');
    
    // Separate by lines
    const calories: string[] = input.split('\n');

    // Convert all lines to integers
    const calNum: number[] = calories.map(food => {
        return parseInt(food);
    });

    let maxCalories: number = 0;
    let currentElfCalories: number = 0;

    let topThreeElves: number[] = [0, 0, 0];

    for(const snack of calNum) {
        if (snack) {
            currentElfCalories += snack;
        } else {
            // Moving on to a new elf; replace the lowest of the winners.
            // If the current elf is greater than ANY of the leaders, replace it.
            if(topThreeElves.some((leader) => { return leader < currentElfCalories })) { 
                topThreeElves = topThreeElves.sort((n1,n2) => n1 - n2); // Sort and replace the lowest.
                topThreeElves[0] = currentElfCalories;
            }
            currentElfCalories = 0;
        }
    }

    // Then check the last elf one more time:
    if(topThreeElves.some((leader) => { return leader < currentElfCalories })) {
        topThreeElves = topThreeElves.sort((n1,n2) => n1 - n2);
        topThreeElves[0] = currentElfCalories;
    }

    // The topThreeElves array is sorted from least to most. So to answer part one of this question, 
    // the elf with the most calories is in the last index.

    return topThreeElves.reduce((sum, num) => {return sum + num}); // Sum the values of the array
}
