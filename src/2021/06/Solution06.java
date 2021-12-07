import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.ListIterator;
import AdventUtils.Utils;

/**
 * See https://adventofcode.com/2021/day/6 for the day's problem.
 */

class Solution06 {
    static SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss.S");  

    public static void main (String[] args) {
        Date startTime = new Date();          
        System.out.printf("Starting at %s\n", formatter.format(startTime));

        doPuzzle();

        Date endTime = new Date();
        long time_difference = endTime.getTime() - startTime.getTime();  
        System.out.printf("Finished at %s; took %d milliseconds\n", formatter.format(endTime), time_difference);
    }


    /**
     * Actually runs the puzzle.
     */
    private static void doPuzzle() {
        System.out.println("Puzzling...");
        final int FISH_START_VAL = 6;
        final int NEW_FISH_START_VAL = 8;

        ArrayList<Integer> inputFishes = Utils.getInputData("src/2021/06");
        System.out.printf("Initial school: %s\n", inputFishes);
        
        // Initialize the counts. Each index will count the number of fish that are that many days from cloning.
        ArrayList<Long> fishes = new ArrayList<>(Arrays.asList(new Long[NEW_FISH_START_VAL + 1]));
        Collections.fill(fishes, (long)0);  // Initialize to zero
        for (int fishVal : inputFishes) {
            long currentNumFishesAtCount = fishes.get(fishVal);
            fishes.set(fishVal, currentNumFishesAtCount + 1);
        }
        System.out.printf("Day 0: %s\n", fishes);
        
        // Actually do the puzzle:
        int days = 256;
        for (int d = 1; d <= days; d++) {
            long numNewFishes = fishes.get(0);
            fishes.remove(0);
            fishes.set(FISH_START_VAL, (fishes.get(FISH_START_VAL) + numNewFishes));
            fishes.add(numNewFishes);

            // System.out.printf("After day %d: %s\n", d, fishes);
        }

        long totalFish = fishes.stream().mapToLong(a -> a).sum();
        System.out.printf("Total fish: %d\n", totalFish);
    }


    /**
     * Actually runs the puzzle. This was the naive solution before needing to optimize for memory.
     * This solution worked for small schools of fish, but was slow and would quickly run out of heap space.
     */
    private static void doPuzzleNaive() {
        System.out.println("Puzzling...");
        final int FISH_START_VAL = 6;
        final int NEW_FISH_START_VAL = 8;

        ArrayList<Integer> fishes = Utils.getInputData("src/2021/06");
        System.out.printf("Day 0: %s\n", fishes);
        
        int days = 256;
        for (int d = 0; d < days; d++) {
            int fishToAdd = 0;
            for (ListIterator<Integer> iter = fishes.listIterator(); iter.hasNext(); ) {
                int fish = iter.next();
                if (fish == 0) {
                    fish = FISH_START_VAL + 1;
                    fishToAdd++;
                }
                iter.set(fish-1);
            }
            for (int f = 0; f < fishToAdd; f++) {
                fishes.add(NEW_FISH_START_VAL);
            }
            // System.out.printf("After %d days: %s\n", d+1, fishes);
        }
        System.out.printf("Total fish: %d\n", fishes.size());
    }
}