import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import AdventUtils.Utils;

/**
 * See https://adventofcode.com/2021/day/1 for the day's problem.
 */
class Solution01 {
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
        ArrayList<Integer> inputData = Utils.getInputDataList("src/2021/01");

        int increasingCountPart1 = 0;
        for(int i = 0; i < inputData.size()-1; i++) {
            if(inputData.get(i) < inputData.get(i+1)) {
                increasingCountPart1++;
            }
        }

        int increasingCountPart2 = 0;
        for(int i = 0; i < inputData.size()-3; i++) {
            int runningSum1 = inputData.get(i+0) + inputData.get(i+1) + inputData.get(i+2);
            int runningSum2 = inputData.get(i+1) + inputData.get(i+2) + inputData.get(i+3);
            if(runningSum1 < runningSum2) {
                increasingCountPart2++;
            }
        }
        System.out.println(increasingCountPart1);
        System.out.println(increasingCountPart2);
    }

}