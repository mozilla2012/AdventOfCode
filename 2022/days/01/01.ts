export function adventMain(input: string): number {
    console.log('Running day 01...');
    
    // Separate by lines
    const calories: string[] = input.split('\n');

    // Convert all lines to integers
    const calNum: number[] = calories.map(food => {
        return parseInt(food);
    });

    let maxCalories: number = 0;
    let elfCalories: number = 0;

    for(const snack of calNum) {
        if (snack) {
            elfCalories += snack;
            if (elfCalories >= maxCalories) {
                maxCalories = elfCalories;
            }
        } else {
            elfCalories = 0;
        }
    }

    return maxCalories;
}
