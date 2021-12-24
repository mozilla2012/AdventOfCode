import java.text.SimpleDateFormat;
import java.util.Date;

import AdventUtils.Utils;

/**
 * See https://adventofcode.com/2021/day/3 for the day's problem.
 */
class Solution03 {
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
        int[][] binaries = Utils.getInputDataGrid("src/2021/03");
        // Utils.printGrid(binaries);

        int numRows = binaries[0].length;
        int numCols = binaries.length;
        String gammaRate = "";
        String epsilonRate = "";
        for(int x = 0; x < numCols; x++)
        {
            int count0 = 0;
            int count1 = 0;
            for(int y = 0; y < numRows; y++)
            {             
                if(binaries[x][y] == 1) {
                    count1++;
                } else {
                    count0++;
                }
            }
            gammaRate += (count1 > count0) ? "1" : "0";
            epsilonRate += (count1 > count0) ? "0" : "1";
        }
        // System.out.println(Integer.parseInt(gammaRate, 2));
        // System.out.println(Integer.parseInt(epsilonRate, 2));
        System.out.println(Integer.parseInt(epsilonRate, 2) * Integer.parseInt(gammaRate, 2));
    }

}