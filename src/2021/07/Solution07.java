import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import AdventUtils.Utils;

/**
 * See https://adventofcode.com/2021/day/7 for the day's problem.
 */
class Solution07 {
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
        ArrayList<Integer> crabLocations = Utils.getInputData("src/2021/07");
        
        int numCrabs = crabLocations.size();
        long[] distanceToTravelAtIndex = new long [numCrabs];
        System.out.printf("There are %d crabs to move.\n", numCrabs);

        // Calc results
        long smallest = Integer.MAX_VALUE;
        int smallestIndex = -1;
        for (int i = 0; i < numCrabs; i++) {
            long sum = 0;
            for (int crab : crabLocations) {
                sum += getMovementCost(Math.abs(crab - i));
            }
            if (sum <= smallest) {
                smallest = sum;
                smallestIndex = i;
            }
            distanceToTravelAtIndex[i] = sum;
        }

        // Print results
        // for (int i = 0; i < numCrabs; i++) {
        //     System.out.printf("%d = %d\n", i, distanceToTravelAtIndex[i]);
        // }
        System.out.printf("Smallest %d at %d\n", smallest, smallestIndex);
    }

    /**
     * Get the amount of fuel it costs to travel a certain distance.
     * @param distanceToTravel how far the crab must travel
     * @return the amount of fuel it costs to travel a certain distanc
     */
    private static long getMovementCost(long distanceToTravel) {
        // For part one solution, just return this:
        // return distanceToTravel; 

        // For part two solution, we need the sum of all numbers below the given number.
        // That can be given by the formula (n*((n+1)/2)).
        return (long) (distanceToTravel*((distanceToTravel+1)/2.0));
    }
}